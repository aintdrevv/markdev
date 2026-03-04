import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onDone={() => setIsLoading(false)} />;
  }

  return (
    <div className={`site-shell ${isVisible ? 'site-visible' : ''}`}>
      <div className="site-bg" aria-hidden="true" />
      <div className="enter-item" style={{ '--enter-delay': '80ms' }}>
        <Header />
      </div>
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
