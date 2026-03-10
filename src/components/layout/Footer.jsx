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

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-divider-wrap">
        <div className="site-footer-divider" />
      </div>

      <div className="site-footer-body">
        <div className="site-footer-inner mx-auto grid max-w-6xl gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <p
            className="site-footer-brandrow flex flex-wrap items-center gap-2 text-[12px] md:justify-self-start"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(var(--text-rgb), 0.7)' }}
          >
            <span
              className="font-bold tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
            >
              mark<span style={{ color: 'var(--color-accent)' }}>.dev</span>
            </span>
            <span style={{ color: 'rgba(var(--text-rgb), 0.35)' }}>|</span>
            <span>2026 All rights reserved.</span>
          </p>

          <div className="site-footer-socials flex items-center justify-center gap-2 md:justify-self-center">
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
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = 'color-mix(in srgb, var(--color-accent) 78%, white)';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = 'var(--color-accent)';
                }}
              >
                <span className="h-4 w-4">{link.icon}</span>
              </a>
            ))}
          </div>

          <div
            className="site-footer-meta flex flex-col items-start gap-3 text-[12px] md:justify-self-end md:flex-row md:items-center md:gap-6"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(var(--text-rgb), 0.64)' }}
          >
            <span className="inline-flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M12 21s7-4.8 7-11a7 7 0 1 0-14 0c0 6.2 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.2" />
              </svg>
              <span>Quezon, Philippines</span>
            </span>

            <span className="inline-flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2 4.1 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .9 2.9a2 2 0 0 1-.4 2.1L8.2 10a16 16 0 0 0 5.8 5.8l1.3-1.3a2 2 0 0 1 2.1-.4c.9.5 1.9.8 2.9.9A2 2 0 0 1 22 16.9Z" />
              </svg>
              <span>+63 976 462 7977</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
