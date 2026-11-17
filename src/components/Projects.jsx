import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, projectFilters } from '../data'
import Icon from './Icon'
import TiltCard from './TiltCard'

const badgeStyle = {
  Deployed: 'badge-green',
  Organization: 'badge-blue',
  'Landing Page': 'badge-purple',
  '40.6K Subs': 'badge-red',
  '1M+ Likes': 'badge-red',
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const featured = projects.find((p) => p.featured)

  return (
    <section id="projects" className="section projects-section">
      {/* Decorative crimson silk ribbon */}
      <img
        src="/images/silk-2.png"
        alt=""
        aria-hidden="true"
        className="section-silk silk-projects"
        loading="lazy"
      />

      <div className="container">
        {/* Top showcase matching mockup: left editorial column + 3 main web cards */}
        <div className="projects-showcase">
          <motion.div
            className="projects-intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
          >
            <div className="section-label">
              <span className="num">03.</span>
              <span>Featured Projects</span>
            </div>

            <h2 className="title">
              My Digital <br />
              <em>Experiments.</em>
            </h2>

            <p className="lead projects-lead">
              A collection of projects I’ve built, from practical applications for coaching to student organization sites and digital content channels.
            </p>

            {/* Filter pills */}
            <div className="project-filters" role="tablist" aria-label="Filter projects by category">
              {projectFilters.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={filter === cat}
                  className={`filter-pill ${filter === cat ? 'is-active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="projects-cta">
              <a
                href="https://github.com/Arjuna24uf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-red"
              >
                <span>View All on GitHub</span>
                <Icon name="arrow" size={16} />
              </a>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((proj, idx) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                >
                  <TiltCard
                    className={`project-card glass ${proj.featured ? 'is-featured' : ''}`}
                    maxTilt={7}
                  >
                    <div
                      className="project-thumb"
                      onClick={() => setSelected(proj)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setSelected(proj)
                      }}
                    >
                      {proj.image ? (
                        <img src={proj.image} alt={proj.title} loading="lazy" />
                      ) : (
                        <div className={`project-visual visual-${proj.visual}`}>
                          <div className="project-visual-icon">
                            <Icon name={proj.visual} size={42} />
                          </div>
                          <span className="project-visual-tag">{proj.badge}</span>
                        </div>
                      )}
                      <div className="project-thumb-overlay">
                        <span>Inspect Project</span>
                      </div>
                    </div>

                    <div className="project-body">
                      <div className="project-head-row">
                        <div>
                          <h3 className="project-title">{proj.title}</h3>
                          <p className="project-subtitle">{proj.subtitle}</p>
                        </div>
                        {proj.featured && <span className="featured-star" title="Featured Project">★</span>}
                      </div>

                      <p className="project-desc">{proj.description}</p>

                      <div className="project-tags">
                        {proj.tech.map((t) => (
                          <span key={t} className="tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="project-footer">
                        <span className={`status-badge ${badgeStyle[proj.badge] || 'badge-red'}`}>
                          <span className="status-dot" />
                          {proj.badge}
                        </span>

                        <div className="project-links">
                          {proj.repo && (
                            <a
                              href={proj.repo}
                              target="_blank"
                              rel="noreferrer"
                              className="project-icon-btn"
                              aria-label={`${proj.title} GitHub repository`}
                              title="Source Code on GitHub"
                            >
                              <Icon name="github" size={16} />
                            </a>
                          )}
                          {proj.demo && (
                            <a
                              href={proj.demo}
                              target="_blank"
                              rel="noreferrer"
                              className="project-icon-btn project-demo-btn"
                              aria-label={`Open ${proj.title} live demo`}
                              title="Open Live Link"
                            >
                              <Icon name="external" size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Featured Project Deep-Dive Banner (CoachArjuna) */}
        {featured && (
          <motion.div
            className="featured-spotlight glass"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
          >
            <div className="spotlight-copy">
              <div className="chip">
                <span className="dot" />
                Featured Case Study • Coding × Fitness
              </div>
              <h3 className="spotlight-title">
                {featured.title} — <span>{featured.subtitle}</span>
              </h3>
              <p className="spotlight-desc">{featured.description}</p>
              <ul className="spotlight-features">
                {featured.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={16} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="spotlight-actions">
                <a
                  href={featured.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <span>Try Live App</span>
                  <Icon name="external" size={15} />
                </a>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setSelected(featured)}
                >
                  <span>Preview Details</span>
                </button>
              </div>
            </div>

            <div className="spotlight-preview" onClick={() => setSelected(featured)}>
              <img src={featured.image} alt={featured.title} loading="lazy" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="project-modal glass"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close"
                aria-label="Close modal"
                onClick={() => setSelected(null)}
              >
                <Icon name="close" size={20} />
              </button>

              {selected.image && (
                <div className="modal-image">
                  <img src={selected.image} alt={selected.title} />
                </div>
              )}

              <div className="modal-body">
                <span className={`status-badge ${badgeStyle[selected.badge] || 'badge-red'}`}>
                  <span className="status-dot" />
                  {selected.badge}
                </span>
                <h3 className="modal-title">{selected.title}</h3>
                <p className="modal-sub">{selected.subtitle}</p>
                <p className="modal-desc">{selected.description}</p>

                {selected.features && (
                  <ul className="spotlight-features">
                    {selected.features.map((f) => (
                      <li key={f}>
                        <Icon name="check" size={16} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="project-tags">
                  {selected.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="modal-actions">
                  {selected.demo && (
                    <a
                      href={selected.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      <span>Open Live Link</span>
                      <Icon name="external" size={15} />
                    </a>
                  )}
                  {selected.repo && (
                    <a
                      href={selected.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost btn-sm"
                    >
                      <span>View GitHub Repo</span>
                      <Icon name="github" size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
