import { useRef, useState } from 'react';

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [toast, setToast] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setToast('');

    const data = new FormData(formRef.current);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
      to_email: 'andrewbaje00@gmail.com',
    };

    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:7XacDfnY/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('failed');
      }

      setStatus('success');
      setToast('Message sent. Thanks for reaching out.');
      formRef.current.reset();
    } catch {
      setStatus('error');
      setToast('Could not send your message right now. Please try again.');
    }
  };

  return (
    <section id="contacts" className="section">
      <div className="container">
        <p className="section-kicker">Contact</p>
        <h2 className="section-title">Let us build something useful.</h2>
        <p className="section-copy">
          Open for internships, junior frontend opportunities, and freelance projects.
        </p>

        <article className="glass-card contact-card contact-wrap">
          <h3>Send a message</h3>
          <p className="contact-intro">Tell me about your project and I will reply as soon as possible.</p>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-column">
              <label>
                Name
                <input type="text" name="name" required placeholder="Your name" />
              </label>

              <label>
                Email
                <input type="email" name="email" required placeholder="you@example.com" />
              </label>
            </div>

            <label>
              Project details
              <textarea name="message" rows="5" required placeholder="Share your idea or request." />
            </label>

            <div className="contact-actions">
              <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </form>

          {toast && <div className={`contact-toast ${status === 'success' ? 'success' : 'error'}`}>{toast}</div>}
        </article>
      </div>
    </section>
  );
}
