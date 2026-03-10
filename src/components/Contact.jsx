import { useEffect, useState } from 'react';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/aintdrevv',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.2-3.37-1.2-.46-1.18-1.12-1.49-1.12-1.49-.91-.62.06-.61.06-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.93.82.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.1-4.56-4.91 0-1.08.4-1.97 1.04-2.66-.1-.25-.45-1.25.1-2.61 0 0 .84-.26 2.75 1.02A9.8 9.8 0 0 1 12 6.58a9.8 9.8 0 0 1 2.51.33c1.9-1.28 2.74-1.02 2.74-1.02.55 1.36.2 2.36.1 2.61.65.69 1.04 1.58 1.04 2.66 0 3.82-2.34 4.66-4.57 4.91.36.31.68.91.68 1.85V21c0 .27.18.59.69.49A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mark-macaraig-25b9b3201/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.3 6.92 1.96 1.96 0 0 0 5.25 3ZM20.44 13.4c0-3.18-1.7-4.66-3.96-4.66-1.82 0-2.64 1-3.1 1.71V8.5H10V20h3.37v-6.17c0-.32.02-.64.12-.87.26-.64.84-1.3 1.82-1.3 1.28 0 1.79.98 1.79 2.4V20h3.34v-6.6Z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/mrkinyourheart',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.27-1.46 1.54-1.46H16.7V5.1c-.3-.04-1.32-.1-2.52-.1-2.5 0-4.18 1.52-4.18 4.3V11H7.3v3h2.7v8h3.5Z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [popup, setPopup] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!popup) return undefined;
    const timer = setTimeout(() => setPopup(null), 2400);
    return () => clearTimeout(timer);
  }, [popup]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setPopup({ type: 'error', message: 'Please complete all fields.' });
      return;
    }

    try {
      setIsSubmitting(true);
      const endpoints = import.meta.env.VITE_CONTACT_API_URL
        ? [import.meta.env.VITE_CONTACT_API_URL]
        : ['/api/contact', '/.netlify/functions/contact'];

      let delivered = false;
      let lastError = 'Failed to send message.';

      for (const endpoint of endpoints) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        const payload = await response.json().catch(() => null);
        const xanoStatus =
          typeof payload?.success === 'object' ? payload.success?.status : payload?.status;
        const xanoError =
          typeof payload?.success === 'object' ? payload.success?.error : payload?.error;
        const explicitFailure =
          payload?.ok === false ||
          payload?.success === false ||
          String(xanoStatus || '').toLowerCase() === 'error' ||
          Boolean(xanoError);

        if (response.ok && !explicitFailure) {
          delivered = true;
          break;
        }

        if (response.status === 404) {
          lastError = 'Contact API not found (404). Deploy with serverless functions (Vercel/Netlify).';
          continue;
        }

        lastError = payload?.message || xanoError || `Failed to send message (${response.status}).`;
        break;
      }

      if (!delivered) throw new Error(lastError);

      setPopup({ type: 'success', message: 'Message sent. I will get back to you soon.' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setPopup({
        type: 'error',
        message: error?.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="section !mb-0 !pb-0">
      <div className="container">
        <div className="mx-auto max-w-[580px] px-6 py-[88px] pb-16 md:px-12">
          <p
            className="text-center text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: 'var(--color-accent)' }}
          >
            Contact
          </p>

          <h2
            className="mt-4 text-center text-[2.5rem] font-extrabold leading-[0.95] sm:text-[3.5rem]"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          >
            Got a project in <span style={{ color: 'var(--color-accent)' }}>mind?</span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-[46ch] text-center text-base leading-8 sm:text-lg"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(var(--text-rgb), 0.7)' }}
          >
            Share the brief, the direction, or even just the rough idea. I'm open to building
            thoughtful frontend work with strong visual polish.
          </p>

          {popup ? (
            <p
              className="mt-6 text-center text-sm"
              style={{
                color:
                  popup.type === 'success'
                    ? 'var(--color-accent)'
                    : 'rgba(255, 146, 146, 0.92)',
              }}
            >
              {popup.message}
            </p>
          ) : null}

          <form className="mt-8 grid gap-[14px]" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Name"
                required
                className="w-full border px-[18px] py-[14px] text-sm outline-none placeholder:text-white/20 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={(event) => {
                  event.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.5)';
                  event.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--brand-rgb), 0.12)';
                }}
                onBlur={(event) => {
                  event.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  event.currentTarget.style.boxShadow = 'none';
                }}
              />

              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="Email"
                required
                className="w-full border px-[18px] py-[14px] text-sm outline-none placeholder:text-white/20 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={(event) => {
                  event.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.5)';
                  event.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--brand-rgb), 0.12)';
                }}
                onBlur={(event) => {
                  event.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  event.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <textarea
              rows="6"
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              placeholder="Message"
              required
              className="h-[130px] w-full resize-none border px-[18px] py-[14px] text-sm outline-none placeholder:text-white/20 transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.08)',
                borderRadius: '12px',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
              }}
              onFocus={(event) => {
                event.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.5)';
                event.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--brand-rgb), 0.12)';
              }}
              onBlur={(event) => {
                event.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                event.currentTarget.style.boxShadow = 'none';
              }}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-submit-button mt-2 w-full rounded-full py-[14px] text-sm font-semibold tracking-[0.04em] transition-all duration-200"
              style={{
                background: 'var(--color-accent)',
                color: '#06080D',
                fontFamily: 'var(--font-display)',
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
                style={{
                  color: 'rgba(var(--text-rgb), 0.62)',
                  background: 'rgba(255,255,255,0.04)',
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = 'var(--color-accent)';
                  event.currentTarget.style.background = 'rgba(var(--brand-rgb), 0.08)';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = 'rgba(var(--text-rgb), 0.62)';
                  event.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                <span className="h-[18px] w-[18px]">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
