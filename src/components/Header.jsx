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

export default function Header() {
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

        <button className="menu-toggle" type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm1 4a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H5Z" />
          </svg>
        </button>
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
