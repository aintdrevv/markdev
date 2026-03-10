import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTheme } from '../../theme/ThemeProvider.jsx';

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
  const { isLightTheme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isHireHovered, setIsHireHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobileIdleHidden, setIsMobileIdleHidden] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 });
  const navRefs = useRef([]);

  const hideIndicator = () => {
    setIndicatorStyle((current) => ({ ...current, opacity: 0 }));
  };

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
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
      hideIndicator();
      setHoveredLink(null);
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
      <style>{`
        @keyframes menuScalePop {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.94);
          }
          70% {
            opacity: 1;
            transform: translateY(0) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes menuItemPop {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
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
          background: isLightTheme
            ? 'rgba(108, 99, 255, 0.94)'
            : 'rgba(84, 74, 232, 0.7)',
          boxShadow: isScrolled
            ? '0 0 20px rgba(108, 99, 255, 0.18)'
            : 'none',
          borderColor: isLightTheme
            ? 'rgba(255, 255, 255, 0.14)'
            : isScrolled
              ? 'rgba(255, 255, 255, 0.16)'
              : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
        }}
      >
        <button
          className="relative z-10 bg-transparent text-[0.8rem] md:text-base font-extrabold uppercase tracking-[0.18em] transition duration-300 ease-in-out hover:-translate-y-0.5"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#ffffff',
          }}
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          mark
          <span style={{ color: 'rgba(255, 255, 255, 0.76)' }}>.dev</span>
        </button>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex"
          aria-label="Main"
        >
          <span
            className="pointer-events-none absolute left-0 top-1/2 rounded-full border"
            style={{
              ...indicatorStyle,
              background: 'rgba(255, 255, 255, 0.14)',
              borderColor: 'transparent',
              boxShadow: '0 0 18px rgba(255, 255, 255, 0.12)',
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
                  fontFamily: "'DM Sans', sans-serif",
                  color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.72)',
                  transform: active ? 'translateY(-2px)' : 'translateY(0)',
                  textShadow: active ? '0 0 10px rgba(255, 255, 255, 0.14)' : 'none',
                  fontWeight: 600,
                }}
                onMouseEnter={() => {
                  setHoveredLink(link.id);
                  moveIndicator(index);
                }}
                onMouseLeave={() => {
                  setHoveredLink(null);
                  hideIndicator();
                }}
                onFocus={() => {
                  setHoveredLink(link.id);
                  moveIndicator(index);
                }}
                onBlur={() => {
                  setHoveredLink(null);
                  hideIndicator();
                }}
                onClick={(event) => {
                  scrollToId(link.id);
                  setHoveredLink(null);
                  hideIndicator();
                  event.currentTarget.blur();
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="relative z-10 flex items-center gap-2 md:mr-[-8px]">
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full transition duration-200 ease-in-out md:inline-flex"
            type="button"
            aria-label={isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'}
            onClick={toggleTheme}
            style={{
              color: isLightTheme ? '#6C63FF' : '#ffffff',
              border: 'none',
              background: isLightTheme ? '#ffffff' : '#8f88ff',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = isLightTheme ? '#544ae8' : '#ffffff';
              event.currentTarget.style.background = isLightTheme ? '#ffffff' : '#a39dff';
              event.currentTarget.style.boxShadow = isLightTheme
                ? '0 0 16px rgba(255, 255, 255, 0.18)'
                : '0 0 16px rgba(143, 136, 255, 0.28)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = isLightTheme ? '#6C63FF' : '#ffffff';
              event.currentTarget.style.background = isLightTheme ? '#ffffff' : '#8f88ff';
              event.currentTarget.style.boxShadow = 'none';
            }}
            onFocus={(event) => {
              event.currentTarget.style.color = isLightTheme ? '#544ae8' : '#ffffff';
              event.currentTarget.style.background = isLightTheme ? '#ffffff' : '#a39dff';
              event.currentTarget.style.boxShadow = isLightTheme
                ? '0 0 16px rgba(255, 255, 255, 0.18)'
                : '0 0 16px rgba(143, 136, 255, 0.28)';
            }}
            onBlur={(event) => {
              event.currentTarget.style.color = isLightTheme ? '#6C63FF' : '#ffffff';
              event.currentTarget.style.background = isLightTheme ? '#ffffff' : '#8f88ff';
              event.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isLightTheme ? (
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d="M20.76 14.19A9 9 0 0 1 9.81 3.24a1 1 0 0 0-1.12-1.38A10 10 0 1 0 22.14 15.3a1 1 0 0 0-1.38-1.11Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1.25a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 17.75a1 1 0 0 1 1 1V22a1 1 0 1 1-2 0v-1.25a1 1 0 0 1 1-1ZM4.22 5.64a1 1 0 0 1 1.42 0l.88.88A1 1 0 1 1 5.1 7.93l-.88-.88a1 1 0 0 1 0-1.41Zm13.26 13.26a1 1 0 0 1 1.42 0l.88.88a1 1 0 1 1-1.42 1.41l-.88-.88a1 1 0 0 1 0-1.41ZM2 12a1 1 0 0 1 1-1h1.25a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm16.75 0a1 1 0 0 1 1-1H21a1 1 0 1 1 0 2h-1.25a1 1 0 0 1-1-1ZM5.1 16.07a1 1 0 0 1 1.42 1.41l-.88.88a1 1 0 1 1-1.42-1.41l.88-.88Zm12.38-9.45a1 1 0 0 1 0 1.41l-.88.88a1 1 0 1 1-1.42-1.41l.88-.88a1 1 0 0 1 1.42 0Z" />
              </svg>
            )}
          </button>

          <button
            className="hidden h-10 items-center rounded-full px-4 text-xs font-bold uppercase tracking-[0.2em] transition duration-200 ease-in-out md:inline-flex"
            type="button"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: '#ffffff',
              border: 'none',
              background: isLightTheme ? '#ffffff' : '#8f88ff',
              transform: isHireHovered ? 'scale(1.05)' : 'scale(1)',
              boxShadow: isHireHovered
                ? isLightTheme
                  ? '0 0 15px rgba(255, 255, 255, 0.18)'
                  : '0 0 15px rgba(143, 136, 255, 0.28)'
                : 'none',
            }}
            onMouseEnter={() => setIsHireHovered(true)}
            onMouseLeave={() => setIsHireHovered(false)}
            onFocus={() => setIsHireHovered(true)}
            onBlur={() => setIsHireHovered(false)}
            onClick={onHireClick}
          >
            <span style={{ color: isLightTheme ? '#544ae8' : '#ffffff' }}>Hire Me</span>
          </button>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition duration-200 ease-in-out md:hidden"
            type="button"
            aria-label={isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'}
            onClick={toggleTheme}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: '#ffffff',
              border: 'none',
              background: 'transparent',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = '#ffffff';
              event.currentTarget.style.boxShadow = '0 0 14px rgba(255, 255, 255, 0.16)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = '#ffffff';
              event.currentTarget.style.boxShadow = 'none';
            }}
            onFocus={(event) => {
              event.currentTarget.style.color = '#ffffff';
              event.currentTarget.style.boxShadow = '0 0 14px rgba(255, 255, 255, 0.16)';
            }}
            onBlur={(event) => {
              event.currentTarget.style.color = '#ffffff';
              event.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isLightTheme ? (
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d="M20.76 14.19A9 9 0 0 1 9.81 3.24a1 1 0 0 0-1.12-1.38A10 10 0 1 0 22.14 15.3a1 1 0 0 0-1.38-1.11Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1.25a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 17.75a1 1 0 0 1 1 1V22a1 1 0 1 1-2 0v-1.25a1 1 0 0 1 1-1ZM4.22 5.64a1 1 0 0 1 1.42 0l.88.88A1 1 0 1 1 5.1 7.93l-.88-.88a1 1 0 0 1 0-1.41Zm13.26 13.26a1 1 0 0 1 1.42 0l.88.88a1 1 0 1 1-1.42 1.41l-.88-.88a1 1 0 0 1 0-1.41ZM2 12a1 1 0 0 1 1-1h1.25a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm16.75 0a1 1 0 0 1 1-1H21a1 1 0 1 1 0 2h-1.25a1 1 0 0 1-1-1ZM5.1 16.07a1 1 0 0 1 1.42 1.41l-.88.88a1 1 0 1 1-1.42-1.41l.88-.88Zm12.38-9.45a1 1 0 0 1 0 1.41l-.88.88a1 1 0 1 1-1.42-1.41l.88-.88a1 1 0 0 1 1.42 0Z" />
              </svg>
            )}
          </button>

          <button
            className="inline-flex rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] md:hidden"
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((value) => !value)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: '#ffffff',
              border: 'none',
              background: 'transparent',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = '#ffffff';
              event.currentTarget.style.boxShadow = '0 0 14px rgba(255, 255, 255, 0.16)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = '#ffffff';
              event.currentTarget.style.boxShadow = 'none';
            }}
            onFocus={(event) => {
              event.currentTarget.style.color = '#ffffff';
              event.currentTarget.style.boxShadow = '0 0 14px rgba(255, 255, 255, 0.16)';
            }}
            onBlur={(event) => {
              event.currentTarget.style.color = '#ffffff';
              event.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          className="mx-auto mt-3 max-w-5xl rounded-3xl p-3 backdrop-blur-md md:hidden"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: 'rgba(94, 83, 240, 0.94)',
            transformOrigin: 'top center',
            animation: 'menuScalePop 360ms cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
        >
          <div className="flex flex-col items-center gap-2">
            {links.map((link, index) => (
              <button
                key={link.id}
                type="button"
                className="w-full rounded-2xl px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] transition duration-200 ease-in-out"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: 'rgba(255, 255, 255, 0.78)',
                  animation: `menuItemPop 320ms cubic-bezier(0.22, 1, 0.36, 1) ${80 + index * 60}ms both`,
                }}
                onClick={() => {
                  scrollToId(link.id);
                  setMobileOpen(false);
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)';
                  event.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = 'transparent';
                  event.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)';
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              className="mt-1 w-full rounded-2xl px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.18em]"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: '#ffffff',
                border: 'none',
                background: '#8f88ff',
                animation: `menuItemPop 320ms cubic-bezier(0.22, 1, 0.36, 1) ${80 + links.length * 60}ms both`,
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
