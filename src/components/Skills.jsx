const skillRows = [
  [
    { label: 'npm', size: '0.95rem', faint: true, color: 'rgba(var(--brand-rgb), 0.18)' },
    { label: 'Git/GitHub', size: '1.95rem', color: 'rgba(var(--text-rgb), 0.34)' },
    { label: 'VS Code', size: '1.45rem', color: 'rgba(var(--brand-rgb), 0.3)' },
    { label: 'Layout Systems', size: '1.65rem', color: 'rgba(var(--brand-rgb), 0.36)' },
    { label: 'Vite', size: '1rem', faint: true, color: 'rgba(var(--brand-rgb), 0.18)' },
  ],
  [
    { label: 'JavaScript', size: '3.85rem', color: 'rgba(var(--text-rgb), 0.38)' },
    { label: 'HTML/CSS', size: '3.15rem', color: 'rgba(var(--brand-rgb), 0.34)' },
  ],
  [
    { label: 'Figma', size: '2.15rem', accent: true, color: 'rgba(var(--brand-rgb), 0.58)' },
    { label: 'CSS Grid', size: '1.15rem', color: 'rgba(var(--text-rgb), 0.26)' },
    { label: 'React', size: 'clamp(6.2rem, 10vw, 7.2rem)', color: 'rgba(var(--brand-rgb), 0.52)' },
    { label: 'Flexbox', size: '1.2rem', color: 'rgba(var(--text-rgb), 0.26)' },
    { label: 'VS Code', size: '1.35rem', color: 'rgba(var(--brand-rgb), 0.28)' },
  ],
  [
    { label: 'Tailwind CSS', size: '3.2rem', accent: true, rotate: '-2deg', color: 'rgba(var(--brand-rgb), 0.62)' },
    { label: 'Responsive', size: '2.55rem', rotate: '3deg', color: 'rgba(var(--text-rgb), 0.34)' },
  ],
  [
    { label: 'ESLint', size: '0.95rem', faint: true, color: 'rgba(var(--brand-rgb), 0.18)' },
    { label: 'Git/GitHub', size: '1.7rem', color: 'rgba(var(--text-rgb), 0.32)' },
    { label: 'Prettier', size: '1rem', faint: true, color: 'rgba(var(--brand-rgb), 0.18)' },
  ],
];

const mobileSkillGroups = [
  {
    label: 'Core',
    items: [
      { name: 'React', level: 'Main Focus', accent: true },
      { name: 'JavaScript', level: 'Growing', accent: true },
      { name: 'HTML/CSS', level: 'Adv. Beginner' },
    ],
  },
  {
    label: 'Styling',
    items: [
      { name: 'Tailwind CSS', level: 'Comfortable', accent: true },
      { name: 'Responsive', level: 'Strong Focus' },
      { name: 'Layout Systems', level: 'Practicing' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git/GitHub', level: 'Daily' },
      { name: 'Figma', level: 'UI Refs', accent: true },
      { name: 'VS Code', level: 'Daily Setup' },
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
                    className={`skills-type-word${skill.accent ? ' is-accent' : ''}${skill.faint ? ' is-faint' : ''}`}
                    style={{
                      fontSize: skill.size,
                      color: skill.color,
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
