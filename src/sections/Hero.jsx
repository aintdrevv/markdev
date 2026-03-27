function jumpToContact() {
  const target = document.getElementById('contacts');
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function Hero() {
  return (
    <section id="hero" className="hero hero-v2 section">
      <style>{`
        /* Hero-only entrance motion stays local to this section. */
        @keyframes fadeScaleBg {
          from { opacity: 0; transform: translate(-50%, -48%) scale(1.06); }
          to   { opacity: 1; transform: translate(-50%, -48%) scale(1); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
        .hero-bg-stack {
          position: absolute;
          top: 55%; left: 50%;
          transform: translate(-50%, -43%);
          display: flex; flex-direction: column;
          align-items: center;
          line-height: 0.82;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          animation: fadeScaleBg 0.9s cubic-bezier(0.25,0.46,0.45,0.94) 0s both;
        }
        .hero-bg-stack span {
          display: block;
        }
        .hero-bg-word {
          display: flex !important;
        }
        .hero-kicker,
        .hero-v2-kicker {
          animation: fadeDown 0.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s both;
        }
        .hero h1,
        .hero-v2-title {
          animation: fadeDown 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.5s both;
        }
        .hero > .container > .hero-content > p,
        .hero-v2-copy {
          animation: fadeDown 0.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.75s both;
        }
        .hero-actions,
        .hero-v2-actions {
          animation: fadeUp 0.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.9s both;
        }
        .hero-scroll,
        .hero-v2-scroll {
          animation: fadeUp 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 1.2s both;
          animation-fill-mode: both;
        }
        .hero-scroll-line,
        .hero-v2-scroll-line {
          animation: scrollPulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="container hero-v2-shell">
        <div className="hero-v2-content">
          <div className="hero-v2-copy-block">
            {/* Oversized background wordmark behind the main hero copy */}
            <div className="hero-v2-bg hero-bg-stack" aria-hidden="true">
              <span className="hero-bg-word hero-bg-word-mark">
                <span>M</span>
                <span>A</span>
                <span>R</span>
                <span>K</span>
              </span>
              <span className="hero-bg-word hero-bg-word-dev">
                <span>D</span>
                <span>E</span>
                <span>V</span>
              </span>
            </div>

            {/* Primary hero message */}
            <h1 className="hero-v2-title">
              <span>Interfaces built</span>
              <br />
              <span>with care and clarity.</span>
            </h1>
            
            <p className="hero-v2-copy">
              Frontend developer building clean, responsive interfaces with clarity and purpose.
            </p>
          </div>

          {/* Primary CTA plus quick resume access */}
          <div className="hero-v2-actions">
            <button className="hero-v2-btn hero-v2-btn-primary hero-v2-btn-launch" type="button" onClick={jumpToContact}>
              Launch Project
            </button>
            <a
              className="hero-v2-btn hero-v2-btn-secondary hero-v2-btn-cv"
              href="/Mark-Macaraig-CV.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
