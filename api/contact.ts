import { Resend } from "resend";

type Payload = {
  name: string;
  email: string;
  message: string;
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
  const message = safeStr(body.message).trim();

  if (!name || !email || !message) {
    sendJson(res, 400, { ok: false, error: "Naam, e-mail en bericht zijn verplicht." });
    return;
  }
  if (!isEmail(email)) {
    sendJson(res, 400, { ok: false, error: "Ongeldig e-mailadres." });
    return;
  }

  const resend = new Resend(apiKey);

  const subjectCompany = `Bericht via website (Contact) — ${name}`;
  const subjectSender = `Bevestiging — we hebben je bericht ontvangen`;

  const textToCompany = [
    "Bericht via de website (Contact)",
    "",
    `Naam: ${name}`,
    `Email: ${email}`,
    "",
    message,
    "",
  ].join("\n");

  const htmlToCompany = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.6;">
      <h2 style="margin: 0 0 12px 0;">Bericht via website</h2>
      <p style="margin: 0 0 10px 0;"><strong>Naam:</strong> ${escapeHtml(name)}<br/>
      <strong>Email:</strong> ${escapeHtml(email)}</p>
      <pre style="margin: 0; white-space: pre-wrap; background: #fff6e6; padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(56,46,44,0.12);">${escapeHtml(
        message,
      )}</pre>
    </div>
  `;

  try {
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
      text:
        "Bedankt voor je bericht. We hebben je bericht goed ontvangen en nemen zo snel mogelijk contact met je op.\n\nGroet,\nCafé Keppler",
      html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.6;">
          <p style="margin:0 0 10px 0;">Bedankt voor je bericht. We hebben je bericht goed ontvangen en nemen zo snel mogelijk contact met je op.</p>
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

