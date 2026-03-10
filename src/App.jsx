import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import ContactModal from './components/ContactModal.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div className="site-shell site-visible">
      <div className="site-bg" aria-hidden="true" />
      <Header onHireClick={() => setIsContactModalOpen(true)} />
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
      <ContactModal open={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}

export default App;
