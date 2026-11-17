import { Suspense, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function RomanStatue({ pointerRef, scrollRef, inspectMode }) {
  const groupRef = useRef()
  const { scene } = useGLTF('/models/patung.glb')

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          const mat = child.material.clone()
          mat.roughness = 0.52
          mat.metalness = 0.08
          mat.envMapIntensity = 1.35
          child.material = mat
        }
      }
    })
    return clone
  }, [scene])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    const px = pointerRef.current.x
    const py = pointerRef.current.y
    const scroll = scrollRef.current || 0

    // In patung.glb, the statue's front (+X after Sketchfab root rotation) faces the camera (+Z)
    // when rotated around Y by -Math.PI / 2 (-1.57 rad).
    // At -1.65 rad (-95 deg), the torso faces slightly toward Arjuna while the sculpted head gazes heroically over his shoulder.
    const frontFacingY = -1.65
    const baseRotY = inspectMode
      ? frontFacingY + t * 0.45 + px * 1.4
      : frontFacingY + Math.sin(t * 0.55) * 0.1 + px * 0.28 - scroll * 0.35
    const baseRotX = inspectMode ? py * 0.35 : 0.04 + Math.cos(t * 0.4) * 0.025 + py * 0.12
    const baseRotZ = inspectMode ? 0 : -0.03

    // Camera at z = 4.0, fov = 36 => visible Y at z = 0 is [-1.30, +1.30], visible X is [-1.24, +1.24].
    // Statue local height is [-0.55, +0.55] (1.10 total).
    // Default mode: scale = 3.9, pos = [0.26, -0.90, 0] puts top of hair at Y = +1.24 (95% height, unclipped)
    // and chest/shoulders at Y = -0.43 to +0.25 directly behind Arjuna's left shoulder.
    // Inspect mode: scale = 2.12, pos = [0, 0.02, 0] fits the entire statue head-to-pedestal inside [-1.15, +1.18].
    const targetX = inspectMode ? 0 : 0.26
    const targetY = (inspectMode ? 0.02 : -0.90) + Math.sin(t * 0.85) * 0.03 - scroll * 0.2
    const targetScale = inspectMode ? 2.12 : 3.9

    const damp = Math.min(1, delta * 5)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, baseRotY, damp)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, baseRotX, damp)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, baseRotZ, damp)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, damp)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, damp)

    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, damp)
    groupRef.current.scale.setScalar(s)
  })

  return (
    <group ref={groupRef} position={[0.26, -0.90, 0]} rotation={[0.04, -1.65, -0.03]} scale={3.9}>
      <primitive object={clonedScene} />
    </group>
  )
}

function RubyShards({ count = 14, pointerRef }) {
  const groupRef = useRef()

  const shards = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      const radius = 1.05 + (i % 3) * 0.32
      const y = ((i % 5) - 2) * 0.44 + Math.sin(i * 2.1) * 0.18
      const z = Math.sin(angle) * radius * 0.55 - 0.25
      const x = Math.cos(angle) * radius
      const scale = 0.055 + (i % 4) * 0.032
      const speed = 0.4 + (i % 5) * 0.18
      const isMarble = i % 4 === 0
      return {
        position: [x, y, z],
        rotation: [i * 0.7, i * 1.1, i * 0.4],
        scale: [scale * 0.72, scale * 1.55, scale * 0.68],
        speed,
        isMarble,
      }
    })
  }, [count])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.07 + pointerRef.current.x * 0.2
    groupRef.current.rotation.x = pointerRef.current.y * 0.1
    groupRef.current.children.forEach((mesh, i) => {
      const s = shards[i]
      if (!s) return
      mesh.rotation.x += delta * s.speed * 0.7
      mesh.rotation.y += delta * s.speed
      mesh.position.y = s.position[1] + Math.sin(t * s.speed + i) * 0.09
    })
  })

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.position} rotation={s.rotation} scale={s.scale}>
          <octahedronGeometry args={[1, 0]} />
          {s.isMarble ? (
            <meshStandardMaterial color="#dfd7cf" roughness={0.5} metalness={0.1} />
          ) : (
            <meshPhysicalMaterial
              color="#e0102f"
              emissive="#6e0514"
              emissiveIntensity={0.7}
              roughness={0.12}
              metalness={0.15}
              clearcoat={1}
              clearcoatRoughness={0.08}
              reflectivity={1}
            />
          )}
        </mesh>
      ))}
    </group>
  )
}

function CrimsonRings({ pointerRef }) {
  const ring1 = useRef()
  const ring2 = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.12
      ring1.current.rotation.x = 1.08 + Math.sin(t * 0.3) * 0.05 + pointerRef.current.y * 0.08
      ring1.current.rotation.y = -0.36 + pointerRef.current.x * 0.12
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.09
      ring2.current.rotation.x = 0.82 + Math.cos(t * 0.25) * 0.05 - pointerRef.current.y * 0.07
      ring2.current.rotation.y = 0.34 - pointerRef.current.x * 0.1
    }
  })

  return (
    <group position={[0.1, 0.08, -0.45]}>
      <mesh ref={ring1}>
        <torusGeometry args={[1.38, 0.005, 16, 120]} />
        <meshBasicMaterial color="#ff2a48" transparent opacity={0.48} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[1.68, 0.0035, 16, 120]} />
        <meshBasicMaterial color="#9b0f1f" transparent opacity={0.34} />
      </mesh>
    </group>
  )
}

function FallbackStatue({ pointerRef }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.3 + pointerRef.current.x * 0.4
    ref.current.rotation.x = pointerRef.current.y * 0.2
  })
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={ref} position={[0.22, 0.1, 0]} scale={[0.75, 1.05, 0.75]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#b8afa8" wireframe />
      </mesh>
    </Float>
  )
}

export default function HeroScene({ isMobile = false, inspectMode = false, onLoaded }) {
  const pointerRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      pointerRef.current.x = x
      pointerRef.current.y = y
    }
    const onTouch = (e) => {
      if (!e.touches || !e.touches[0]) return
      const x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
      const y = (e.touches[0].clientY / window.innerHeight) * 2 - 1
      pointerRef.current.x = x
      pointerRef.current.y = y
    }
    const onScroll = () => {
      scrollRef.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (onLoaded) {
      const timer = setTimeout(() => onLoaded(), 500)
      return () => clearTimeout(timer)
    }
  }, [onLoaded])

  return (
    <div className={`hero-canvas-wrap ${inspectMode ? 'is-inspect' : ''}`} aria-hidden="true">
      <Canvas
        dpr={isMobile ? [1, 1.4] : [1, 2]}
        camera={{ position: [0, 0, 4.0], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.68} color="#f5ebe6" />
        {/* Warm marble key light matching the light direction on Arjuna's face */}
        <directionalLight position={[-2.2, 3.8, 3.5]} intensity={2.7} color="#fff2e8" />
        <directionalLight position={[2.8, 2.2, 2.4]} intensity={1.35} color="#ffe4e8" />
        {/* Dramatic crimson rim lights */}
        <pointLight position={[2.6, 1.4, 1.2]} intensity={16} distance={8} color="#ff1a3c" />
        <pointLight position={[-2.4, -0.8, 1.4]} intensity={11} distance={8} color="#d60d2a" />
        <pointLight position={[0.2, 2.2, -1.8]} intensity={10} distance={8} color="#ff3856" />

        <CrimsonRings pointerRef={pointerRef} />
        <RubyShards count={isMobile ? 9 : 15} pointerRef={pointerRef} />

        <Sparkles
          count={isMobile ? 28 : 55}
          scale={[3.2, 3.2, 2.4]}
          size={isMobile ? 1.8 : 2.2}
          speed={0.45}
          opacity={0.78}
          color="#ff3352"
        />

        <Suspense fallback={<FallbackStatue pointerRef={pointerRef} />}>
          <RomanStatue pointerRef={pointerRef} scrollRef={scrollRef} inspectMode={inspectMode} />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/patung.glb')
