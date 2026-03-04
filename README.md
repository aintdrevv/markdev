# markdev

## Contact form email setup (Resend)

This project sends contact form submissions through a serverless API route at `api/contact.js`.
It also supports Netlify Functions at `netlify/functions/contact.mjs`.

Set these environment variables in your hosting provider (and local env if needed):

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (must be a verified sender in Resend)
- `CONTACT_TO_EMAIL` (where messages are delivered, default fallback: `andrewbaje00@gmail.com`)
- `VITE_CONTACT_API_URL` (optional override if your API lives on another domain/path)

Use `.env.example` as template.

## Important deployment note

Contact email sending requires serverless functions. It will not work on static-only hosting (for example plain GitHub Pages).

- Vercel: uses `api/contact.js`
- Netlify: uses `netlify/functions/contact.mjs`
