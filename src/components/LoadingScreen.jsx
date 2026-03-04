import { useState, useEffect } from 'react';

const LOGO_TEXT = 'markdev';

export default function LoadingScreen({ onDone }) {
  const [displayed, setDisplayed] = useState('');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (displayed.length < LOGO_TEXT.length) {
      const t = setTimeout(() => {
        setDisplayed(LOGO_TEXT.slice(0, displayed.length + 1));
      }, 95);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setFadeOut(true), 620);
      return () => clearTimeout(t);
    }
  }, [displayed]);

  useEffect(() => {
    if (!fadeOut) return;
    const t = setTimeout(() => onDone?.(), 620);
    return () => clearTimeout(t);
  }, [fadeOut, onDone]);

  return (
    <div className={`loading-screen${fadeOut ? ' fade-out' : ''}`}>
      <div className="loading-logo" role="status" aria-live="polite" aria-label="Loading page">
        <span className="loading-ring" aria-hidden="true" />
        <span className="loading-text">
          {displayed}
          <span className="loading-cursor" aria-hidden="true">
            |
          </span>
        </span>
        <span className="loading-subtext">loading...</span>
      </div>
    </div>
  );
}
