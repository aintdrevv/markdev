# markdev

## Contact form email setup (Resend)

This project sends contact form submissions through a serverless API route at `api/contact.js`.

Set these environment variables in your hosting provider (and local env if needed):

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (must be a verified sender in Resend)
- `CONTACT_TO_EMAIL` (where messages are delivered)

Use `.env.example` as template.
