import { useEffect, useState, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import { navLinks } from './data'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import AudioPlayer from './components/AudioPlayer'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false
  )
  const lenisRef = useRef(null)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Smooth scroll (Lenis)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let raf
    const animate = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Scroll progress bar & active section spy
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-38% 0px -48% 0px', threshold: 0 }
    )

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const handleNavigate = useCallback((id) => {
    const target = document.getElementById(id)
    if (!target) return
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -64 })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <Preloader />
      <CustomCursor />
      <div className="grain" aria-hidden="true" />
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <AudioPlayer />

      <main>
        <Hero isMobile={isMobile} onNavigate={handleNavigate} />
        <About onNavigate={handleNavigate} />
        <Experience />
        <Projects />
        <Skills />
        <Contact onNavigate={handleNavigate} />
      </main>
    </>
  )
}
