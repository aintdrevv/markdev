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

function getEndpoints() {
  return import.meta.env.VITE_CONTACT_API_URL
    ? [import.meta.env.VITE_CONTACT_API_URL]
    : ['/api/contact', '/.netlify/functions/contact'];
}

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim();
    const cleanMessage = form.message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setStatus({ type: 'error', message: 'Please complete all fields.' });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus({ type: '', message: '' });

      let delivered = false;
      let lastError = 'Failed to send message.';

      for (const endpoint of getEndpoints()) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: cleanName, email: cleanEmail, message: cleanMessage }),
        });

        const payload = await response.json().catch(() => null);
        const explicitFailure =
          payload?.ok === false || payload?.success === false || Boolean(payload?.error);

        if (response.ok && !explicitFailure) {
          delivered = true;
          break;
        }

        if (response.status === 404) {
          lastError = 'Contact API not found (404).';
          continue;
        }

        lastError =
          payload?.message || payload?.error || `Failed to send message (${response.status}).`;
        break;
      }

      if (!delivered) throw new Error(lastError);

      setStatus({ type: 'success', message: 'Message sent. I will get back to you soon.' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error?.message || 'Failed to send message.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes modalScalePop {
          0% {
            opacity: 0;
            transform: scale(0.94) translateY(12px);
          }
          70% {
            opacity: 1;
            transform: scale(1.01) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes modalPanelPop {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        className="contact-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Contact form modal"
        onClick={onClose}
      >
        <div
          className="contact-modal"
          style={{
            transformOrigin: 'center',
            animation: 'modalScalePop 320ms cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <div
            className="contact-modal-left"
            style={{
              animation: 'modalPanelPop 240ms cubic-bezier(0.22, 1, 0.36, 1) 40ms both',
            }}
          >
            <div>
              <p className="contact-modal-kicker">Quick Inquiry</p>
              <h3>Let&apos;s build something great.</h3>
              <p>
                Share the direction, the scope, or the rough idea. I&apos;ll help turn it into
                something sharp and usable.
              </p>
            </div>

            <div className="contact-modal-socials">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div
            className="contact-modal-right"
            style={{
              animation: 'modalPanelPop 240ms cubic-bezier(0.22, 1, 0.36, 1) 60ms both',
            }}
          >
            <div className="contact-modal-head">
              <button
                type="button"
                className="contact-modal-close"
                aria-label="Close contact modal"
                onClick={onClose}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 6 18 18" />
                  <path d="M18 6 6 18" />
                </svg>
              </button>
            </div>

          {status.message ? (
            <div className={`contact-modal-status ${status.type}`}>{status.message}</div>
          ) : null}

          <form className="contact-modal-form" onSubmit={handleSubmit}>
            <div className="contact-modal-field">
              <label htmlFor="modal-name">Name</label>
              <input
                id="modal-name"
                type="text"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Your name"
                required
              />
            </div>

            <div className="contact-modal-field">
              <label htmlFor="modal-email">Email</label>
              <input
                id="modal-email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="contact-modal-field">
              <label htmlFor="modal-message">Message</label>
              <textarea
                id="modal-message"
                rows="4"
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <div className="contact-modal-actions">
              <button type="submit" disabled={isSubmitting} className="contact-submit-button">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              <a
                className="contact-modal-cv"
                href="/Mark-Macaraig-CV.pdf"
                target="_blank"
                rel="noreferrer"
                download
              >
                Download CV
              </a>
            </div>
          </form>
        </div>
        </div>
      </div>
    </>
  );
}
