const projects = [
  {
    name: 'Portfolio V3',
    status: 'In progress',
    summary: 'A refined personal site with stronger storytelling, visual rhythm, and cleaner component architecture.',
  },
  {
    name: 'UI Component Lab',
    status: 'Planned',
    summary: 'A collection of reusable cards, forms, and navigation patterns for faster interface building.',
  },
  {
    name: 'Landing Page Series',
    status: 'Building',
    summary: 'Practice pages focused on conversion sections, mobile responsiveness, and interaction polish.',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section" data-deco="Projects">
      <div className="container">
        <p className="section-kicker">Projects</p>
        <h2 className="section-title">Work snapshots and upcoming builds.</h2>
        <p className="section-copy">
          This section is evolving as I complete more public projects. For now, here is what I am
          actively shipping next.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.name} className="glass-card project-card">
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="project-links">
                <span className="pill">{project.status}</span>
                <a href="https://github.com/aintdrevv" target="_blank" rel="noreferrer">
                  Repository
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
