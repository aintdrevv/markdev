import { useEffect, useState } from 'react';

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
      // Try the configured endpoint first, then fall back to supported serverless routes.
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
    <section id="contacts" className="section section-contact">
      <div className="container">
        <div className="mx-auto max-w-[580px] px-6 py-[88px] pb-16 md:px-12">
          <p
            className="text-center text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: 'var(--color-accent)' }}
          >
            Contact
          </p>

          <h2
            className="section-title section-title-modern mt-4 text-center"
            style={{ color: 'var(--text)' }}
          >
            Got a project in <span style={{ color: 'var(--color-accent)' }}>mind?</span>
          </h2>

          <p
            className="section-copy mx-auto mt-5 text-center"
            style={{ maxWidth: '46ch', color: 'rgba(var(--text-rgb), 0.7)' }}
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

          {/* Inline contact form used directly on the page */}
          <form className="mt-8 grid gap-[14px]" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
              <input
                id="contact-name"
                name="name"
                type="text"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Name"
                autoComplete="name"
                required
                className="contact-field-input w-full border px-[18px] py-[14px] text-sm outline-none transition-all duration-200"
                style={{
                  background: 'var(--input-surface)',
                  borderColor: 'rgba(var(--brand-rgb), 0.16)',
                  borderRadius: '12px',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={(event) => {
                  event.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.5)';
                  event.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--brand-rgb), 0.12)';
                  event.currentTarget.style.background = 'var(--input-surface-focus)';
                }}
                onBlur={(event) => {
                  event.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.16)';
                  event.currentTarget.style.boxShadow = 'none';
                  event.currentTarget.style.background = 'var(--input-surface)';
                }}
              />

              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="Email"
                autoComplete="email"
                required
                className="contact-field-input w-full border px-[18px] py-[14px] text-sm outline-none transition-all duration-200"
                style={{
                  background: 'var(--input-surface)',
                  borderColor: 'rgba(var(--brand-rgb), 0.16)',
                  borderRadius: '12px',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={(event) => {
                  event.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.5)';
                  event.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--brand-rgb), 0.12)';
                  event.currentTarget.style.background = 'var(--input-surface-focus)';
                }}
                onBlur={(event) => {
                  event.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.16)';
                  event.currentTarget.style.boxShadow = 'none';
                  event.currentTarget.style.background = 'var(--input-surface)';
                }}
              />
            </div>

            <textarea
              id="contact-message"
              name="message"
              rows="6"
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              placeholder="Message"
              autoComplete="off"
              required
              className="contact-field-input h-[130px] w-full resize-none border px-[18px] py-[14px] text-sm outline-none transition-all duration-200"
              style={{
                background: 'var(--input-surface)',
                borderColor: 'rgba(var(--brand-rgb), 0.16)',
                borderRadius: '12px',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
              }}
              onFocus={(event) => {
                event.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.5)';
                event.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--brand-rgb), 0.12)';
                event.currentTarget.style.background = 'var(--input-surface-focus)';
              }}
              onBlur={(event) => {
                event.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.16)';
                event.currentTarget.style.boxShadow = 'none';
                event.currentTarget.style.background = 'var(--input-surface)';
              }}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-submit-button mt-2 w-full rounded-full py-[14px] text-sm font-semibold tracking-[0.04em] transition-all duration-200"
              style={{
                background: 'var(--color-accent)',
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
