import { useState, useEffect, useRef } from 'react'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.45
    audio.loop = true

    // Attempt auto-play on first user interaction anywhere on the page
    const handleFirstInteraction = () => {
      if (!userInteracted && audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true)
            setUserInteracted(true)
          })
          .catch(() => {
            // Browser policy prevented autoplay
          })
      }
    }

    window.addEventListener('click', handleFirstInteraction, { once: true })
    window.addEventListener('touchstart', handleFirstInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [userInteracted])

  const togglePlay = (e) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return

    setUserInteracted(true)
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback error:', err))
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/bgm.mp3" preload="metadata" />

      <button
        type="button"
        className={`audio-btn ${isPlaying ? 'is-playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Mute background sound' : 'Play background sound'}
        title={isPlaying ? 'Pause Sound' : 'Play Sound'}
      >
        <span className="audio-wave">
          <span className="wave-bar bar-1" />
          <span className="wave-bar bar-2" />
          <span className="wave-bar bar-3" />
          <span className="wave-bar bar-4" />
        </span>
        <span className="audio-label">{isPlaying ? 'SOUND ON' : 'SOUND OFF'}</span>
      </button>
    </>
  )
}
