function jumpToContact() {
  const target = document.getElementById('contacts');
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function Hero() {
  return (
    <section id="hero" className="hero hero-v2 section">
      <div className="hero-v2-bg" aria-hidden="true">
        <span>MARK</span>
        <span>DEV</span>
      </div>

      <div className="container hero-v2-shell">
        <div className="hero-v2-content">
          <h1 className="hero-v2-title">
            <span>Building digital</span>
            <span className="typing-cursor hero-v2-cursor">|</span>
            <br />
            <span>that feel alive.</span>
          </h1>

          <p className="hero-v2-copy">
            Frontend work shaped to feel sharp, alive, and clear.
          </p>

          <div className="hero-v2-actions">
            <button className="hero-v2-btn hero-v2-btn-primary" type="button" onClick={jumpToContact}>
              Launch Project
            </button>
            <a
              className="hero-v2-btn hero-v2-btn-secondary"
              href="/Mark-Macaraig-CV.pdf"
              target="_blank"
              rel="noreferrer"
              download
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
