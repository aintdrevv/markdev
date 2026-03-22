import { lazy, Suspense } from 'react';

const MiniIvePreview = lazy(() => import('../components/projects/MiniIvePreview.jsx'));

// Project cards feed both the featured center card and the smaller side cards.
const projects = [
  {
    name: '3D Model Showcase',
    status: 'In Progress',
    summary:
      'An interactive 3D project card focused on presenting my 3D model inside the portfolio with cleaner motion and theme-aware styling.',
    accent: 'var(--project-accent-featured)',
    featured: true,
  },
  {
    name: 'Landing Page Series',
    status: 'Building',
    summary:
      'Practice pages focused on conversion sections, mobile responsiveness, and interaction polish.',
    accent: 'var(--project-accent-secondary)',
  },
  {
    name: 'Portfolio System Notes',
    status: 'Active',
    summary:
      'Ongoing experiments around layout systems, theme transitions, and more intentional portfolio presentation.',
    accent: 'var(--project-accent-tertiary)',
  },
  {
    name: 'Job Application Logger',
    status: 'Active',
    summary:
      'A focused tracker for applications, follow-ups, and interview progress so the search stays organized and visible.',
    accent: 'var(--project-accent-quaternary)',
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
              This section highlights the work I am building now, from my main featured project
              to smaller experiments that show range, progress, and attention to detail.
            </p>
          </div>

          {/* Featured build first, then supporting experiments around it */}
          <div className="section-body-gap projects-bento-grid">
            <article
              className="project-bento-card project-bento-featured"
              style={{ '--project-accent': featured.accent }}
            >
              <div className="project-bento-preview project-bento-preview-featured project-bento-preview-model">
                <Suspense fallback={<div className="project-model-loading" aria-hidden="true" />}>
                  <MiniIvePreview />
                </Suspense>
              </div>

              <div className="project-bento-copy">
                <span className="project-featured-tag bg-[color:var(--project-accent)]/12 text-[color:var(--project-accent)]">
                  Featured
                </span>
                <h3 className="text-[color:var(--project-accent)] drop-shadow-[0_0_18px_color-mix(in_srgb,var(--project-accent)_24%,transparent)]">
                  {featured.name}
                </h3>
                <p className="text-[color:color-mix(in_srgb,var(--text)_82%,var(--project-accent)_18%)]">
                  {featured.summary}
                </p>
                <div className="project-bento-meta">
                  <span className="project-status-badge bg-[color:var(--project-accent)]/10 text-[color:var(--project-accent)] ring-1 ring-[color:var(--project-accent)]/20">
                    {featured.status}
                  </span>
                  <a
                    className="transition-colors after:ml-1 after:inline-block after:text-current after:content-['↗'] hover:text-[color:var(--text)]"
                    href="https://github.com/aintdrevv"
                    target="_blank"
                    rel="noreferrer"
                  >
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
                  <h3 className="text-[color:var(--project-accent)]">{project.name}</h3>
                  <p className="text-[color:color-mix(in_srgb,var(--text)_80%,var(--project-accent)_20%)]">
                    {project.summary}
                  </p>
                  <div className="project-bento-meta">
                    <span className="project-status-badge bg-[color:var(--project-accent)]/10 text-[color:var(--project-accent)] ring-1 ring-[color:var(--project-accent)]/20">
                      {project.status}
                    </span>
                    <a
                      className="transition-colors after:ml-1 after:inline-block after:text-current after:content-['↗'] hover:text-[color:var(--text)]"
                      href="https://github.com/aintdrevv"
                      target="_blank"
                      rel="noreferrer"
                    >
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
