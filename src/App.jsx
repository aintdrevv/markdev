import { useEffect, useState } from 'react';
import Footer from './components/layout/Footer.jsx';
import Header from './components/layout/Header.jsx';
import ContactModal from './components/modals/ContactModal.jsx';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Hero from './sections/Hero.jsx';
import Projects from './sections/Projects.jsx';
import Skills from './sections/Skills.jsx';

const floatingSections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contacts', label: 'Contact' },
];

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const navOffset = 92;
  const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Always enter from the top instead of restoring the previous scroll position.
    const previousScrollRestoration = window.history.scrollRestoration;
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  useEffect(() => {
    // Shared reveal animation for each section as it enters the viewport.
    const sections = Array.from(document.querySelectorAll('.section'));
    if (!sections.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('section-scroll', 'is-revealed'));
      return;
    }

    sections.forEach((section) => section.classList.add('section-scroll'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScrollUi = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
      setScrollProgress(nextProgress);

      let current = floatingSections[0].id;
      let bestTop = Number.NEGATIVE_INFINITY;

      floatingSections.forEach((section) => {
        const node = document.getElementById(section.id);
        if (!node) return;

        const top = node.getBoundingClientRect().top;
        if (top <= 150 && top > bestTop) {
          bestTop = top;
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    handleScrollUi();
    window.addEventListener('scroll', handleScrollUi, { passive: true });
    window.addEventListener('resize', handleScrollUi);
    return () => {
      window.removeEventListener('scroll', handleScrollUi);
      window.removeEventListener('resize', handleScrollUi);
    };
  }, []);

  return (
    <div className="site-shell site-visible">
      <div className="site-bg" aria-hidden="true" />
      <Header onHireClick={() => setIsContactModalOpen(true)} />
      <main>
        {/* Main landing flow */}
        <div className="enter-item" style={{ '--enter-delay': '180ms' }}>
          <Hero />
        </div>
        <div className="enter-item" style={{ '--enter-delay': '290ms' }}>
          <About />
        </div>
        <div className="enter-item" style={{ '--enter-delay': '400ms' }}>
          <Skills />
        </div>
        <div className="enter-item" style={{ '--enter-delay': '510ms' }}>
          <Projects />
        </div>
        <div className="enter-item" style={{ '--enter-delay': '620ms' }}>
          <Contact />
        </div>
      </main>
      <div className="enter-item" style={{ '--enter-delay': '730ms' }}>
        <Footer />
      </div>
      <div className="floating-rail" aria-label="Section progress">
        <div className="floating-rail-track" aria-hidden="true">
          <span className="floating-rail-fill" style={{ transform: `scaleY(${scrollProgress})` }} />
        </div>
        <div className="floating-rail-links">
          {floatingSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`floating-rail-link${activeSection === section.id ? ' is-active' : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="floating-contact-cta"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
      <ContactModal open={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}

export default App;
