import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { FINAL_STEP, STEP_PROGRESS } from './demoSequence'

const W = 450, H = 925
const BUBBLES = [
  { at: 1, lines: ['Hi Alex! 👋'], h: 92 },
  { at: 3, lines: ['We have something special', 'for you.'], h: 118 },
  { at: 4, lines: ['Discover our latest offers', 'today!'], h: 118 },
]
const ease = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3)

function rr(g, x, y, w, h, r, fill) {
  g.beginPath(); g.roundRect(x, y, w, h, r); g.fillStyle = fill; g.fill()
}
function check(g, x, y, color, double) {
  g.strokeStyle = color; g.lineWidth = 3; g.lineCap = 'round'; g.lineJoin = 'round'
  const one = (dx) => { g.beginPath(); g.moveTo(x + dx, y); g.lineTo(x + dx + 6, y + 6); g.lineTo(x + dx + 16, y - 7); g.stroke() }
  one(0); if (double) one(9)
}

// Draws the simulated messaging UI. `enter[i]` is when bubble i appeared (ms) and `now` is the clock.
function draw(g, { step, enter, now, progress, doneAt }) {
  g.clearRect(0, 0, W, H)
  rr(g, 0, 0, W, H, 54, '#06150d')
  // header
  rr(g, 0, 0, W, 170, [54, 54, 0, 0], '#0c2a1b')
  rr(g, 150, 22, 150, 38, 19, '#000')
  rr(g, 28, 96, 54, 54, 14, '#16a34a')
  g.fillStyle = '#fff'; g.beginPath(); g.roundRect(40, 108, 30, 22, 6); g.fill()
  g.fillStyle = '#16a34a'; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(48 + i * 7, 119, 2.4, 0, 7); g.fill() }
  g.fillStyle = '#fff'; g.font = '700 30px Inter, system-ui, sans-serif'; g.fillText('PingReach', 98, 120)
  g.fillStyle = '#6ee7b7'; g.font = '19px Inter, system-ui, sans-serif'; g.fillText('Campaign · simulated demo', 98, 146)
  g.fillStyle = 'rgba(209,250,229,0.6)'; g.font = '20px Inter, system-ui, sans-serif'; g.fillText('To: Alex · sample contact', 28, 208)
  // bubbles
  let y = 232
  BUBBLES.forEach((b, i) => {
    if (step >= b.at && enter[i] != null) {
      const t = ease((now - enter[i]) / 350)
      g.save(); g.globalAlpha = t; g.translate(0, (1 - t) * 14)
      const w = 340, x = W - 28 - w
      rr(g, x, y, w, b.h, [22, 22, 6, 22], '#16a34a')
      g.fillStyle = '#fff'; g.font = '24px Inter, system-ui, sans-serif'
      b.lines.forEach((l, k) => g.fillText(l, x + 20, y + 38 + k * 30))
      const by = y + b.h - 18
      if (i === 0 && step < 2) {
        g.fillStyle = 'rgba(255,255,255,0.8)'; g.font = '17px Inter, system-ui, sans-serif'; g.fillText('Sending…', x + w - 100, by)
      } else {
        const tt = ease((now - (enter[i] + (i === 0 ? 0 : 150))) / 500)
        g.globalAlpha = t * tt
        if (i === 0) { g.fillStyle = 'rgba(255,255,255,0.85)'; g.font = '17px Inter, system-ui, sans-serif'; g.fillText('Sent', x + w - 96, by) }
        check(g, x + w - 48, by - 4, '#bef264', true)
      }
      g.restore()
      y += b.h + 16
    }
  })
  if (step === 1) {
    rr(g, 28, y, 84, 46, 22, '#12301f')
    for (let i = 0; i < 3; i++) {
      g.fillStyle = `rgba(110,231,183,${0.35 + 0.65 * Math.abs(Math.sin(now / 280 - i * 0.6))})`
      g.beginPath(); g.arc(52 + i * 20, y + 23, 5, 0, 7); g.fill()
    }
  }
  // progress card
  rr(g, 24, H - 150, W - 48, 112, 24, 'rgba(255,255,255,0.06)')
  g.strokeStyle = 'rgba(255,255,255,0.12)'; g.lineWidth = 9; g.beginPath(); g.arc(88, H - 94, 30, 0, Math.PI * 2); g.stroke()
  g.strokeStyle = '#6ee7b7'; g.lineCap = 'round'; g.beginPath(); g.arc(88, H - 94, 30, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * progress) / 100); g.stroke()
  g.fillStyle = 'rgba(209,250,229,0.6)'; g.font = '18px Inter, system-ui, sans-serif'; g.fillText('Campaign progress (simulated)', 140, H - 104)
  g.fillStyle = '#fff'; g.font = '700 26px Inter, system-ui, sans-serif'
  g.fillText(step >= FINAL_STEP ? 'Campaign completed ✓' : `${Math.round(progress)}%`, 140, H - 70)
  // success glow
  if (doneAt != null) {
    const t = (now - doneAt) / 1600
    if (t >= 0 && t < 1) {
      const gr = g.createRadialGradient(W / 2, H - 100, 10, W / 2, H - 100, 380)
      gr.addColorStop(0, `rgba(110,231,183,${0.3 * Math.sin(Math.PI * t)})`); gr.addColorStop(1, 'rgba(110,231,183,0)')
      g.fillStyle = gr; g.fillRect(0, 0, W, H)
    }
  }
}

// Procedural phone: metallic frame, glass screen showing the simulated messaging UI (canvas texture),
// camera island and side buttons. Entrance, float and pointer tilt are driven from useFrame.
export default function FloatingPhone({ reduce, step }) {
  const group = useRef()
  const born = useRef(null)
  const texRef = useRef(null)
  const live = useRef({ step: 0, enter: [null, null, null], progress: 0, doneAt: null, dirty: true, last: 0 })
  const { canvas, tex } = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = W; c.height = H
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return { canvas: c, tex: t }
  }, [])
  useEffect(() => {
    texRef.current = tex
    return () => tex.dispose()
  }, [tex])

  // Record when each step begins so the canvas can animate bubbles in.
  useEffect(() => {
    const L = live.current
    const now = performance.now()
    L.step = step
    BUBBLES.forEach((b, i) => {
      if (step >= b.at) { if (L.enter[i] == null) L.enter[i] = reduce ? now - 2000 : now } else L.enter[i] = null
    })
    L.doneAt = step === FINAL_STEP && !reduce ? now : null
    L.dirty = true
  }, [step, reduce])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    if (born.current === null) born.current = t
    const p = reduce ? 1 : THREE.MathUtils.clamp((t - born.current - 0.2) / 1.4, 0, 1)
    const e = 1 - Math.pow(1 - p, 3)
    const px = reduce ? 0 : state.pointer.x
    const py = reduce ? 0 : state.pointer.y
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.04 - py * 0.12, 3, dt)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.28 + (reduce ? 0 : Math.sin(t * 0.35) * 0.12) + px * 0.2 + (1 - e) * 0.9, 4, dt)
    g.position.y = -(1 - e) * 1.2 + (reduce ? 0 : Math.sin(t * 0.8) * 0.07)
    g.scale.setScalar(0.88 + 0.12 * e)

    // Redraw the screen only while something is animating (or when a step just changed).
    const L = live.current
    const target = STEP_PROGRESS[L.step]
    const next = reduce ? target : THREE.MathUtils.damp(L.progress, target, 3, dt)
    const moving = Math.abs(next - L.progress) > 0.05
    L.progress = moving ? next : target
    const now = performance.now()
    const animating = L.dirty || moving || L.step === 1 || now - L.last < 700 || (L.doneAt != null && now - L.doneAt < 1700)
    if (animating && now - L.last > 33) {
      draw(canvas.getContext('2d'), { step: L.step, enter: L.enter, now, progress: L.progress, doneAt: L.doneAt })
      if (texRef.current) texRef.current.needsUpdate = true
      L.last = now
      L.dirty = false
    }
  })

  return (
    <group ref={group}>
      <RoundedBox args={[1.6, 3.2, 0.18]} radius={0.24} smoothness={6}>
        <meshStandardMaterial color="#1a2b23" metalness={0.95} roughness={0.22} emissive="#10b981" emissiveIntensity={0.18} />
      </RoundedBox>
      <mesh position={[0, 0, 0.095]}>
        <planeGeometry args={[1.5, 3.08]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} />
      </mesh>
      {/* glass sheen */}
      <mesh position={[0, 0, 0.098]}>
        <planeGeometry args={[1.5, 3.08]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.06} roughness={0.05} clearcoat={1} depthWrite={false} />
      </mesh>
      <mesh position={[0.81, 0.6, 0]}><boxGeometry args={[0.03, 0.5, 0.08]} /><meshStandardMaterial color="#2e4a3c" metalness={1} roughness={0.25} /></mesh>
      <mesh position={[-0.81, 0.8, 0]}><boxGeometry args={[0.03, 0.3, 0.08]} /><meshStandardMaterial color="#2e4a3c" metalness={1} roughness={0.25} /></mesh>
      <mesh position={[-0.81, 0.35, 0]}><boxGeometry args={[0.03, 0.3, 0.08]} /><meshStandardMaterial color="#2e4a3c" metalness={1} roughness={0.25} /></mesh>
    </group>
  )
}
