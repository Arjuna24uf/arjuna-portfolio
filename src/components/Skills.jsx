import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '../data'
import TiltCard from './TiltCard'

const skillGroups = [
  {
    key: 'using',
    badge: 'Using in Projects',
    title: 'Web & Tech Fundamentals',
    desc: 'Technologies and technical tools I have applied in my live web projects, coursework, and fieldwork.',
    accent: 'red',
    items: skills.using,
  },
  {
    key: 'learning',
    badge: 'Currently Learning',
    title: 'Next-Level Frontend & 3D',
    desc: 'Actively studying modern component frameworks, 3D web graphics, and UI/UX systems — including this portfolio.',
    accent: 'amber',
    items: skills.learning,
  },
  {
    key: 'creative',
    badge: 'Content & Media',
    title: 'Creative & Digital Growth',
    desc: 'Hands-on experience growing YouTube (40.6K subs) and TikTok (1M+ likes) from scratch.',
    accent: 'purple',
    items: skills.creative,
  },
  {
    key: 'soft',
    badge: 'Human Skills',
    title: 'Coaching, Service & Discipline',
    desc: 'Built through daily client interaction as a Personal Trainer, cashier, and team collaborator.',
    accent: 'green',
    items: skills.soft,
  },
]

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const orbitItems = [...skills.using.slice(0, 6), ...skills.learning]

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="skills-top">
          <motion.div
            className="skills-copy"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
          >
            <div className="section-label">
              <span className="num">04.</span>
              <span>Skills & Arsenal</span>
            </div>

            <h2 className="title">
              Craft, Code <br />& <em>Discipline.</em>
            </h2>

            <p className="lead skills-lead">
              No inflated percentage bars — just a transparent breakdown of what I build with today, what I’m actively learning next, and the creative skills behind my channels.
            </p>
          </motion.div>

          {/* Interactive 3D-style Orbital Core */}
          <motion.div
            className="skills-orbit-wrap"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="skills-orbit">
              <div className="orbit-ring orbit-ring-outer" />
              <div className="orbit-ring orbit-ring-inner" />
              <div className="orbit-core">
                <span className="orbit-core-star">✦</span>
                <span className="orbit-core-label">
                  {hoveredSkill || 'Always Building'}
                </span>
              </div>

              {orbitItems.map((item, i) => {
                const angle = (i / orbitItems.length) * 360
                return (
                  <button
                    key={item}
                    type="button"
                    className="orbit-node"
                    style={{ '--angle': `${angle}deg` }}
                    onMouseEnter={() => setHoveredSkill(item)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onFocus={() => setHoveredSkill(item)}
                    onBlur={() => setHoveredSkill(null)}
                  >
                    <span>{item}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* 4 Categorized Skill Cards */}
        <div className="skills-grid">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
            >
              <TiltCard className={`skill-card glass accent-${group.accent}`} maxTilt={6}>
                <div className="skill-card-head">
                  <span className={`skill-badge badge-${group.accent}`}>
                    <span className="status-dot" />
                    {group.badge}
                  </span>
                  <span className="skill-count">{group.items.length} skills</span>
                </div>

                <h3 className="skill-card-title">{group.title}</h3>
                <p className="skill-card-desc">{group.desc}</p>

                <div className="skill-pills">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="skill-pill"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <span className="skill-pill-dot" />
                      {skill}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
