import { useState, useEffect } from 'react';

const typingPhrases = [
  'digital experiences.',
  'clean interfaces.',
  'bold solutions.',
  'modern web apps.',
];

function jumpToContact() {
  const target = document.getElementById('contacts');
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function Hero() {
  const [socialOpen, setSocialOpen] = useState(false);
  const [displayed, setDisplayed] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = typingPhrases[phraseIndex];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 70);
    } else if (!isDeleting && displayed.length === current.length) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 40);
    } else if (isDeleting && displayed.length === 0) {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % typingPhrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex]);

  return (
    <section id="hero" className="hero section">
      <div className="container">
        <div className="hero-content">
          <p className="section-kicker">Frontend Developer</p>
          <h1>
            Building bold <span>{displayed}<span className="typing-cursor">|</span></span>
          </h1>
          <p>
            Hi, I am Mark Macaraig. I design and build clean interfaces with React, modern CSS,
            and strong attention to detail. This new portfolio version is focused on clarity,
            speed, and visual impact.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" type="button" onClick={jumpToContact}>
              Start a project
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`social-toggle ${socialOpen ? 'open' : ''}`}
        aria-label="Toggle social links"
        aria-expanded={socialOpen}
        onClick={() => setSocialOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14.7 5.3a1 1 0 0 1 0 1.4L9.41 12l5.3 5.3a1 1 0 0 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.41 0Z" />
        </svg>
      </button>

      <div className={`floating-socials ${socialOpen ? 'open' : ''}`} aria-label="Social links">
        <button
          type="button"
          className="social-close"
          aria-label="Close social links"
          onClick={() => setSocialOpen(false)}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.7 5.3a1 1 0 0 1 1.4 0L12 9.18l3.9-3.88a1 1 0 1 1 1.4 1.42L13.4 10.6l3.9 3.9a1 1 0 1 1-1.4 1.4L12 12.02l-3.88 3.9a1 1 0 1 1-1.42-1.4l3.9-3.9-3.9-3.9a1 1 0 0 1 0-1.41Z" />
          </svg>
        </button>
        <a href="https://github.com/aintdrevv" target="_blank" rel="noreferrer" aria-label="GitHub" onClick={() => setSocialOpen(false)}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.2-3.37-1.2-.46-1.18-1.12-1.49-1.12-1.49-.91-.62.06-.61.06-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.93.82.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.1-4.56-4.91 0-1.08.4-1.97 1.04-2.66-.1-.25-.45-1.25.1-2.61 0 0 .84-.26 2.75 1.02A9.8 9.8 0 0 1 12 6.58a9.8 9.8 0 0 1 2.51.33c1.9-1.28 2.74-1.02 2.74-1.02.55 1.36.2 2.36.1 2.61.65.69 1.04 1.58 1.04 2.66 0 3.82-2.34 4.66-4.57 4.91.36.31.68.91.68 1.85V21c0 .27.18.59.69.49A10 10 0 0 0 12 2Z" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/mark-macaraig-25b9b3201/" target="_blank" rel="noreferrer" aria-label="LinkedIn" onClick={() => setSocialOpen(false)}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.3 6.92 1.96 1.96 0 0 0 5.25 3ZM20.44 13.4c0-3.18-1.7-4.66-3.96-4.66-1.82 0-2.64 1-3.1 1.71V8.5H10V20h3.37v-6.17c0-.32.02-.64.12-.87.26-.64.84-1.3 1.82-1.3 1.28 0 1.79.98 1.79 2.4V20h3.34v-6.6Z" />
          </svg>
        </a>
        <a href="https://www.facebook.com/mrkinyourheart" target="_blank" rel="noreferrer" aria-label="Facebook" onClick={() => setSocialOpen(false)}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.27-1.46 1.54-1.46H16.7V5.1c-.3-.04-1.32-.1-2.52-.1-2.5 0-4.18 1.52-4.18 4.3V11H7.3v3h2.7v8h3.5Z" />
          </svg>
        </a>
      </div>
    </section>
  );
}