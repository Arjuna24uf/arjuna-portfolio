import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let frame
    const start = performance.now()
    const duration = 900

    const tick = (now) => {
      const p = Math.min(100, Math.round(((now - start) / duration) * 100))
      setProgress(p)
      if (p < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setVisible(false)
          if (onFinish) onFinish()
        }, 180)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onFinish])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="preloader-inner">
            <div className="preloader-crest">
              <span className="crest-star">✦</span>
              <span className="crest-brand">ARJUNA</span>
              <span className="crest-dot">.</span>
            </div>
            <p className="preloader-sub">Dream Bigger. Build Better.</p>
            <div className="preloader-bar">
              <div className="preloader-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="preloader-meta">
              <span>MMXXVI • PORTFOLIO</span>
              <span className="preloader-num">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
