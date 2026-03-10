import { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFadeOut(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!fadeOut) return;
    const t = setTimeout(() => onDone?.(), 520);
    return () => clearTimeout(t);
  }, [fadeOut, onDone]);

  return (
    <div className={`loading-screen${fadeOut ? ' fade-out' : ''}`}>
      <div className="loading-logo" role="status" aria-live="polite" aria-label="Loading page">
        <span className="loading-brand">
          mark<span>.dev</span>
        </span>
        <span className="loading-subtext">loading interface</span>
      </div>
    </div>
  );
}
