import { useEffect, useMemo, useRef, useState } from 'react';

// Ordered story beats that power the timeline layout.
const storyPoints = [
  {
    tag: '01 / Identity',
    title: 'Who I Am',
    body: `I'm Mark, aspiring frontend developer based in Quezon, Philippines, building interfaces that feel calm, sharp, and easy to use.`,
  },
  {
    tag: '02 / Practice',
    title: 'What I Do',
    body: 'I focus on frontend development with React, modern CSS, and responsive UI work that keeps structure clear across desktop and mobile.',
  },
  {
    tag: '03 / Process',
    title: 'How I Work',
    body: 'My learning path is iterative: study the fundamentals, build often, clean the code, then refine the details until the interface feels intentional.',
  },
  {
    tag: '04 / Now',
    title: 'Current Focus',
    body: 'Right now I am sharpening React fundamentals, layout systems, and responsive design patterns that hold up in real product work.',
  },
  {
    tag: '05 / Direction',
    title: 'My Goal',
    body: 'I am looking for internship, junior-level, and freelance opportunities where I can contribute, keep learning fast, and ship polished work.',
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function About() {
  const sectionRef = useRef(null);
  const pointRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    // Track the story card currently nearest the focus zone.
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
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height + viewportHeight * 0.35;
      const traveled = viewportHeight * 0.72 - rect.top;
      const progress = clamp(traveled / total, 0, 1);
      setLineProgress(progress);
    };

    updateLine();
    window.addEventListener('scroll', updateLine, { passive: true });
    window.addEventListener('resize', updateLine);

    return () => {
      window.removeEventListener('scroll', updateLine);
      window.removeEventListener('resize', updateLine);
    };
  }, []);

  const progressHeight = useMemo(() => `${lineProgress * 100}%`, [lineProgress]);

  return (
    <section id="about" ref={sectionRef} className="section" data-deco="About">
      <div className="container">
        <div className="section-shell">
          <div className="section-header-left">
            <p className="section-kicker">About</p>
            <h2 className="section-title section-title-modern">
              A timeline of how I am growing into the kind of developer teams can rely on.
            </h2>
            <p className="section-copy">
              This section is meant to read like a story. It moves through identity, craft,
              process, and direction instead of presenting me like a boxed resume panel.
            </p>
          </div>

          {/* Vertical timeline with an active marker tied to scroll position */}
          <div className="section-body-gap relative pl-[4.5rem] sm:pl-24">
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

            <div className="space-y-[4.5rem] md:space-y-24">
              {storyPoints.map((point, index) => {
                const isActive = index === activeIndex;

                return (
                  <article
                    key={point.title}
                    ref={(node) => {
                      pointRefs.current[index] = node;
                    }}
                    data-index={index}
                    className="relative"
                    style={{
                      opacity: index <= activeIndex ? 1 : 0.36,
                      transform: index <= activeIndex ? 'translateX(0)' : 'translateX(-28px)',
                      transition: 'opacity 520ms ease, transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <div className="absolute left-[-3.35rem] top-1 sm:left-[-4.9rem]" aria-hidden="true">
                      <span
                        className={`block h-3.5 w-3.5 rounded-full ${isActive ? 'animate-pulse' : ''}`}
                        style={{
                          background: isActive ? 'rgba(var(--brand-rgb), 1)' : 'rgba(var(--brand-rgb), 0.42)',
                          boxShadow: isActive
                            ? '0 0 0 5px rgba(var(--brand-rgb), 0.12), 0 0 18px rgba(var(--brand-rgb), 0.44)'
                            : '0 0 0 4px rgba(var(--brand-rgb), 0.06)',
                          transition: 'background 220ms ease, box-shadow 220ms ease',
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
                      className="text-3xl leading-none sm:text-4xl"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
                    >
                      {point.title}
                    </h3>
                    <p
                      className="mt-4 max-w-2xl text-base leading-8 sm:text-lg"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)' }}
                    >
                      {point.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
