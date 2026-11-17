import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { about } from '../data'
import Icon from './Icon'
import TiltCard from './TiltCard'

function StatCounter({ value, suffix, decimals = 0, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const duration = 1400
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(value * eased)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <div ref={ref} className="stat-card glass">
      <div className="stat-number">
        <span>{display.toFixed(decimals)}</span>
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function About({ onNavigate }) {
  return (
    <section id="about" className="section about-section">
      {/* Decorative crimson silk ribbon */}
      <img
        src="/images/silk-1.png"
        alt=""
        aria-hidden="true"
        className="section-silk silk-about"
        loading="lazy"
      />

      <div className="container">
        <div className="about-grid">
          {/* Left column: Heading & narrative */}
          <motion.div
            className="about-copy"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label">
              <span className="num">01.</span>
              <span>About Me</span>
            </div>

            <h2 className="title about-title">
              Turning Ideas <br />
              Into <em>Reality.</em>
            </h2>

            <div className="about-paragraphs">
              {about.text.map((p, idx) => (
                <p key={idx} className="lead">
                  {p}
                </p>
              ))}
            </div>

            <div className="about-actions">
              <a
                href="#experience"
                className="btn btn-outline-red"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate('experience')
                }}
              >
                <span>Learn More</span>
                <Icon name="arrow" size={16} />
              </a>
            </div>
          </motion.div>

          {/* Center column: Info glass box matching mockup */}
          <motion.div
            className="about-cards-wrap"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <TiltCard className="about-info-panel glass" maxTilt={6}>
              {about.cards.map((card, i) => (
                <div key={card.title} className={`about-info-row ${i > 0 ? 'has-divider' : ''}`}>
                  <div className="about-info-icon">
                    <Icon name={card.icon} size={22} />
                  </div>
                  <div className="about-info-body">
                    <h3 className="about-info-title">{card.title}</h3>
                    <p className="about-info-text">{card.text}</p>
                  </div>
                </div>
              ))}
            </TiltCard>
          </motion.div>

          {/* Right column: Editorial visual frame */}
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.22 }}
          >
            <TiltCard className="about-frame" maxTilt={7}>
              <img
                src="/images/arjuna-statue.jpg"
                alt="Arjuna Rauf Surya Putra — Roman Editorial Portrait"
                className="about-frame-img"
                loading="lazy"
              />
              <div className="about-frame-overlay">
                <span className="chip">
                  <span className="dot" />
                  Open for Freelance
                </span>
                <p className="about-frame-quote">
                  “Discipline from the gym, storytelling from content, and logic from code.”
                </p>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Animated metrics counter strip */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          {about.stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
