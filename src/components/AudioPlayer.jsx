import { useState, useEffect, useRef } from 'react'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const lockedByUserRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.45
    audio.loop = true

    const cleanup = () => {
      window.removeEventListener('pointerdown', handleFirstInteraction, true)
      window.removeEventListener('keydown', handleFirstInteraction, true)
    }

    const handleFirstInteraction = (e) => {
      if (lockedByUserRef.current) {
        cleanup()
        return
      }
      // If user tapped the audio toggle button itself, let togglePlay handle it cleanly
      if (e.target && e.target.closest && e.target.closest('.audio-btn')) {
        return
      }
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            lockedByUserRef.current = true
            cleanup()
          })
          .catch(() => {
            // Keep listeners active until a valid user gesture succeeds
          })
      } else {
        cleanup()
      }
    }

    window.addEventListener('pointerdown', handleFirstInteraction, true)
    window.addEventListener('keydown', handleFirstInteraction, true)

    return cleanup
  }, [])

  const togglePlay = (e) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return

    lockedByUserRef.current = true
    if (!audio.paused) {
      audio.pause()
    } else {
      audio.volume = 0.45
      audio.play().catch((err) => console.error('Audio playback failed:', err))
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        preload="auto"
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        className={`audio-btn ${isPlaying ? 'is-playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Mute background sound' : 'Play background sound'}
        title={isPlaying ? 'Pause Sound' : 'Play Sound'}
      >
        <span className="audio-wave" aria-hidden="true">
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
