const stackLines = [
  { keyName: 'react', value: 'primary framework  UI & component systems' },
  { keyName: 'javascript', value: 'core language  logic & interactivity' },
  { keyName: 'typescript', value: 'type safety  scalable codebases' },
  { keyName: 'tailwind', value: 'styling  utility-first, fast' },
  { keyName: 'html_css', value: 'foundation  semantic & responsive' },
  { keyName: 'figma', value: 'design  wireframes to production' },
  { keyName: 'git', value: 'workflow  version control & collaboration' },
];

export default function Skills() {
  return (
    <section id="skills" className="section" data-deco="Skills">
      <div className="container">
        <div className="section-shell">
          <div className="section-header-left">
            <p className="section-kicker">Skills</p>
            <h2 className="section-title section-title-modern" style={{ color: 'var(--text)' }}>
              The stack I keep returning to,
            </h2>
            <p className="section-copy">
              A clean typography dump instead of cards or icons. The bigger the word, the more
              central it is to how I build.
            </p>
          </div>

          <div className="section-body-gap skills-editor-shell">
            <div className="skills-editor-window">
              <div className="skills-editor-bar" aria-hidden="true">
                <div className="skills-editor-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <p>mark.config.js</p>
                <span className="skills-editor-spacer" />
              </div>

              <div className="skills-editor-code term-body" role="presentation" aria-label="Skills code block">
                <div className="skills-code-line term-line">
                  <span className="skills-line-number">1</span>
                  <span>
                    <span className="skills-keyword">const</span>
                    <span className="skills-code-gap"> </span>
                    <span className="skills-object-name">stack</span>
                    <span className="skills-code-gap"> </span>
                    <span className="skills-punctuation">=</span>
                    <span className="skills-code-gap"> </span>
                    <span className="skills-punctuation">{'{'}</span>
                  </span>
                </div>

                {stackLines.map((line, index) => (
                  <div key={line.keyName} className="skills-code-line skills-code-entry term-line">
                    <span className="skills-line-number">{index + 2}</span>
                    <span>
                      <span className="skills-indent" aria-hidden="true">
                        {'  '}
                      </span>
                      <span className="skills-key-name">{line.keyName}</span>
                      <span className="skills-punctuation">:</span>
                      <span className="skills-entry-pad" aria-hidden="true" />
                      <span className="skills-string">'{line.value}'</span>
                      <span className="skills-punctuation">,</span>
                    </span>
                  </div>
                ))}

                <div className="skills-code-line term-line">
                  <span className="skills-line-number">{stackLines.length + 2}</span>
                  <span>
                    <span className="skills-punctuation">{'}'}</span>
                    <span className="skills-cursor">|</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
