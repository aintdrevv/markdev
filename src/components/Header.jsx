import { useState } from 'react';

const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contacts' },
];

function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const navOffset = 80;
  const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <button className="brand" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          mark<span>.dev</span>
        </button>

        <nav className="nav-links" aria-label="Main">
          {links.map((link) => (
            <button key={link.id} type="button" onClick={() => scrollToId(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.75 15.5a9.77 9.77 0 0 1-4.28 1A9.74 9.74 0 0 1 7.74 6.76a9.72 9.72 0 0 1 1-4.27A1 1 0 0 0 7.5 1.25a11.74 11.74 0 1 0 15.5 15.5 1 1 0 0 0-1.25-1.25Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1.5a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1Zm0 17.5a1 1 0 0 1 1 1V22a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1Zm9-8.5a1 1 0 0 1 0 2h-1.5a1 1 0 1 1 0-2H21ZM4.5 11a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1.5Zm12.36-6.86a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 1 1-1.41 1.41l-1.06-1.06a1 1 0 0 1 0-1.41Zm-10.13 10.13a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 0 1-1.41 1.41l-1.06-1.06a1 1 0 0 1 0-1.41Zm10.13 2.47a1 1 0 0 1 0 1.41l-1.06 1.06a1 1 0 1 1-1.41-1.41l1.06-1.06a1 1 0 0 1 1.41 0ZM9.2 6.25a1 1 0 0 1-1.41 0L6.73 5.2A1 1 0 0 1 8.14 3.8L9.2 4.84a1 1 0 0 1 0 1.41Z" />
              </svg>
            )}
          </button>

          <button className="menu-toggle" type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm1 4a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H5Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`nav-mobile ${open ? 'open' : ''}`}>
        <div className="glass-card">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                scrollToId(link.id);
                setOpen(false);
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
