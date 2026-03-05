import { useEffect, useState } from 'react';

const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
];

function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const navOffset = 80;
  const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function Header({ onHireClick }) {
  const [open, setOpen] = useState(false);
  const [mobileIdle, setMobileIdle] = useState(false);

  useEffect(() => {
    let idleTimer = null;
    const IDLE_MS = 2600;
    const isMobile = () => window.matchMedia('(max-width: 760px)').matches;

    const armIdleTimer = () => {
      if (!isMobile()) {
        setMobileIdle(false);
        if (idleTimer) clearTimeout(idleTimer);
        return;
      }
      if (open) {
        setMobileIdle(false);
        if (idleTimer) clearTimeout(idleTimer);
        return;
      }
      setMobileIdle(false);
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setMobileIdle(true), IDLE_MS);
    };

    const activityHandler = () => armIdleTimer();
    const resizeHandler = () => armIdleTimer();

    armIdleTimer();
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('scroll', activityHandler, { passive: true });
    window.addEventListener('touchstart', activityHandler, { passive: true });
    window.addEventListener('touchmove', activityHandler, { passive: true });
    window.addEventListener('mousemove', activityHandler, { passive: true });
    window.addEventListener('keydown', activityHandler);

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('scroll', activityHandler);
      window.removeEventListener('touchstart', activityHandler);
      window.removeEventListener('touchmove', activityHandler);
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('keydown', activityHandler);
    };
  }, [open]);

  return (
    <header className={`top-nav ${mobileIdle && !open ? 'mobile-idle-hidden' : ''}`}>
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
          <button className="hire-btn" type="button" onClick={onHireClick}>
            Hire Me
          </button>

          <button className="menu-toggle" type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            <span>Menu</span>
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
