const projects = [
  {
    name: 'Portfolio V3',
    status: 'In Progress',
    summary:
      'A refined personal site with stronger storytelling, visual rhythm, and cleaner component architecture.',
    accent: '#00D4AA',
    featured: true,
  },
  {
    name: 'UI Component Lab',
    status: 'Planned',
    summary:
      'A collection of reusable cards, forms, and navigation patterns for faster interface building.',
    accent: '#6C63FF',
  },
  {
    name: 'Landing Page Series',
    status: 'Building',
    summary:
      'Practice pages focused on conversion sections, mobile responsiveness, and interaction polish.',
    accent: '#FF6B9D',
  },
  {
    name: 'Job Application Logger',
    status: 'Active',
    summary:
      'A focused tracker for applications, follow-ups, and interview progress so the search stays organized and visible.',
    accent: '#8B7BFF',
  },
];

export default function Projects() {
  const [featured, ...secondaryProjects] = projects;

  return (
    <section id="projects" className="section section-projects" data-deco="Projects">
      <div className="container">
        <div className="projects-bento-shell section-shell">
          <div className="section-header-left projects-bento-head">
            <p className="section-kicker">Projects</p>
            <h2 className="section-title section-title-modern">
              Creative builds arranged as a living bento board.
            </h2>
            <p className="section-copy">
              A featured build sits at the center, while the next experiments orbit around it in
              smaller snapshots. The focus is direction, momentum, and visual personality.
            </p>
          </div>

          <div className="section-body-gap projects-bento-grid">
            <article
              className="project-bento-card project-bento-featured"
              style={{ '--project-accent': featured.accent }}
            >
              <div className="project-bento-preview project-bento-preview-featured" aria-hidden="true">
                <div className="project-donut-glow" />
                <div className="project-donut-wrap">
                  <span className="project-donut-ring ring-a" />
                  <span className="project-donut-ring ring-b" />
                  <span className="project-donut-ring ring-c" />
                  <span className="project-donut-core" />
                </div>
              </div>

              <div className="project-bento-copy">
                <span className="project-featured-tag">Featured</span>
                <h3>{featured.name}</h3>
                <p>{featured.summary}</p>
                <div className="project-bento-meta">
                  <span className="project-status-badge">{featured.status}</span>
                  <a href="https://github.com/aintdrevv" target="_blank" rel="noreferrer">
                    Repository
                  </a>
                </div>
              </div>
            </article>

            {secondaryProjects.map((project, index) => (
              <article
                key={project.name}
                className="project-bento-card project-bento-side"
                style={{ '--project-accent': project.accent }}
              >
                <div className="project-bento-preview project-bento-preview-side" aria-hidden="true">
                  <span className={`project-side-orb orb-${index + 1} orb-main`} />
                  <span className={`project-side-orb orb-${index + 1} orb-second`} />
                  <span className={`project-side-orb orb-${index + 1} orb-third`} />
                </div>

                <div className="project-bento-copy">
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="project-bento-meta">
                    <span className="project-status-badge">{project.status}</span>
                    <a href="https://github.com/aintdrevv" target="_blank" rel="noreferrer">
                      Repository
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
