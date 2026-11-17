import { motion } from 'framer-motion'
import { experiences, education } from '../data'
import Icon from './Icon'
import TiltCard from './TiltCard'

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
        >
          <div>
            <div className="section-label">
              <span className="num">02.</span>
              <span>Experience & Education</span>
            </div>
            <h2 className="title">
              Forged Through <br />
              <em>Real-World</em> Discipline.
            </h2>
          </div>
          <p className="lead">
            From coaching clients on the gym floor and troubleshooting hardware to growing digital channels and studying Informatics Engineering.
          </p>
        </motion.div>

        <div className="exp-layout">
          {/* Left / Main: Work Experience Timeline */}
          <div className="timeline">
            <div className="timeline-line" aria-hidden="true" />
            {experiences.map((item, idx) => (
              <motion.div
                key={`${item.company}-${item.period}`}
                className="timeline-item"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.07 }}
              >
                <div className="timeline-dot" aria-hidden="true">
                  <span className="timeline-dot-core" />
                </div>

                <TiltCard className="timeline-card glass" maxTilt={5}>
                  <div className="timeline-meta">
                    <span className="timeline-period">{item.period}</span>
                    <span className="chip">
                      <span className="dot" />
                      {item.type}
                    </span>
                  </div>
                  <h3 className="timeline-role">{item.role}</h3>
                  <div className="timeline-company">{item.company}</div>
                  <ul className="timeline-points">
                    {item.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Right / Sticky: Education & Credentials */}
          <div className="edu-column">
            <div className="edu-sticky">
              <div className="edu-header">
                <Icon name="cap" size={20} />
                <span>Academic Foundation</span>
              </div>

              {education.map((edu, idx) => (
                <motion.div
                  key={edu.place}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                >
                  <TiltCard className="edu-card glass" maxTilt={6}>
                    <span className="timeline-period">{edu.period}</span>
                    <h3 className="edu-title">{edu.title}</h3>
                    <div className="edu-place">{edu.place}</div>
                    <p className="edu-text">{edu.text}</p>
                  </TiltCard>
                </motion.div>
              ))}

              <TiltCard className="edu-card edu-highlight glass" maxTilt={6}>
                <div className="chip">
                  <span className="dot" />
                  Mindset
                </div>
                <h3 className="edu-title">Learning in Public</h3>
                <p className="edu-text">
                  As a beginner developer, I focus on shipping real, working web projects that solve problems I know firsthand — and improving with every build.
                </p>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
