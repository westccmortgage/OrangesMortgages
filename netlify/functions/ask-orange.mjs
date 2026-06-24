// Netlify Function (v2) — receives the "Ask Orange" lead form and emails it
// via the Resend API. No npm dependencies: uses the built-in fetch.
//
// Required Netlify environment variable:
//   RESEND_API_KEY  — your Resend API key (Site config → Environment variables)
// Optional overrides:
//   MAIL_FROM       — sender, must be on a domain verified in Resend
//                     (default: "Orange Mortgage <noreply@orangesmortgages.com>")
//   LEAD_TO         — recipient (default: "orange@orangesmortgages.com")

export const config = { path: "/api/ask-orange" };

const escape = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export default async (req) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  // Accept either JSON or form-encoded bodies.
  let data = {};
  try {
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      data = await req.json();
    } else {
      const fd = await req.formData();
      data = Object.fromEntries(fd);
    }
  } catch {
    return json({ error: "Could not read form data" }, 400);
  }

  // Honeypot: if a bot filled the hidden field, pretend success and drop it.
  if (data["bot-field"]) return json({ ok: true });

  const first = (data.first || "").toString().trim();
  const last = (data.last || "").toString().trim();
  const email = (data.email || "").toString().trim();
  const phone = (data.phone || "").toString().trim();
  const goal = (data.goal || "").toString().trim();

  if (!first || !last || !email) {
    return json({ error: "Please include your name and email." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ error: "Email is not configured yet." }, 500);
  }

  const from = process.env.MAIL_FROM || "Orange Mortgage <noreply@orangesmortgages.com>";
  const to = process.env.LEAD_TO || "orange@orangesmortgages.com";

  const name = `${first} ${last}`;
  const subject = `🍊 New Ask Orange lead: ${name}`;
  const lines = [
    `Name:  ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Goal:  ${goal || "—"}`,
    ``,
    `Sent from the Ask Orange form on orangesmortgages.com`,
  ];
  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;color:#14264a;max-width:560px">
      <h2 style="margin:0 0 12px">🍊 New Ask Orange lead</h2>
      <table style="border-collapse:collapse;font-size:15px">
        <tr><td style="padding:6px 14px 6px 0;color:#5b6678">Name</td><td><strong>${escape(name)}</strong></td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#5b6678">Email</td><td><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#5b6678">Phone</td><td>${escape(phone) || "—"}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#5b6678">Looking to</td><td>${escape(goal) || "—"}</td></tr>
      </table>
      <p style="color:#8a93a3;font-size:12px;margin-top:18px">Sent from the Ask Orange form on orangesmortgages.com</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text: lines.join("\n"),
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return json({ error: "Could not send right now.", detail }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    return json({ error: "Could not send right now.", detail: String(err) }, 502);
  }
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
