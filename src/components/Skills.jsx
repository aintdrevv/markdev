const skillRows = [
  [
    { label: 'npm', size: '0.95rem', faint: true, tint: 'rgba(108, 99, 255, 0.16)', hover: '#6C63FF', glow: 'rgba(108, 99, 255, 0.26)', flicker: true, flickerDuration: '3.8s', flickerDelay: '0.2s' },
    { label: 'Git/GitHub', size: '1.95rem', tint: 'rgba(255, 255, 255, 0.18)', hover: 'rgba(255, 255, 255, 0.82)', glow: 'rgba(255, 255, 255, 0.22)' },
    { label: 'VS Code', size: '1.45rem', tint: 'rgba(108, 99, 255, 0.26)', hover: '#6C63FF', glow: 'rgba(108, 99, 255, 0.28)', flicker: true, flickerDuration: '4.6s', flickerDelay: '0.9s' },
    { label: 'Layout Systems', size: '1.65rem', tint: 'rgba(108, 99, 255, 0.3)', hover: '#6C63FF', glow: 'rgba(108, 99, 255, 0.3)', flicker: true, flickerDuration: '5.1s', flickerDelay: '0.4s' },
    { label: 'Vite', size: '1rem', faint: true, tint: 'rgba(108, 99, 255, 0.16)', hover: '#6C63FF', glow: 'rgba(108, 99, 255, 0.24)', flicker: true, flickerDuration: '4.2s', flickerDelay: '1.1s' },
  ],
  [
    { label: 'JavaScript', size: '3.85rem', tint: 'rgba(255, 255, 255, 0.18)', hover: 'rgba(255, 255, 255, 0.86)', glow: 'rgba(255, 255, 255, 0.24)' },
    { label: 'HTML/CSS', size: '3.15rem', tint: 'rgba(108, 99, 255, 0.28)', hover: '#6C63FF', glow: 'rgba(108, 99, 255, 0.3)', flicker: true, flickerDuration: '4.9s', flickerDelay: '0.7s' },
  ],
  [
    { label: 'Figma', size: '2.15rem', accent: true, hover: '#6C63FF', glow: 'rgba(108, 99, 255, 0.3)', flicker: true, flickerDuration: '3.2s', flickerDelay: '0s' },
    { label: 'CSS Grid', size: '1.15rem', tint: 'rgba(255, 255, 255, 0.16)', hover: 'rgba(255, 255, 255, 0.82)', glow: 'rgba(255, 255, 255, 0.22)' },
    { label: 'React', size: 'clamp(6.2rem, 10vw, 7.2rem)', tint: 'rgba(108, 99, 255, 0.34)', hover: '#6C63FF', glow: 'rgba(108, 99, 255, 0.34)', flicker: true, flickerDuration: '5.6s', flickerDelay: '1.4s' },
    { label: 'Flexbox', size: '1.2rem', tint: 'rgba(255, 255, 255, 0.16)', hover: 'rgba(255, 255, 255, 0.82)', glow: 'rgba(255, 255, 255, 0.22)' },
    { label: 'VS Code', size: '1.35rem', tint: 'rgba(108, 99, 255, 0.24)', hover: '#6C63FF', glow: 'rgba(108, 99, 255, 0.28)', flicker: true, flickerDuration: '4.4s', flickerDelay: '0.5s' },
  ],
  [
    { label: 'Tailwind CSS', size: '3.2rem', accent: true, rotate: '-2deg', hover: '#6C63FF', glow: 'rgba(108, 99, 255, 0.32)', flicker: true, flickerDuration: '3.5s', flickerDelay: '0.3s' },
    { label: 'Responsive', size: '2.55rem', rotate: '3deg', tint: 'rgba(255, 255, 255, 0.18)', hover: 'rgba(255, 255, 255, 0.84)', glow: 'rgba(255, 255, 255, 0.24)' },
  ],
  [
    { label: 'ESLint', size: '0.95rem', faint: true, tint: 'rgba(108, 99, 255, 0.16)', hover: '#6C63FF', glow: 'rgba(108, 99, 255, 0.24)', flicker: true, flickerDuration: '4.8s', flickerDelay: '1.2s' },
    { label: 'Git/GitHub', size: '1.7rem', tint: 'rgba(255, 255, 255, 0.17)', hover: 'rgba(255, 255, 255, 0.84)', glow: 'rgba(255, 255, 255, 0.22)' },
    { label: 'Prettier', size: '1rem', faint: true, tint: 'rgba(108, 99, 255, 0.16)', hover: '#6C63FF', glow: 'rgba(108, 99, 255, 0.24)', flicker: true, flickerDuration: '5.3s', flickerDelay: '0.8s' },
  ],
];

const mobileSkillGroups = [
  {
    label: 'Core',
    items: [
      { name: 'React', level: 'Main Focus', accent: true },
      { name: 'JavaScript', level: 'Growing', accent: true, tint: '#F7DF1E' },
      { name: 'HTML/CSS', level: 'Adv. Beginner', tint: '#FF6B35' },
    ],
  },
  {
    label: 'Styling',
    items: [
      { name: 'Tailwind CSS', level: 'Comfortable', accent: true, tint: '#38BDF8' },
      { name: 'Responsive', level: 'Strong Focus', tint: '#00D4AA' },
      { name: 'Layout Systems', level: 'Practicing', tint: '#A78BFA' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git/GitHub', level: 'Daily', tint: '#F05032' },
      { name: 'Figma', level: 'UI Refs', accent: true, tint: '#FF6B9D' },
      { name: 'VS Code', level: 'Daily Setup', tint: '#007ACC' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section" data-deco="Skills">
      <div className="container">
        <div className="section-shell">
          <div className="section-header-left">
            <p className="section-kicker">Skills</p>
            <h2 className="section-title section-title-modern" style={{ color: 'var(--text)' }}>
              The stack I keep returning to, repeated until it feels instinctive.
            </h2>
            <p className="section-copy">
              A clean typography dump instead of cards or icons. The bigger the word, the more
              central it is to how I build.
            </p>
          </div>

          <div className="section-body-gap skills-type-cloud skills-type-cloud-spaced type-dump">
            {skillRows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="skills-type-row">
                {row.map((skill) => (
                  <span
                    key={`${rowIndex}-${skill.label}`}
                    className={`skills-type-word${skill.accent ? ' is-accent' : ''}${skill.faint ? ' is-faint' : ''}${skill.flicker ? ' is-flicker' : ''}`}
                    style={{
                      fontSize: skill.size,
                      '--skill-color': skill.tint,
                      '--skill-hover': skill.hover,
                      '--skill-glow': skill.glow,
                      '--skill-flicker-duration': skill.flickerDuration,
                      '--skill-flicker-delay': skill.flickerDelay,
                      transform: skill.rotate ? `rotate(${skill.rotate})` : undefined,
                    }}
                  >
                    {skill.label}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="section-body-gap skills-mobile-groups">
            {mobileSkillGroups.map((group) => (
              <div key={group.label} className="skills-mobile-group">
                <p className="skills-mobile-label">{group.label}</p>
                <div className="skills-mobile-pills">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className={`skills-mobile-pill${item.accent ? ' is-accent' : ''}`}
                      style={{
                        '--skill-pill': item.tint ?? 'var(--color-accent)',
                      }}
                    >
                      <span>{item.name}</span>
                      <small>{item.level}</small>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
