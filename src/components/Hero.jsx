import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { profile, socials } from '../data'
import Icon from './Icon'
import HeroScene from './HeroScene'

export default function Hero({ isMobile, onNavigate }) {
  const [roleIdx, setRoleIdx] = useState(0)
  const [inspect3D, setInspect3D] = useState(false)
  const stageRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % profile.roles.length)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  // Layered depth parallax for portrait & foreground crystal shards
  useEffect(() => {
    if (isMobile) return
    const onMove = (e) => {
      const el = stageRef.current
      if (!el) return
      const px = (e.clientX / window.innerWidth - 0.5) * 2
      const py = (e.clientY / window.innerHeight - 0.5) * 2
      el.style.setProperty('--px', px.toFixed(3))
      el.style.setProperty('--py', py.toFixed(3))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [isMobile])

  return (
    <section id="home" className="hero">
      {/* Subtle architectural backdrop */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-temple" />
        <div className="hero-bg-glow hero-bg-glow-1" />
        <div className="hero-bg-glow hero-bg-glow-2" />
      </div>

      <div className="container hero-grid">
        {/* Left column: Typography & CTAs */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            <motion.span
              key={profile.roles[roleIdx]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {profile.roles[roleIdx]}
            </motion.span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line">Dream Bigger.</span>
            <span className="hero-title-line">
              Build <em>Better.</em>
            </span>
          </h1>

          <p className="hero-desc">
            I’m <strong>{profile.name}</strong>, {profile.intro}
          </p>

          <div className="hero-cta">
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                onNavigate('projects')
              }}
            >
              <span>Explore Projects</span>
              <Icon name="arrow" size={17} />
            </a>

            <a
              href="#contact"
              className="btn btn-ghost"
              onClick={(e) => {
                e.preventDefault()
                onNavigate('contact')
              }}
            >
              <span>Contact Me</span>
            </a>
          </div>

          <div className="hero-socials" aria-label="Social Media Links">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                title={s.name}
                className="hero-social-link"
              >
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>

          <a
            href="#about"
            className="hero-scroll"
            onClick={(e) => {
              e.preventDefault()
              onNavigate('about')
            }}
          >
            <span className="scroll-mouse">
              <span className="scroll-wheel" />
            </span>
            <span className="scroll-text">Scroll Down</span>
          </a>
        </motion.div>

        {/* Right column: Precision-aligned 3D Roman Statue + Arjuna Portrait + Crimson Silk + Shards */}
        <motion.div
          ref={stageRef}
          className={`hero-stage ${inspect3D ? 'is-inspect-mode' : ''}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Crimson aura & silk backdrop */}
          <div className="hero-halo" aria-hidden="true" />
          <img
            src="/images/silk-1.png"
            alt=""
            aria-hidden="true"
            className="hero-silk-back"
          />

          {/* Interactive Three.js 3D Statue + Ruby Crystals */}
          <HeroScene isMobile={isMobile} inspectMode={inspect3D} />

          {/* Foreground Portrait Cutout (locked to bottom-left/center of stage, statue rises behind right shoulder) */}
          <div className={`hero-portrait-wrap ${inspect3D ? 'is-dimmed' : ''}`}>
            <img
              src="/images/arjuna.png"
              alt="Arjuna Rauf Surya Putra"
              className="hero-portrait"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          {/* Floating crystal & marble fragments overlay */}
          <img
            src="/images/rocks.png"
            alt=""
            aria-hidden="true"
            className="hero-rocks hero-rocks-left"
          />
          <img
            src="/images/rocks.png"
            alt=""
            aria-hidden="true"
            className="hero-rocks hero-rocks-right"
          />

          {/* Interactive 3D mode toggle badge */}
          <button
            type="button"
            className="hero-3d-toggle"
            onClick={() => setInspect3D((v) => !v)}
            title="Toggle between layered portrait and full 3D statue inspection"
          >
            <span className="toggle-dot" />
            <span>{inspect3D ? 'Show Portrait + 3D' : 'Inspect 3D Statue'}</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom crimson crystal divider */}
      <div className="hero-bottom-fade" aria-hidden="true" />
    </section>
  )
}
