import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function extractError(error) {
  const dataMessage =
    error?.response?.data?.message ||
    error?.response?.body?.message ||
    error?.body?.message;
  const code =
    error?.response?.data?.name ||
    error?.response?.data?.code ||
    error?.code;
  const message = dataMessage || error?.message || 'Failed to send message.';
  return code ? `${message} (${code})` : message;
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'andrewbaje00@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!process.env.RESEND_API_KEY || !toEmail || !fromEmail) {
    return res.status(500).json({
      ok: false,
      message: 'Missing server email config. Set RESEND_API_KEY and RESEND_FROM_EMAIL.',
    });
  }

  const { name = '', email = '', message = '' } = parseBody(req);
  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim();
  const cleanMessage = String(message).trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ ok: false, message: 'Please complete all fields.' });
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: cleanEmail,
      subject: `New portfolio inquiry from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
      html: `
        <h2>New Portfolio Inquiry</h2>
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${cleanMessage.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    const details = extractError(error);
    console.error('[contact-api] resend send failed:', details);
    return res.status(500).json({
      ok: false,
      message: details,
    });
  }
}
