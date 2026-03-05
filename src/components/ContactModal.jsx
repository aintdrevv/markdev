import { useEffect, useState } from 'react';

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
        const explicitFailure = payload?.ok === false || payload?.success === false || Boolean(payload?.error);

        if (response.ok && !explicitFailure) {
          delivered = true;
          break;
        }

        if (response.status === 404) {
          lastError = 'Contact API not found (404).';
          continue;
        }

        lastError = payload?.message || payload?.error || `Failed to send message (${response.status}).`;
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
    <div className="contact-modal-overlay" role="dialog" aria-modal="true" aria-label="Contact form modal" onClick={onClose}>
      <div className="contact-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="contact-modal-close" aria-label="Close contact modal" onClick={onClose}>
          x
        </button>
        <h3>Let us work together</h3>
        <p>Share your project details and I will reply as soon as possible.</p>

        {status.message ? (
          <div className={`contact-modal-status ${status.type}`}>
            {status.message}
          </div>
        ) : null}

        <form className="contact-modal-form" onSubmit={handleSubmit}>
          <label htmlFor="modal-name">Name</label>
          <input
            id="modal-name"
            type="text"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Your name"
            required
          />

          <label htmlFor="modal-email">Email</label>
          <input
            id="modal-email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="modal-message">Message</label>
          <textarea
            id="modal-message"
            rows="4"
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
  );
}
