export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-divider-wrap">
        <div className="site-footer-divider" />
      </div>

      <div className="site-footer-body">
        <div className="site-footer-inner mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p
            className="site-footer-brandrow flex flex-wrap items-center gap-2 text-[12px]"
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

          <div
            className="site-footer-meta flex flex-col items-start gap-3 text-[12px] md:flex-row md:items-center md:gap-6"
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
