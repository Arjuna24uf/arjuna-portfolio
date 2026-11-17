import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, profile, socials } from '../data'
import Icon from './Icon'

export default function Navbar({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNav = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    onNavigate(id)
  }

  return (
    <>
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a href="#home" className="brand" onClick={(e) => handleNav(e, 'home')}>
            <span className="brand-star" aria-hidden="true">✦</span>
            <span className="brand-text">{profile.shortName}</span>
            <span className="brand-dot">.</span>
          </a>

          <nav className="nav-links" aria-label="Primary Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`nav-link ${isActive ? 'is-active' : ''}`}
                  onClick={(e) => handleNav(e, link.id)}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="nav-underline"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="nav-actions">
            <a
              href={profile.cv}
              download="CV-Arjuna-Rauf-Surya-Putra.pdf"
              className="btn btn-ghost btn-sm nav-cv-btn"
            >
              <span>Download CV</span>
              <Icon name="download" size={15} />
            </a>

            <button
              type="button"
              className="nav-burger"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mobile-menu-inner">
              <div className="mobile-menu-links">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`mobile-nav-link ${activeSection === link.id ? 'is-active' : ''}`}
                    onClick={(e) => handleNav(e, link.id)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.35 }}
                  >
                    <span className="mobile-nav-num">0{idx + 1}</span>
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </div>

              <div className="mobile-menu-footer">
                <a
                  href={profile.cv}
                  download="CV-Arjuna-Rauf-Surya-Putra.pdf"
                  className="btn btn-primary mobile-cv-btn"
                >
                  <span>Download CV</span>
                  <Icon name="download" size={16} />
                </a>

                <div className="mobile-socials">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      className="social-pill"
                    >
                      <Icon name={s.icon} size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
