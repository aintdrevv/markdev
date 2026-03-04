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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        throw new Error(payload?.message || 'Failed to send message.');
      }

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
    <section id="contacts" className="section contact-section">
      <div className="container">
        <article className="contact-glass-card">
          <div className="contact-glass-main">
            <div className="contact-glass-left">
              <h3>Get in touch</h3>
              <p className="contact-glass-lead">Let us build something clean, modern, and useful.</p>
              <p className="contact-glass-copy">
                I help turn ideas into polished interfaces focused on speed, clarity, and strong
                visual structure. Share your project details and let us start building.
              </p>
              <div className="contact-modern-icons" aria-label="Social media links">
                <a href="https://github.com/aintdrevv" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.2-3.37-1.2-.46-1.18-1.12-1.49-1.12-1.49-.91-.62.06-.61.06-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.93.82.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.1-4.56-4.91 0-1.08.4-1.97 1.04-2.66-.1-.25-.45-1.25.1-2.61 0 0 .84-.26 2.75 1.02A9.8 9.8 0 0 1 12 6.58a9.8 9.8 0 0 1 2.51.33c1.9-1.28 2.74-1.02 2.74-1.02.55 1.36.2 2.36.1 2.61.65.69 1.04 1.58 1.04 2.66 0 3.82-2.34 4.66-4.57 4.91.36.31.68.91.68 1.85V21c0 .27.18.59.69.49A10 10 0 0 0 12 2Z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/mark-macaraig-25b9b3201/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.3 6.92 1.96 1.96 0 0 0 5.25 3ZM20.44 13.4c0-3.18-1.7-4.66-3.96-4.66-1.82 0-2.64 1-3.1 1.71V8.5H10V20h3.37v-6.17c0-.32.02-.64.12-.87.26-.64.84-1.3 1.82-1.3 1.28 0 1.79.98 1.79 2.4V20h3.34v-6.6Z" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/mrkinyourheart" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.27-1.46 1.54-1.46H16.7V5.1c-.3-.04-1.32-.1-2.52-.1-2.5 0-4.18 1.52-4.18 4.3V11H7.3v3h2.7v8h3.5Z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="contact-glass-right">
              {popup && <div className={`contact-popup ${popup.type}`}>{popup.message}</div>}

              <form className="contact-glass-form" onSubmit={handleSubmit}>
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Your name"
                  required
                />

                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="you@example.com"
                  required
                />

                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  rows="5"
                  value={form.message}
                  onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  placeholder="Tell me about your project..."
                  required
                />

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
