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
    href: 'https://www.facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.27-1.46 1.54-1.46H16.7V5.1c-.3-.04-1.32-.1-2.52-.1-2.5 0-4.18 1.52-4.18 4.3V11H7.3v3h2.7v8h3.5Z" />
      </svg>
    ),
  },
];

export default function Footer({ onHireClick }) {
  return (
    <footer id="contacts" className="site-footer">
      <style>{`
        .footer-bg-stack {
          position: absolute;
          inset: 50% auto auto 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 0.82;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          opacity: 0.075;
          white-space: nowrap;
        }

        .footer-bg-stack span {
          display: block;
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: -0.08em;
          font-size: clamp(4.5rem, 14vw, 10rem);
          color: var(--text);
        }

        @media (max-width: 767px) {
          .footer-bg-stack {
            inset: 52% auto auto 50%;
            opacity: 0.045;
          }

          .footer-bg-stack span {
            font-size: clamp(3rem, 19vw, 6rem);
          }
        }
      `}</style>
      <div
        className="relative mx-auto overflow-hidden border-t py-12 md:py-14"
        style={{
          width: '100vw',
          maxWidth: '100vw',
          borderColor: 'rgba(var(--brand-rgb), 0.14)',
        }}
      >
        <div className="footer-bg-stack" aria-hidden="true">
          <span>MARK</span>
          <span>DEV</span>
        </div>
        <div style={{ width: 'min(92%, 1080px)', marginInline: 'auto' }}>
          <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_minmax(360px,520px)_1fr] md:items-center">
            <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
              <span
                className="font-bold tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1.05rem' }}
              >
                mark<span style={{ color: 'var(--color-accent)' }}>.dev</span>
              </span>
              <p
                className="text-[12px]"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(var(--text-rgb), 0.78)' }}
              >
                Frontend Developer
              </p>
              <p
                className="text-[12px]"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(var(--text-rgb), 0.68)' }}
              >
                Quezon, Philippines
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <h2
                className="max-w-[14ch] text-[clamp(1.8rem,4vw,2.7rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
              >
                Available for frontend roles and freelance projects.
              </h2>
              <p
                className="mt-4 max-w-[42ch] text-sm leading-7 md:text-[0.98rem]"
                style={{ color: 'rgba(var(--text-rgb), 0.72)', fontFamily: 'var(--font-body)' }}
              >
                Open to frontend roles, freelance work, and thoughtful collaborations focused on
                React and responsive UI.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border px-5 text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'var(--color-accent)',
                    color: '#ffffff',
                    borderColor: 'transparent',
                    fontFamily: 'var(--font-display)',
                    boxShadow: '0 10px 24px color-mix(in srgb, var(--color-accent) 26%, transparent)',
                  }}
                  onClick={onHireClick}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = 'translateY(-1px)';
                    event.currentTarget.style.boxShadow =
                      '0 14px 28px color-mix(in srgb, var(--color-accent) 34%, transparent)';
                    event.currentTarget.style.filter = 'brightness(1.03)';
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = 'translateY(0)';
                    event.currentTarget.style.boxShadow =
                      '0 10px 24px color-mix(in srgb, var(--color-accent) 26%, transparent)';
                    event.currentTarget.style.filter = 'none';
                  }}
                >
                  Contact Me
                </button>
                <a
                  href="/Mark-Macaraig-CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border px-5 text-sm font-medium transition-all duration-200"
                  style={{
                    borderColor: 'rgba(var(--text-rgb), 0.14)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    background: 'rgba(var(--surface-rgb), 0.18)',
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = 'translateY(-1px)';
                    event.currentTarget.style.borderColor = 'rgba(var(--text-rgb), 0.24)';
                    event.currentTarget.style.background = 'rgba(var(--surface-rgb), 0.28)';
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = 'translateY(0)';
                    event.currentTarget.style.borderColor = 'rgba(var(--text-rgb), 0.14)';
                    event.currentTarget.style.background = 'rgba(var(--surface-rgb), 0.18)';
                  }}
                >
                  View CV
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 text-center md:items-end md:text-right">
            <div
              className="flex flex-col gap-1 text-sm"
              style={{ fontFamily: 'var(--font-body)', color: 'rgba(var(--text-rgb), 0.72)' }}
            >
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>2026 All rights reserved</span>
              <span>Open to remote opportunities</span>
            </div>

              <div className="site-footer-socials flex items-center justify-center gap-2 md:justify-end">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
                    style={{
                      color: '#ffffff',
                      background: 'var(--color-accent)',
                    }}
                  >
                    <span className="h-4 w-4">{link.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
