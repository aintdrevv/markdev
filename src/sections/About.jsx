import { useEffect, useMemo, useRef, useState } from 'react';

// Ordered story beats that power the timeline layout.
const storyPoints = [
  {
    tag: '01 / Identity',
    title: 'Hi, I\'m Mark.',
    body: `I'm a frontend developer based in Quezon, Philippines. I build interfaces that feel calm, sharp, and easy to use — no fluff, just clean work.`,
  },
  {
    tag: '02 / Practice',
    title: 'I Make Interfaces Feel Right.',
    body: 'Frontend development with React, modern CSS, and responsive UI. I care about the details — the kind users notice without knowing why.',
  },
  {
    tag: '03 / Process',
    title: 'Learn. Build. Refine. Repeat.',
    body: 'I study the fundamentals, build often, and keep cleaning the code until the interface feels intentional. No shortcuts, just iteration.',
  },
  {
    tag: '04 / Now',
    title: 'Currently Leveling Up.',
    body: 'Deep in React fundamentals, layout systems, and responsive patterns. Sharpening the skills that hold up in real product work.',
  },
  {
    tag: '05 / Direction',
    title: 'Focused and Ready to Build.',
    body: 'Looking for internship, junior, and freelance opportunities. I show up, I learn fast, and I ship polished work.',
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getViewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}

function getLineProgress(section) {
  const rect = section.getBoundingClientRect();
  const viewportHeight = getViewportHeight();
  const sectionTop = window.scrollY + rect.top;
  const start = sectionTop - viewportHeight * 0.72;
  const end = sectionTop + rect.height - viewportHeight * 0.37;
  const distance = Math.max(end - start, 1);

  return clamp((window.scrollY - start) / distance, 0, 1);
}

export default function About() {
  const sectionRef = useRef(null);
  const pointRefs = useRef([]);
  const frameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasEntered(true);
      return undefined;
    }

    const animationFrame = window.requestAnimationFrame(() => setHasEntered(true));
    return () => window.cancelAnimationFrame(animationFrame);
  }, [prefersReducedMotion]);

  useEffect(() => {
    // Track the story card currently nearest the focus zone.
    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          const nextIndex = Number(visibleEntries[0].target.getAttribute('data-index'));
          setActiveIndex(nextIndex);
        }
      },
      {
        threshold: 0.45,
        rootMargin: '-10% 0px -35% 0px',
      }
    );

    pointRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Fill the vertical progress line as the section moves through the viewport.
    const updateLine = () => {
      frameRef.current = 0;

      const section = sectionRef.current;
      if (!section) return;

      const progress = getLineProgress(section);
      setLineProgress((current) => (Math.abs(current - progress) < 0.001 ? current : progress));
    };

    const requestLineUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(updateLine);
    };

    requestLineUpdate();
    window.addEventListener('scroll', requestLineUpdate, { passive: true });
    window.addEventListener('resize', requestLineUpdate);
    window.visualViewport?.addEventListener('resize', requestLineUpdate);
    window.visualViewport?.addEventListener('scroll', requestLineUpdate);

    return () => {
      window.removeEventListener('scroll', requestLineUpdate);
      window.removeEventListener('resize', requestLineUpdate);
      window.visualViewport?.removeEventListener('resize', requestLineUpdate);
      window.visualViewport?.removeEventListener('scroll', requestLineUpdate);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const progressHeight = useMemo(() => `${lineProgress * 100}%`, [lineProgress]);
  const activePoint = storyPoints[activeIndex];
  const motionSafeTransition = prefersReducedMotion
    ? 'none'
    : 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)';
  const entryStyle = (delay = '0ms') => ({
    opacity: hasEntered ? 1 : 0,
    transform: hasEntered ? 'translateY(0)' : 'translateY(26px)',
    transition: motionSafeTransition,
    transitionDelay: prefersReducedMotion ? '0ms' : delay,
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      data-deco="About"
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className="section-shell">
          <div className="section-header-left" style={entryStyle('90ms')}>
            <p className="section-kicker">About</p>
            <h2 id="about-title" className="section-title section-title-modern">
              A timeline of how I am growing into the kind of developer teams can rely on.
            </h2>
            <p className="section-copy">
              This is a quick look at who I am, how I work, and where I am heading as a
              developer, told with more personality than a standard resume summary.
            </p>
          </div>

          {/* Vertical timeline with an active marker tied to scroll position */}
          <div
            className="section-body-gap relative pl-[4.5rem] sm:pl-24"
            style={entryStyle('180ms')}
          >
            <div
              className="absolute left-4 top-0 h-full w-px sm:left-8"
              style={{ background: 'rgba(var(--brand-rgb), 0.18)' }}
              aria-hidden="true"
            />
            <div
              className="absolute left-4 top-0 w-px origin-top sm:left-8"
              style={{
                height: progressHeight,
                background: 'linear-gradient(180deg, rgba(var(--brand-rgb), 0.2) 0%, rgba(var(--brand-rgb), 0.95) 55%, rgba(var(--brand-rgb), 0.35) 100%)',
                boxShadow: '0 0 16px rgba(var(--brand-rgb), 0.28)',
                transition: 'height 180ms ease-out',
              }}
              aria-hidden="true"
            />
            <p className="sr-only">
              Timeline step {activeIndex + 1} of {storyPoints.length}: {activePoint.title}.
            </p>

            <ol className="space-y-[4.5rem] md:space-y-24" aria-label="About timeline">
              {storyPoints.map((point, index) => {
                const isActive = index === activeIndex;
                const titleId = `about-point-title-${index}`;
                const bodyId = `about-point-body-${index}`;

                return (
                  <li key={point.title} className="list-none">
                    <article
                      ref={(node) => {
                        pointRefs.current[index] = node;
                      }}
                      data-index={index}
                      className="relative"
                      aria-current={isActive ? 'step' : undefined}
                      aria-labelledby={titleId}
                      aria-describedby={bodyId}
                      style={{
                        opacity: index <= activeIndex ? 1 : 0.36,
                        transform: index <= activeIndex ? 'translateX(0)' : 'translateX(-28px)',
                        transition: prefersReducedMotion
                          ? 'none'
                          : 'opacity 520ms ease, transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <div
                        className="absolute left-[-3.35rem] top-1 sm:left-[-4.9rem]"
                        aria-hidden="true"
                      >
                        <span
                          className={`block h-3.5 w-3.5 rounded-full ${
                            isActive && !prefersReducedMotion ? 'animate-pulse' : ''
                          }`}
                          style={{
                            background: isActive
                              ? 'rgba(var(--brand-rgb), 1)'
                              : 'rgba(var(--brand-rgb), 0.42)',
                            boxShadow: isActive
                              ? '0 0 0 5px rgba(var(--brand-rgb), 0.12), 0 0 18px rgba(var(--brand-rgb), 0.44)'
                              : '0 0 0 4px rgba(var(--brand-rgb), 0.06)',
                            transition: prefersReducedMotion
                              ? 'none'
                              : 'background 220ms ease, box-shadow 220ms ease',
                          }}
                        />
                      </div>

                      <p
                        className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em]"
                        style={{ color: isActive ? 'var(--brand)' : 'rgba(var(--text-rgb), 0.5)' }}
                      >
                        {point.tag}
                      </p>
                      <h3
                        id={titleId}
                        className="text-3xl leading-none sm:text-4xl"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
                      >
                        {point.title}
                      </h3>
                      <p
                        id={bodyId}
                        className="mt-4 max-w-2xl text-base leading-8 sm:text-lg"
                        style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)' }}
                      >
                        {point.body}
                      </p>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
