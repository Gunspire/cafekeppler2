import { Resend } from "resend";

const BUSINESS_INBOX = "cafekepplernoord@gmail.com";

type Payload = {
  firstName: string;
  lastName: string;
  company?: string;
  people: string;
  date: string;
  time: string;
  message?: string;
  type: string;
  typeOther?: string;
  email: string;
  phone: string;
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

function formatNlDate(dateStr: string) {
  const dt = parseLocalDate(dateStr);
  if (!dt) return dateStr;
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
  const toCompany = BUSINESS_INBOX;

  const rawBody = req.body;
  const body = (
    typeof rawBody === "string"
      ? (() => {
          try {
            return JSON.parse(rawBody) as Partial<Payload>;
          } catch {
            return {};
          }
        })()
      : rawBody || {}
  ) as Partial<Payload>;
  const firstName = safeStr(body.firstName).trim();
  const lastName = safeStr(body.lastName).trim();
  const company = safeStr(body.company).trim();
  const people = safeStr(body.people).trim();
  const date = safeStr(body.date).trim();
  const time = safeStr(body.time).trim();
  const message = safeStr(body.message).trim();
  const type = safeStr(body.type).trim() || "Borrel";
  const typeOther = safeStr(body.typeOther).trim();
  const email = safeStr(body.email).trim();
  const phone = safeStr(body.phone).trim();

  const meetingType = type === "Anders" ? `Anders: ${typeOther || "-"}` : type;
  const fullName = `${firstName} ${lastName}`.trim();

  if (!firstName || !lastName || !people || !date || !time || !email || !phone) {
    sendJson(res, 400, {
      ok: false,
      error:
        "Voornaam, achternaam, aantal personen, datum, tijd, e-mail en telefoon zijn verplicht.",
    });
    return;
  }
  if (!isEmail(email)) {
    sendJson(res, 400, { ok: false, error: "Ongeldig e-mailadres." });
    return;
  }
  if (type === "Anders" && !typeOther) {
    sendJson(res, 400, { ok: false, error: "Vul in wat je bedoelt bij ‘Anders’." });
    return;
  }

  const dateLine = formatNlDate(date);

  const subjectCompany = `Groepsreservering — ${fullName} — ${date}`;
  const subjectSender = "Bevestiging — we hebben je aanvraag ontvangen";

  const textToCompany = [
    "Groepsreservering via website — Groepen",
    "",
    `Naam: ${fullName}`,
    `Bedrijfsnaam: ${company || "-"}`,
    `Type bijeenkomst: ${meetingType}`,
    `Aantal personen: ${people}`,
    `Datum: ${dateLine} (${date})`,
    `Tijd: ${time}`,
    `Email: ${email}`,
    `Telefoon: ${phone}`,
    "",
    "Bericht:",
    message || "-",
    "",
  ].join("\n");

  const htmlToCompany = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.6;">
      <h2 style="margin: 0 0 12px 0;">Groepsreservering via website</h2>
      <p style="margin: 0 0 10px 0;">
        <strong>Naam:</strong> ${escapeHtml(fullName)}<br/>
        <strong>Bedrijfsnaam:</strong> ${escapeHtml(company || "-")}<br/>
        <strong>Type bijeenkomst:</strong> ${escapeHtml(meetingType)}<br/>
        <strong>Aantal personen:</strong> ${escapeHtml(people)}<br/>
        <strong>Datum:</strong> ${escapeHtml(dateLine)}<br/>
        <strong>Tijd:</strong> ${escapeHtml(time)}<br/>
        <strong>Email:</strong> ${escapeHtml(email)}<br/>
        <strong>Telefoon:</strong> ${escapeHtml(phone)}
      </p>
      <p style="margin: 0 0 6px 0;"><strong>Bericht:</strong></p>
      <pre style="margin: 0; white-space: pre-wrap; background: #fff6e6; padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(56,46,44,0.12);">${escapeHtml(
        message || "-",
      )}</pre>
    </div>
  `;

  const resend = new Resend(apiKey);

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
      text: [
        `Hoi ${firstName},`,
        "",
        "Bedankt voor je aanvraag voor een groepsreservering bij Café Keppler.",
        "We hebben je gegevens goed ontvangen en nemen zo snel mogelijk contact met je op.",
        "",
        "Samenvatting:",
        `Type: ${meetingType}`,
        `Personen: ${people}`,
        `Datum: ${dateLine}`,
        `Tijd: ${time}`,
        "",
        "Groet,",
        "Café Keppler",
      ].join("\n"),
      html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.6;">
          <p style="margin:0 0 10px 0;">Hoi ${escapeHtml(firstName)},</p>
          <p style="margin:0 0 10px 0;">Bedankt voor je aanvraag voor een <strong>groepsreservering</strong> bij Café Keppler. We hebben je gegevens goed ontvangen en nemen zo snel mogelijk contact met je op.</p>
          <div style="background:#fff6e6; padding:12px 14px; border-radius:14px; border:1px solid rgba(56,46,44,0.12); margin: 0 0 12px 0;">
            <p style="margin:0 0 6px 0;"><strong>Type:</strong> ${escapeHtml(meetingType)}</p>
            <p style="margin:0 0 6px 0;"><strong>Personen:</strong> ${escapeHtml(people)}</p>
            <p style="margin:0 0 6px 0;"><strong>Datum:</strong> ${escapeHtml(dateLine)}</p>
            <p style="margin:0;"><strong>Tijd:</strong> ${escapeHtml(time)}</p>
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
