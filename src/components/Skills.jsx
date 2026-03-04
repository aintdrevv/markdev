const groups = [
  {
    title: 'Frontend Core',
    items: [
      { name: 'HTML/CSS', level: 'Advanced beginner' },
      { name: 'JavaScript', level: 'Growing' },
      { name: 'React', level: 'Main focus' },
    ],
  },
  {
    title: 'Styling & UI',
    items: [
      { name: 'Tailwind CSS', level: 'Comfortable' },
      { name: 'Responsive Design', level: 'Strong focus' },
      { name: 'Layout Systems', level: 'Practicing' },
    ],
  },
  {
    title: 'Tools & Workflow',
    items: [
      { name: 'Git/GitHub', level: 'Learning daily' },
      { name: 'Figma', level: 'UI references' },
      { name: 'VS Code/Cursor', level: 'Daily setup' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="section-kicker">Skills</p>
        <h2 className="section-title">Modern frontend stack in progress.</h2>
        <p className="section-copy">
          I am actively building better execution in structure, styling, and workflow. These are
          the tools I currently use in portfolio and UI practice projects.
        </p>

        <div className="skills-grid">
          {groups.map((group) => (
            <article key={group.title} className="glass-card skill-card">
              <h3>{group.title}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <span className="pill">{item.level}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
