import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile, socials, navLinks, WEB3FORMS_KEY } from '../data'
import Icon from './Icon'
import TiltCard from './TiltCard'

export default function Contact({ onNavigate }) {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Freelance / Project', message: '' })
  const [status, setStatus] = useState({ state: 'idle', note: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return

    if (WEB3FORMS_KEY) {
      setStatus({ state: 'sending', note: 'Sending your message...' })
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: form.name,
            email: form.email,
            subject: `[Portfolio] ${form.subject} — from ${form.name}`,
            message: form.message,
          }),
        })
        const data = await res.json()
        if (data.success) {
          setStatus({ state: 'sent', note: 'Message sent! Arjuna will get back to you soon.' })
          setForm({ name: '', email: '', subject: 'Freelance / Project', message: '' })
          return
        }
      } catch {
        // Fallback to WhatsApp if network fails
      }
    }

    const text = `Hi Arjuna! 👋\n\n*Name:* ${form.name}\n*Email:* ${form.email || '-'}\n*Topic:* ${form.subject}\n\n*Message:*\n${form.message}`
    const waUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    setStatus({
      state: 'sent',
      note: 'Opening WhatsApp with your pre-filled message!',
    })
  }

  return (
    <section id="contact" className="section contact-section">
      {/* Roman Temple background */}
      <div className="contact-bg" aria-hidden="true">
        <img src="/images/temple.jpg" alt="" loading="lazy" />
        <div className="contact-bg-overlay" />
      </div>

      <div className="container contact-container">
        <div className="contact-grid">
          {/* Left column: Direct channels & pitch */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
          >
            <div className="section-label">
              <span className="num">05.</span>
              <span>Contact</span>
            </div>

            <h2 className="title">
              Let’s Build <br />
              Something <em>Epic.</em>
            </h2>

            <p className="lead contact-lead">
              Open for freelance web projects, content collaborations, personal training inquiries, or internship opportunities. Reach out directly anytime.
            </p>

            <div className="contact-cards">
              <TiltCard
                as="a"
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="contact-channel glass"
                maxTilt={5}
              >
                <div className="channel-icon">
                  <Icon name="whatsapp" size={20} />
                </div>
                <div className="channel-body">
                  <span className="channel-label">WhatsApp (Fastest Response)</span>
                  <strong className="channel-value">{profile.phone}</strong>
                </div>
                <Icon name="external" size={16} className="channel-arrow" />
              </TiltCard>

              <TiltCard
                as="a"
                href={`mailto:${profile.email}`}
                className="contact-channel glass"
                maxTilt={5}
              >
                <div className="channel-icon">
                  <Icon name="mail" size={20} />
                </div>
                <div className="channel-body">
                  <span className="channel-label">Email Address</span>
                  <strong className="channel-value">{profile.email}</strong>
                </div>
                <Icon name="external" size={16} className="channel-arrow" />
              </TiltCard>

              <div className="contact-channel glass is-static">
                <div className="channel-icon">
                  <Icon name="pin" size={20} />
                </div>
                <div className="channel-body">
                  <span className="channel-label">Location</span>
                  <strong className="channel-value">{profile.location}</strong>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                  aria-label={s.name}
                  title={s.name}
                >
                  <Icon name={s.icon} size={18} />
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right column: Interactive Message Form */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            <TiltCard className="contact-form-card glass" maxTilt={4}>
              <h3 className="form-title">Send a Direct Message</h3>
              <p className="form-subtitle">
                Fill out the form below — it will format your message and connect you directly with me.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <label className="form-field">
                    <span>Your Name *</span>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </label>

                  <label className="form-field">
                    <span>Your Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="form-field">
                  <span>Topic</span>
                  <div className="topic-pills">
                    {['Freelance / Project', 'Content Collab', 'Personal Training', 'Other'].map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        className={`topic-pill ${form.subject === topic ? 'is-active' : ''}`}
                        onClick={() => setForm((prev) => ({ ...prev, subject: topic }))}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="form-field">
                  <span>Message *</span>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell me about your project, idea, or question..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </label>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary form-submit"
                    disabled={status.state === 'sending'}
                  >
                    <span>{status.state === 'sending' ? 'Sending...' : 'Send Message'}</span>
                    <Icon name="send" size={16} />
                  </button>

                  <a
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`}
                    className="btn btn-ghost btn-sm"
                  >
                    <span>Or Send via Email</span>
                    <Icon name="mail" size={15} />
                  </a>
                </div>

                {status.note && (
                  <p className="form-status" role="status">
                    {status.note}
                  </p>
                )}
              </form>
            </TiltCard>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-top">
            <a
              href="#home"
              className="brand"
              onClick={(e) => {
                e.preventDefault()
                onNavigate('home')
              }}
            >
              <span className="brand-star">✦</span>
              <span className="brand-text">{profile.shortName}</span>
              <span className="brand-dot">.</span>
            </a>

            <div className="footer-nav">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigate(link.id)
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              className="back-top-btn"
              aria-label="Scroll back to top"
              onClick={() => onNavigate('home')}
            >
              <Icon name="up" size={18} />
            </button>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
            <span>Built with React, Vite & Three.js</span>
          </div>
        </footer>
      </div>
    </section>
  )
}
