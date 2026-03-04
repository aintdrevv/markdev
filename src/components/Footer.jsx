export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brandline">
          <span className="footer-brand">mark<span>.dev</span></span>
          <span className="footer-divider">|</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </p>
        <p className="footer-location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 21s7-4.8 7-11a7 7 0 1 0-14 0c0 6.2 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.2" />
          </svg>
          <span>Quezon, Philippines</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2 4.1 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .9 2.9a2 2 0 0 1-.4 2.1L8.2 10a16 16 0 0 0 5.8 5.8l1.3-1.3a2 2 0 0 1 2.1-.4c.9.5 1.9.8 2.9.9A2 2 0 0 1 22 16.9Z" />
          </svg>
          <span>+63 975 462 7977</span>
        </p>
      </div>
    </footer>
  );
}
