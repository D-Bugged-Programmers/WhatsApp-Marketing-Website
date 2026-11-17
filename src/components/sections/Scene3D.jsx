import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import FloatingPhone from './FloatingPhone'

function radialTexture(rgb, alpha) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  gr.addColorStop(0, `rgba(${rgb},${alpha})`)
  gr.addColorStop(1, `rgba(${rgb},0)`)
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

function Particles({ count, reduce }) {
  const ref = useRef()
  const positions = useMemo(() => {
    // Seeded PRNG keeps render pure and the layout stable between loads.
    let seed = 1234567
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (rnd() - 0.5) * 6
      a[i * 3 + 1] = (rnd() - 0.5) * 5.5
      a[i * 3 + 2] = (rnd() - 0.5) * 3 - 0.8
    }
    return a
  }, [count])
  useFrame((_, dt) => { if (!reduce && ref.current) ref.current.rotation.y += dt * 0.03 })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#6ee7b7" size={0.035} sizeAttenuation transparent opacity={0.65} depthWrite={false} />
    </points>
  )
}

// Soft glowing disc beneath the phone, with a gently pulsing ring.
export function Platform({ reduce }) {
  const glow = useMemo(() => radialTexture('52,211,153', 0.8), [])
  const ring = useRef()
  useEffect(() => () => glow.dispose(), [glow])
  useFrame((state) => {
    if (reduce || !ring.current) return
    ring.current.material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 1.6) * 0.25
  })
  return (
    <group position={[0, -1.85, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 3.6]} />
        <meshBasicMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[1.35, 1.45, 0.1, 64]} />
        <meshStandardMaterial color="#0b2318" metalness={0.9} roughness={0.3} emissive="#052e1b" emissiveIntensity={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[1.0, 1.06, 64]} />
        <meshBasicMaterial color="#34d399" toneMapped={false} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[1.25, 1.3, 64]} />
        <meshBasicMaterial color="#a7f3d0" transparent opacity={0.6} toneMapped={false} />
      </mesh>
    </group>
  )
}

// Scales the composition to the available viewport.
function Rig({ children }) {
  const { viewport } = useThree()
  const s = Math.min(1.5, viewport.width / 3.3, viewport.height / 4.7)
  return <group scale={s} position={[0, 0.15, 0]}>{children}</group>
}

// In reduced-motion mode the canvas only renders on demand, so request a few frames
// while layout settles.
function SettleFrames() {
  const invalidate = useThree((st) => st.invalidate)
  useEffect(() => {
    const ids = [0, 100, 400, 1200].map((ms) => setTimeout(invalidate, ms))
    return () => ids.forEach(clearTimeout)
  }, [invalidate])
  return null
}

export default function Scene3D({ active, reduce, step }) {
  return (
    <Canvas
      frameloop={reduce ? 'demand' : active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'pan-y' }}
    >
      <SettleFrames />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <pointLight position={[-3, -1, 3]} intensity={28} color="#34d399" />
      <pointLight position={[3, 2, -2]} intensity={18} color="#a7f3d0" />
      <Rig>
        <FloatingPhone reduce={reduce} step={step} />
        <Platform reduce={reduce} />
        <Particles count={70} reduce={reduce} />
      </Rig>
    </Canvas>
  )
}
