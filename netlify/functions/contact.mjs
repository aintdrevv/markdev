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

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: JSON.stringify({ ok: false, message: 'Method not allowed.' }),
    };
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'andrewbaje00@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!process.env.RESEND_API_KEY || !fromEmail) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        message: 'Missing server email config. Set RESEND_API_KEY and RESEND_FROM_EMAIL.',
      }),
    };
  }

  let body = {};
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch {
    body = {};
  }

  const cleanName = String(body.name || '').trim();
  const cleanEmail = String(body.email || '').trim();
  const cleanMessage = String(body.message || '').trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, message: 'Please complete all fields.' }),
    };
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

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    const details = extractError(error);
    console.error('[netlify-contact] resend send failed:', details);
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        message: details,
      }),
    };
  }
}
