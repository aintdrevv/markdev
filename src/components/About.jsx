const timeline = [
  {
    title: 'Current Focus',
    description: 'Strengthening React fundamentals, component design, and responsive layouts.',
  },
  {
    title: 'Design Process',
    description: 'Start with clear hierarchy, then refine spacing, typography, and interaction states.',
  },
  {
    title: 'Goal',
    description: 'Ship polished work for internship, junior roles, and freelance collaborations.',
  },
];

export default function About() {
  return (
    <section id="about" className="section" data-deco="About">
      <div className="container">
        <p className="section-kicker">About</p>
        <h2 className="section-title">A developer who cares about details.</h2>
        <p className="section-copy">
          I am an aspiring frontend developer from Quezon, Philippines. I enjoy transforming ideas
          into structured, modern, and responsive interfaces that feel consistent across devices.
        </p>

        <div className="about-grid">
          <article className="glass-card about-block">
            <p>
              My learning path is practical: build often, review critically, and improve quickly. I
              focus on writing readable code, making layouts feel intentional, and keeping each
              screen easy to navigate. I am currently looking for opportunities where I can
              contribute while growing in a real product team.
            </p>
          </article>

          <aside className="timeline">
            {timeline.map((item) => (
              <div key={item.title} className="timeline-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
