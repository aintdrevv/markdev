import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
];

function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const navOffset = 92;
  const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function Header({ onHireClick }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isHireHovered, setIsHireHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobileIdleHidden, setIsMobileIdleHidden] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 });
  const navRefs = useRef([]);

  const moveIndicator = (index) => {
    const node = navRefs.current[index];
    if (!node) return;

    setIndicatorStyle({
      width: `${node.offsetWidth}px`,
      height: `${node.offsetHeight}px`,
      transform: `translate(${node.offsetLeft}px, -50%)`,
      opacity: 1,
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
      setMobileOpen(false);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    moveIndicator(0);

    const handleResize = () => {
      moveIndicator(0);
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let idleTimer;

    const isMobileViewport = () => window.innerWidth < 768;
    const clearIdleTimer = () => {
      if (idleTimer) window.clearTimeout(idleTimer);
    };

    const scheduleHide = () => {
      clearIdleTimer();
      if (!isMobileViewport() || mobileOpen) {
        setIsMobileIdleHidden(false);
        return;
      }

      idleTimer = window.setTimeout(() => {
        setIsMobileIdleHidden(true);
      }, 1800);
    };

    const revealNav = () => {
      if (!isMobileViewport()) {
        setIsMobileIdleHidden(false);
        return;
      }

      setIsMobileIdleHidden(false);
      scheduleHide();
    };

    revealNav();

    window.addEventListener('scroll', revealNav, { passive: true });
    window.addEventListener('touchstart', revealNav, { passive: true });
    window.addEventListener('pointerdown', revealNav, { passive: true });
    window.addEventListener('resize', revealNav);

    return () => {
      clearIdleTimer();
      window.removeEventListener('scroll', revealNav);
      window.removeEventListener('touchstart', revealNav);
      window.removeEventListener('pointerdown', revealNav);
      window.removeEventListener('resize', revealNav);
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8">
      <div
        className="relative mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 md:px-6"
        style={{
          transform: !isMounted
            ? 'translateY(-100%)'
            : isMobileIdleHidden
              ? 'translateY(-140%)'
              : 'translateY(0)',
          opacity: !isMounted ? 0 : isMobileIdleHidden ? 0.18 : 1,
          transition: 'transform 700ms cubic-bezier(0.22, 1.2, 0.36, 1), opacity 500ms ease-in-out, box-shadow 250ms ease-in-out, border-color 250ms ease-in-out, backdrop-filter 250ms ease-in-out',
          color: 'var(--text)',
          background: 'rgba(var(--surface-rgb), 0.62)',
          boxShadow: 'none',
          borderColor: isScrolled ? 'rgba(var(--brand-rgb), 0.28)' : 'var(--line-soft)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)',
        }}
      >
        <button
          className="relative z-10 bg-transparent text-[0.8rem] md:text-base font-extrabold uppercase tracking-[0.18em] transition duration-300 ease-in-out hover:-translate-y-0.5"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          mark<span style={{ color: 'var(--brand)' }}>.dev</span>
        </button>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex"
          aria-label="Main"
        >
          <span
            className="pointer-events-none absolute left-0 top-1/2 rounded-full border"
            style={{
              ...indicatorStyle,
              background: 'rgba(var(--brand-rgb), 0.22)',
              borderColor: 'transparent',
              boxShadow: '0 0 18px rgba(var(--brand-rgb), 0.28)',
              transition: 'transform 250ms ease-in-out, width 250ms ease-in-out, height 250ms ease-in-out, opacity 200ms ease-in-out',
            }}
            aria-hidden="true"
          />
          {links.map((link) => {
            const active = hoveredLink === link.id;
            const index = links.indexOf(link);

            return (
              <button
                key={link.id}
                type="button"
                ref={(node) => {
                  navRefs.current[index] = node;
                }}
                className="relative z-10 rounded-full bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] transition duration-200 ease-in-out"
                style={{
                  color: active ? '#ffffff' : 'rgba(var(--text-rgb), 0.65)',
                  transform: active ? 'translateY(-2px)' : 'translateY(0)',
                  textShadow: active ? '0 0 14px rgba(var(--brand-rgb), 0.42)' : 'none',
                }}
                onMouseEnter={() => {
                  setHoveredLink(link.id);
                  moveIndicator(index);
                }}
                onMouseLeave={() => setHoveredLink(null)}
                onFocus={() => {
                  setHoveredLink(link.id);
                  moveIndicator(index);
                }}
                onBlur={() => setHoveredLink(null)}
                onClick={() => {
                  scrollToId(link.id);
                  moveIndicator(index);
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="relative z-10 flex items-center gap-2 md:mr-[-8px]">
          <button
            className="hidden rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition duration-200 ease-in-out md:inline-flex"
            type="button"
            style={{
              color: 'var(--text)',
              border: 'none',
              background: '#6C63FF',
              transform: isHireHovered ? 'scale(1.05)' : 'scale(1)',
              boxShadow: isHireHovered ? '0 0 15px rgba(var(--brand-rgb), 0.5)' : 'none',
            }}
            onMouseEnter={() => setIsHireHovered(true)}
            onMouseLeave={() => setIsHireHovered(false)}
            onFocus={() => setIsHireHovered(true)}
            onBlur={() => setIsHireHovered(false)}
            onClick={onHireClick}
          >
            Hire Me
          </button>

          <button
            className="inline-flex rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] md:hidden"
            type="button"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            style={{
              color: 'var(--text)',
              border: 'none',
              background: '#6C63FF',
            }}
          >
            Menu
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          className="mx-auto mt-3 max-w-5xl rounded-3xl p-3 backdrop-blur-md md:hidden"
          style={{
            border: '1px solid var(--line-soft)',
            background: 'rgba(var(--surface-strong-rgb), 0.9)',
          }}
        >
          <div className="flex flex-col items-center gap-2">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                className="w-full rounded-2xl px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] transition duration-200 ease-in-out"
                style={{ color: 'rgba(var(--text-rgb), 0.7)' }}
                onClick={() => {
                  scrollToId(link.id);
                  setMobileOpen(false);
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = 'rgba(var(--brand-rgb), 0.1)';
                  event.currentTarget.style.color = 'var(--brand)';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = 'transparent';
                  event.currentTarget.style.color = 'rgba(var(--text-rgb), 0.7)';
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              className="mt-1 w-full rounded-2xl px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.18em]"
              style={{
                color: 'var(--text)',
                border: 'none',
                background: '#6C63FF',
              }}
              onClick={() => {
                onHireClick();
                setMobileOpen(false);
              }}
            >
              Hire Me
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
