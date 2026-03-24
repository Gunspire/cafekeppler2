import { Resend } from "resend";

type Item = { label: string; qty: number };

type Payload = {
  name: string;
  email: string;
  phone?: string;
  pickupDate?: string; // YYYY-MM-DD (Thu/Fri/Sat/Sun only)
  items?: Item[];
  notes?: string;
};

function safeStr(v: unknown) {
  return typeof v === "string" ? v : "";
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sendJson(res: any, statusCode: number, payload: unknown) {
  if (typeof res?.status === "function" && typeof res?.json === "function") {
    res.status(statusCode).json(payload);
    return;
  }
  res.statusCode = statusCode;
  res.setHeader?.("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function normalizeItems(items: unknown): Item[] {
  if (!Array.isArray(items)) return [];
  const out: Item[] = [];
  for (const it of items) {
    if (!it || typeof it !== "object") continue;
    const label = safeStr((it as any).label).trim();
    const qtyRaw = (it as any).qty;
    const qty = Number.isFinite(qtyRaw) ? Number(qtyRaw) : Number(String(qtyRaw));
    const qtyInt = Number.isFinite(qty) ? Math.max(0, Math.floor(qty)) : 0;
    if (!label || qtyInt <= 0) continue;
    out.push({ label, qty: qtyInt });
  }
  return out;
}

function parseLocalDate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(d)) return null;
  const dt = new Date(y, mo - 1, d);
  if (Number.isNaN(dt.getTime())) return null;
  return dt;
}

function isAllowedBreadDay(pickupDate: string) {
  const dt = parseLocalDate(pickupDate);
  if (!dt) return { ok: false, isSaturday: false };
  const dow = dt.getDay(); // 0=Sun .. 6=Sat
  const ok = dow === 0 || dow === 4 || dow === 5 || dow === 6; // Thu/Fri/Sat/Sun
  return { ok, isSaturday: dow === 6 };
}

function formatNlDate(pickupDate: string) {
  const dt = parseLocalDate(pickupDate);
  if (!dt) return pickupDate;
  return dt.toLocaleDateString("nl-NL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader?.("Allow", "POST");
    sendJson(res, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    sendJson(res, 500, { ok: false, error: "RESEND_API_KEY ontbreekt." });
    return;
  }

  const from =
    process.env.RESEND_FROM || "Café Keppler <noreply@cafekeppler.nl>";
  const toCompany = process.env.RESEND_TO || "cafekepplernoord@gmail.com";

  const body = (req.body || {}) as Partial<Payload>;
  const name = safeStr(body.name).trim();
  const email = safeStr(body.email).trim();
  const phone = safeStr(body.phone).trim();
  const pickupDate = safeStr(body.pickupDate).trim();
  const notes = safeStr(body.notes).trim();
  const items = normalizeItems(body.items);

  if (!name || !email) {
    sendJson(res, 400, { ok: false, error: "Naam en e-mail zijn verplicht." });
    return;
  }
  if (!isEmail(email)) {
    sendJson(res, 400, { ok: false, error: "Ongeldig e-mailadres." });
    return;
  }
  if (!pickupDate) {
    sendJson(res, 400, { ok: false, error: "Afhaaldatum is verplicht." });
    return;
  }

  const dayMeta = isAllowedBreadDay(pickupDate);
  if (!dayMeta.ok) {
    sendJson(res, 400, {
      ok: false,
      error: "Kies een afhaaldatum op donderdag, vrijdag, zaterdag of zondag (ma–wo kan niet).",
    });
    return;
  }

  if (!dayMeta.isSaturday) {
    const disallowed = new Set(["Noors Speltbrood", "Deens Roggebrood", "Foccaccia", "Stokbrood"]);
    const bad = items.find((i) => disallowed.has(i.label));
    if (bad) {
      sendJson(res, 400, {
        ok: false,
        error:
          "Noors Speltbrood, Deens Roggebrood, foccaccia en stokbrood zijn alleen op zaterdag te bestellen.",
      });
      return;
    }
  }
  if (!items.length && !notes) {
    sendJson(res, 400, { ok: false, error: "Kies minimaal 1 item of voeg opmerkingen toe." });
    return;
  }

  const pickupLine = pickupDate ? formatNlDate(pickupDate) : "-";

  const itemsText = items.length
    ? items.map((i) => `- ${i.qty}× ${i.label}`).join("\n")
    : "-";

  const subjectCompany = `Broodbestelling — ${pickupDate || "onbekend"} — ${name}`;
  const subjectSender = "Bevestiging — we hebben je bestelling ontvangen";

  const textToCompany = [
    "Broodbestelling via website — Bakkerij",
    "",
    `Naam: ${name}`,
    `Email: ${email}`,
    `Telefoon: ${phone || "-"}`,
    `Afhalen: ${pickupLine}`,
    "",
    "Items:",
    itemsText,
    "",
    "Opmerkingen:",
    notes || "-",
    "",
  ].join("\n");

  const htmlToCompany = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.6;">
      <h2 style="margin: 0 0 12px 0;">Broodbestelling via website</h2>
      <p style="margin: 0 0 10px 0;">
        <strong>Naam:</strong> ${escapeHtml(name)}<br/>
        <strong>Email:</strong> ${escapeHtml(email)}<br/>
        <strong>Telefoon:</strong> ${escapeHtml(phone || "-")}<br/>
        <strong>Afhalen:</strong> ${escapeHtml(pickupLine)}
      </p>
      <p style="margin: 0 0 6px 0;"><strong>Items:</strong></p>
      <ul style="margin: 0 0 10px 18px; padding: 0;">
        ${
          items.length
            ? items
                .map(
                  (i) =>
                    `<li>${escapeHtml(String(i.qty))}× ${escapeHtml(i.label)}</li>`,
                )
                .join("")
            : "<li>-</li>"
        }
      </ul>
      <p style="margin: 0 0 6px 0;"><strong>Opmerkingen:</strong></p>
      <pre style="margin: 0; white-space: pre-wrap; background: #fff6e6; padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(56,46,44,0.12);">${escapeHtml(
        notes || "-",
      )}</pre>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to: toCompany,
      replyTo: email,
      subject: subjectCompany,
      text: textToCompany,
      html: htmlToCompany,
    });

    await resend.emails.send({
      from,
      to: email,
      subject: subjectSender,
      text: [
        `Hoi ${name},`,
        "",
        "Bedankt voor je broodbestelling bij Café Keppler. Dit is de bevestiging van je bestelling.",
        "",
        "Je bestelling:",
        `Afhalen: ${pickupLine}`,
        `Telefoon: ${phone || "-"}`,
        "",
        "Items:",
        itemsText,
        "",
        "Opmerkingen:",
        notes || "-",
        "",
        "Afhalen bij:",
        "Van der Pekstraat 1 · 1031 CN Amsterdam",
        "",
        "Openingstijden:",
        "Ma Gesloten",
        "Di 08:30–16:00",
        "Wo 08:30–23:00",
        "Do 08:30–23:00",
        "Vr 08:30–00:00",
        "Za 09:00–00:00",
        "Zo 09:00–18:00",
        "",
        "Groet,",
        "Café Keppler",
      ].join("\n"),
      html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.6;">
          <p style="margin:0 0 10px 0;">Hoi ${escapeHtml(name)},</p>
          <p style="margin:0 0 10px 0;">Bedankt voor je broodbestelling bij <strong>Café Keppler</strong>. Dit is de bevestiging van je bestelling.</p>
          <div style="background:#fff6e6; padding:12px 14px; border-radius:14px; border:1px solid rgba(56,46,44,0.12); margin: 0 0 12px 0;">
            <p style="margin:0 0 6px 0;"><strong>Afhalen:</strong> ${escapeHtml(pickupLine)}</p>
            <p style="margin:0;"><strong>Telefoon:</strong> ${escapeHtml(phone || "-")}</p>
          </div>
          <p style="margin:0 0 6px 0;"><strong>Items:</strong></p>
          <ul style="margin: 0 0 12px 18px; padding: 0;">
            ${
              items.length
                ? items
                    .map(
                      (i) =>
                        `<li>${escapeHtml(String(i.qty))}× ${escapeHtml(i.label)}</li>`,
                    )
                    .join("")
                : "<li>-</li>"
            }
          </ul>
          <p style="margin: 0 0 6px 0;"><strong>Opmerkingen:</strong></p>
          <pre style="margin: 0 0 12px 0; white-space: pre-wrap; background: #fff; padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(56,46,44,0.12);">${escapeHtml(
            notes || "-",
          )}</pre>
          <div style="background:#fff; padding:12px 14px; border-radius:14px; border:1px solid rgba(56,46,44,0.12); margin: 0 0 12px 0;">
            <p style="margin:0 0 6px 0;"><strong>Afhalen bij:</strong><br/>Van der Pekstraat 1 · 1031 CN Amsterdam</p>
            <p style="margin:0;"><strong>Openingstijden:</strong><br/>
              Ma Gesloten<br/>
              Di 08:30–16:00<br/>
              Wo 08:30–23:00<br/>
              Do 08:30–23:00<br/>
              Vr 08:30–00:00<br/>
              Za 09:00–00:00<br/>
              Zo 09:00–18:00
            </p>
          </div>
          <p style="margin:0;">Groet,<br/>Café Keppler</p>
        </div>
      `,
    });

    sendJson(res, 200, { ok: true });
  } catch (e: any) {
    sendJson(res, 500, {
      ok: false,
      error: e?.message ? String(e.message) : "Resend fout.",
    });
  }
}

