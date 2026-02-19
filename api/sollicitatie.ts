import { Resend } from "resend";

type Payload = {
  name: string;
  email: string;
  phone?: string;
  role: string;
  experienceLevel?: string;
  hoursPerWeek?: string;
  startDate?: string;
  days?: string[];
  availabilityBlock?: string;
  motivation?: string;
  cv?: { filename: string; contentBase64: string };
};

function sendJson(res: any, statusCode: number, payload: unknown) {
  // Works on Vercel (res.status().json()) and on local Node responses (res.end()).
  if (typeof res?.status === "function" && typeof res?.json === "function") {
    res.status(statusCode).json(payload);
    return;
  }
  res.statusCode = statusCode;
  res.setHeader?.("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function safeStr(v: unknown) {
  return typeof v === "string" ? v : "";
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
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

  const from = process.env.RESEND_FROM || "Café Keppler <onboarding@resend.dev>";
  const toCompany = process.env.RESEND_TO || "info@cafekeppler.nl";

  const body = (req.body || {}) as Partial<Payload>;
  const name = safeStr(body.name).trim();
  const email = safeStr(body.email).trim();
  const phone = safeStr(body.phone).trim();
  const role = safeStr(body.role).trim();
  const experienceLevel = safeStr(body.experienceLevel).trim();
  const hoursPerWeek = safeStr(body.hoursPerWeek).trim();
  const startDate = safeStr(body.startDate).trim();
  const availabilityBlock = safeStr(body.availabilityBlock).trim();
  const motivation = safeStr(body.motivation).trim();
  const days = Array.isArray(body.days) ? body.days.map(String) : [];
  const cvFilename = safeStr(body.cv?.filename).trim() || "cv.pdf";
  const cvBase64 = safeStr(body.cv?.contentBase64).trim();

  if (!name || !email || !role) {
    sendJson(res, 400, { ok: false, error: "Naam, e-mail en rol zijn verplicht." });
    return;
  }
  if (!isEmail(email)) {
    sendJson(res, 400, { ok: false, error: "Ongeldig e-mailadres." });
    return;
  }
  const resend = new Resend(apiKey);

  const subjectCompany = `Sollicitatie Café Keppler — ${role} — ${name}`;
  const subjectApplicant = `Bevestiging sollicitatie — Café Keppler`;

  const detailsText = [
    "Sollicitatie via website — Werken bij Café Keppler",
    "",
    `Naam: ${name}`,
    `Email: ${email}`,
    `Telefoon: ${phone || "-"}`,
    "",
    `Rol: ${role || "-"}`,
    `Ervaring (level): ${experienceLevel || "-"}`,
    `Uren per week: ${hoursPerWeek || "-"}`,
    `Startdatum: ${startDate || "-"}`,
    `Beschikbaar (dagen): ${days.length ? days.join(", ") : "-"}`,
    `Beschikbaar (blok): ${availabilityBlock || "-"}`,
    "",
    "Motivatie:",
    motivation || "-",
    "",
    `CV (PDF): ${cvBase64 ? cvFilename : "-"}`,
    "",
  ].join("\n");

  const detailsHtml = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5;">
      <h2 style="margin: 0 0 12px 0;">Sollicitatie via website</h2>
      <p style="margin: 0 0 10px 0;"><strong>Naam:</strong> ${escapeHtml(name)}<br/>
      <strong>Email:</strong> ${escapeHtml(email)}<br/>
      <strong>Telefoon:</strong> ${escapeHtml(phone || "-")}</p>

      <p style="margin: 0 0 10px 0;"><strong>Rol:</strong> ${escapeHtml(role || "-")}<br/>
      <strong>Ervaring:</strong> ${escapeHtml(experienceLevel || "-")}<br/>
      <strong>Uren per week:</strong> ${escapeHtml(hoursPerWeek || "-")}<br/>
      <strong>Startdatum:</strong> ${escapeHtml(startDate || "-")}<br/>
      <strong>Beschikbaar (dagen):</strong> ${escapeHtml(days.length ? days.join(", ") : "-")}<br/>
      <strong>Beschikbaar (blok):</strong> ${escapeHtml(availabilityBlock || "-")}</p>

      <p style="margin: 0 0 6px 0;"><strong>Motivatie:</strong></p>
      <pre style="margin: 0; white-space: pre-wrap; background: #fff6e6; padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(56,46,44,0.12);">${escapeHtml(
        motivation || "-",
      )}</pre>
      <p style="margin: 10px 0 0 0;"><strong>CV (PDF):</strong> ${escapeHtml(
        cvBase64 ? cvFilename : "-",
      )}</p>
    </div>
  `;

  try {
    // 1) Mail to company (CV optional)
    await resend.emails.send({
      from,
      to: toCompany,
      replyTo: email,
      subject: subjectCompany,
      text: detailsText,
      html: detailsHtml,
      attachments: cvBase64
        ? [
            {
              filename: cvFilename,
              content: cvBase64,
            },
          ]
        : undefined,
    });

    // 2) Confirmation to applicant (no attachment)
    await resend.emails.send({
      from,
      to: email,
      subject: subjectApplicant,
      text:
        "Bedankt voor je sollicitatie bij Café Keppler.\n\nWe hebben je sollicitatie goed ontvangen en nemen zo snel mogelijk contact met je op.\n\nGroet,\nCafé Keppler",
      html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.6;">
          <p style="margin:0 0 10px 0;">Bedankt voor je sollicitatie bij <strong>Café Keppler</strong>.</p>
          <p style="margin:0 0 10px 0;">We hebben je sollicitatie goed ontvangen en nemen zo snel mogelijk contact met je op.</p>
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

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

