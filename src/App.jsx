import { useEffect, useLayoutEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return window.localStorage.getItem('theme') || 'light';
  });

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    document.body.classList.toggle('theme-light', theme === 'light');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

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
          } else {
            entry.target.classList.remove('is-revealed');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onDone={() => setIsLoading(false)} />;
  }

  return (
    <div className={`site-shell ${isVisible ? 'site-visible' : ''}`}>
      <div className="site-bg" aria-hidden="true" />
      <Header theme={theme} onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))} />
      <main>
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
    </div>
  );
}

export default App;
