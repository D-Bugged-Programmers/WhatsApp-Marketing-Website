import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { Platform } from '../sections/Scene3D'

import { T, pToT } from './timeline'

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3)
const easeInOut = (x) => { const c = clamp(x); return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2 }
const lerp = THREE.MathUtils.lerp

// Seeded PRNG: stable layouts, pure render.
function prng(seed) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}
function sphereDir(rnd, zBias = 0.5) {
  const u = rnd() * 2 - 1, a = rnd() * Math.PI * 2, r = Math.sqrt(1 - u * u)
  return new THREE.Vector3(r * Math.cos(a), u * 0.8, (rnd() - 0.5 + zBias) * 0.9).normalize()
}

// ---------- phone screen (canvas texture, drawn from time) ----------
const W = 450, H = 925
function rr(g, x, y, w, h, r, fill) { g.beginPath(); g.roundRect(x, y, w, h, r); g.fillStyle = fill; g.fill() }
const font = (px, weight = 400) => `${weight} ${px}px Inter, system-ui, sans-serif`

function drawBrand(g, a) {
  g.save(); g.globalAlpha = a
  const grd = g.createRadialGradient(W / 2, 400, 10, W / 2, 400, 260)
  grd.addColorStop(0, 'rgba(52,211,153,0.35)'); grd.addColorStop(1, 'rgba(52,211,153,0)')
  g.fillStyle = grd; g.fillRect(0, 150, W, 500)
  rr(g, W / 2 - 52, 340, 104, 104, 28, '#16a34a')
  rr(g, W / 2 - 30, 366, 60, 44, 12, '#fff')
  g.fillStyle = '#16a34a'; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(W / 2 - 14 + i * 14, 388, 4.5, 0, 7); g.fill() }
  g.fillStyle = '#fff'; g.font = font(44, 800); g.textAlign = 'center'; g.fillText('PingReach', W / 2, 500)
  g.fillStyle = '#6ee7b7'; g.font = font(20); g.fillText('Reach Thousands. One Message at a Time.', W / 2, 534)
  g.restore(); g.textAlign = 'left'
}

function drawInterface(g, t, a) {
  g.save(); g.globalAlpha = a
  rr(g, 0, 0, W, 170, [54, 54, 0, 0], '#0c2a1b')
  rr(g, 28, 96, 54, 54, 14, '#16a34a')
  g.fillStyle = '#fff'; g.font = font(30, 700); g.fillText('PingReach', 98, 120)
  g.fillStyle = '#6ee7b7'; g.font = font(19); g.fillText('Campaign · simulated demo', 98, 146)
  g.fillStyle = '#fff'; g.font = font(22, 600); g.fillText('Spring Update (sample)', 28, 212)
  // recipient avatars
  const cols = ['#34d399', '#bef264', '#2dd4bf', '#16a34a', '#86efac']
  cols.forEach((c, i) => { g.beginPath(); g.arc(48 + i * 34, 252, 16, 0, 7); g.fillStyle = c; g.fill(); g.strokeStyle = '#06150d'; g.lineWidth = 3; g.stroke() })
  g.fillStyle = 'rgba(209,250,229,0.6)'; g.font = font(17); g.fillText('Sample recipients', 236, 258)
  // message bubbles
  const msgs = [[1.9, ['Hi there! 👋'], 74], [2.3, ['We have something special', 'for you.'], 108], [2.7, ['Discover our latest update', 'today!'], 108]]
  let y = 296
  msgs.forEach(([at, lines, h]) => {
    const p = easeOut((t - at) / 0.4)
    if (p > 0) {
      g.save(); g.globalAlpha = a * p; g.translate(0, (1 - p) * 16)
      rr(g, 62, y, 360, h, [22, 22, 6, 22], '#16a34a')
      g.fillStyle = '#fff'; g.font = font(23)
      lines.forEach((l, k) => g.fillText(l, 82, y + 38 + k * 30))
      if (t > at + 0.9) { g.strokeStyle = '#bef264'; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.moveTo(382, y + h - 22); g.lineTo(388, y + h - 16); g.lineTo(399, y + h - 29); g.stroke() }
      g.restore(); y += h + 14
    }
  })
  if (t > 2.2 && t < 3.1) {
    g.fillStyle = 'rgba(209,250,229,0.8)'; g.font = font(18); g.fillText('Sending…', 28, y + 20)
  }
  // progress bar
  const prog = easeInOut((t - 2.0) / 2.3)
  rr(g, 28, H - 140, W - 56, 12, 6, 'rgba(255,255,255,0.12)')
  rr(g, 28, H - 140, Math.max(12, (W - 56) * prog), 12, 6, '#6ee7b7')
  g.fillStyle = 'rgba(209,250,229,0.6)'; g.font = font(17); g.fillText('Campaign progress (simulated)', 28, H - 100)
  if (t >= T.blast - 0.2) {
    const s = easeOut((t - (T.blast - 0.2)) / 0.4)
    g.save(); g.globalAlpha = s; g.translate(W / 2, H - 52); g.scale(0.9 + 0.1 * s, 0.9 + 0.1 * s)
    g.fillStyle = '#bef264'; g.font = font(34, 800); g.textAlign = 'center'; g.fillText('Campaign Sent! ✓', 0, 0); g.restore()
  } else {
    g.fillStyle = '#fff'; g.font = font(26, 700); g.fillText(`${Math.round(prog * 100)}%`, 28, H - 56)
  }
  g.restore()
}

function drawScreen(g, t) {
  g.clearRect(0, 0, W, H)
  rr(g, 0, 0, W, H, 54, '#06150d')
  rr(g, 150, 22, 150, 38, 19, '#000')
  const toInterface = easeOut((t - T.reveal) / 0.5)
  if (toInterface < 1) drawBrand(g, 1 - toInterface)
  if (toInterface > 0) drawInterface(g, t, toInterface)
}

// ---------- scene pieces ----------
// Everything below is a pure function of `clock.current` (scene time), which Driver derives from
// scroll progress, so scrolling up reverses the sequence and scrolling down replays it.

function Driver({ progress, clock }) {
  useFrame((_, dt) => {
    const target = pToT(progress.get())
    const diff = target - clock.current
    // Light smoothing so wheel notches don't look steppy; converges exactly to the scroll position.
    clock.current = Math.abs(diff) < 0.0008 ? target : clock.current + diff * (1 - Math.exp(-dt * 9))
  })
  return null
}

function CameraRig({ clock }) {
  useFrame((state) => {
    const t = clock.current
    const a = easeInOut(t / 1.4)
    const k = easeInOut((t - T.trans) / (T.end - T.trans))
    const z = lerp(lerp(7.2, 6.5, a), 7.2, k)
    // Portrait screens: pull the camera back so the whole phone and burst stay in frame.
    const fit = Math.max(1, 0.75 / (state.size.width / state.size.height))
    state.camera.position.set(0, 0.1, z * fit)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

function Phone({ clock, layout, origin }) {
  const group = useRef()
  const frame = useRef()
  const glow = useRef()
  const texRef = useRef(null)
  const lastDraw = useRef({ ms: 0, t: -1 })
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

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = clock.current
    const L = layout.current
    const cam = state.camera
    const halfH = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.position.z
    const halfW = halfH * state.size.width / state.size.height
    const a = easeInOut(t / 1.4)
    const u = clamp((t - T.blast) / 1.2)
    const k = easeInOut((t - T.trans) / (T.end - T.trans))
    const nx = lerp(lerp(L.nx0, L.nxC, a), L.nx1, k)
    const ny = lerp(lerp(L.ny0, L.nyC, a), L.ny1, k)
    const sc = lerp(lerp(L.s0, L.sC, a), L.s1, k) + Math.sin(Math.PI * u) * 0.06
    const sway = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 // ambient float, independent of the sequence
    const bob = Math.sin(state.clock.elapsedTime * 0.8) * 0.06
    const rotY = lerp(lerp(-0.42, -0.12, a), -0.3, k) + sway + Math.sin(Math.PI * u) * 0.9
    g.rotation.set(0.04, rotY, 0)
    g.position.set(nx * halfW, ny * halfH + bob, 0)
    g.scale.setScalar(sc)
    origin.current = { x: nx * halfW, y: ny * halfH, baseY: ny * halfH, s: sc }
    const spike = t >= T.blast ? Math.exp(-(t - T.blast) * 3) : 0
    if (frame.current) frame.current.emissiveIntensity = 0.18 + spike * 1.4
    if (glow.current) glow.current.intensity = 12 + spike * 90

    // Redraw the screen only when scene time has moved.
    const ld = lastDraw.current
    const ms = performance.now()
    if (t !== ld.t && ms - ld.ms > 33) {
      drawScreen(canvas.getContext('2d'), t)
      if (texRef.current) texRef.current.needsUpdate = true
      ld.ms = ms; ld.t = t
    }
  })

  return (
    <group ref={group}>
      <pointLight ref={glow} position={[0, 0, 2]} color="#34d399" distance={8} />
      <RoundedBox args={[1.6, 3.2, 0.18]} radius={0.24} smoothness={6}>
        <meshStandardMaterial ref={frame} color="#1a2b23" metalness={0.95} roughness={0.2} emissive="#10b981" emissiveIntensity={0.18} />
      </RoundedBox>
      <mesh position={[0, 0, 0.095]}>
        <planeGeometry args={[1.5, 3.08]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.098]}>
        <planeGeometry args={[1.5, 3.08]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.07} roughness={0.05} clearcoat={1} depthWrite={false} />
      </mesh>
      <mesh position={[0.81, 0.6, 0]}><boxGeometry args={[0.03, 0.5, 0.08]} /><meshStandardMaterial color="#2e4a3c" metalness={1} roughness={0.25} /></mesh>
      <mesh position={[-0.81, 0.8, 0]}><boxGeometry args={[0.03, 0.3, 0.08]} /><meshStandardMaterial color="#2e4a3c" metalness={1} roughness={0.25} /></mesh>
    </group>
  )
}

// Chat-bubble silhouette: rounded rectangle with a small tail, extruded with a soft bevel.
function makeBubbleGeometry() {
  const w = 1, h = 0.64, r = 0.18
  const sh = new THREE.Shape()
  sh.moveTo(-w / 2 + r, -h / 2)
  sh.lineTo(-w / 2 - 0.02, -h / 2 - 0.18) // tail tip
  sh.lineTo(-w / 2 + 0.3, -h / 2)
  sh.lineTo(w / 2 - r, -h / 2)
  sh.absarc(w / 2 - r, -h / 2 + r, r, -Math.PI / 2, 0)
  sh.lineTo(w / 2, h / 2 - r)
  sh.absarc(w / 2 - r, h / 2 - r, r, 0, Math.PI / 2)
  sh.lineTo(-w / 2 + r, h / 2)
  sh.absarc(-w / 2 + r, h / 2 - r, r, Math.PI / 2, Math.PI)
  sh.lineTo(-w / 2, -h / 2 + r)
  sh.absarc(-w / 2 + r, -h / 2 + r, r, Math.PI, Math.PI * 1.5)
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 3, curveSegments: 10 })
  g.center()
  return g
}

const BUBBLE_COLORS = ['#16a34a', '#22c55e', '#34d399', '#bef264', '#10b981', '#6ee7b7']

// One InstancedMesh draws every message bubble: a few "sending" bubbles first, then the blast.
function Bubbles({ clock, origin, mobile }) {
  const mesh = useRef()
  const checks = useRef()
  const SEND = 14
  const BLAST = mobile ? 40 : 72
  const N = SEND + BLAST
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const data = useMemo(() => {
    const rnd = prng(777)
    return Array.from({ length: N }, (_, i) => {
      const send = i < SEND
      const dir = sphereDir(rnd, send ? 0.9 : 0.4)
      if (send) { dir.x = (i % 2 ? 1 : -1) * (0.5 + rnd() * 0.8); dir.y = (rnd() - 0.4) * 1.2; dir.z = 0.3 + rnd() * 0.5; dir.normalize() }
      return {
        send, dir,
        ts: send ? T.send + i * 0.12 : T.blast + rnd() * 0.16,
        speed: send ? 1.3 + rnd() * 1.1 : 2.6 + rnd() * 4.2,
        life: send ? 1.9 : T.end - T.blast - 0.35,
        size: send ? 0.2 + rnd() * 0.12 : 0.12 + rnd() * 0.2,
        spin: (rnd() - 0.5) * 3, tilt: rnd() * 6,
      }
    })
  }, [N])
  const bubbleGeo = useMemo(() => makeBubbleGeometry(), [])
  useEffect(() => () => bubbleGeo.dispose(), [bubbleGeo])
  const checkTex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const g = c.getContext('2d')
    g.beginPath(); g.arc(32, 32, 28, 0, 7); g.fillStyle = '#bef264'; g.fill()
    g.strokeStyle = '#064e3b'; g.lineWidth = 7; g.lineCap = 'round'; g.lineJoin = 'round'
    g.beginPath(); g.moveTo(19, 33); g.lineTo(28, 42); g.lineTo(46, 22); g.stroke()
    return new THREE.CanvasTexture(c)
  }, [])
  useEffect(() => () => checkTex.dispose(), [checkTex])
  useEffect(() => {
    const col = new THREE.Color()
    data.forEach((d, i) => mesh.current.setColorAt(i, col.set(BUBBLE_COLORS[i % BUBBLE_COLORS.length])))
    mesh.current.instanceColor.needsUpdate = true
  }, [data])

  const pos = useMemo(() => new THREE.Vector3(), [])
  useFrame((state) => {
    const t = clock.current
    // Bubbles radiate from wherever the phone currently is.
    const ox = origin.current.x, oy = origin.current.y
    data.forEach((d, i) => {
      const age = t - d.ts
      if (age < 0 || age > d.life) {
        dummy.scale.setScalar(0); dummy.updateMatrix(); mesh.current.setMatrixAt(i, dummy.matrix)
        if (d.send && i % 2 === 0 && checks.current) checks.current.setMatrixAt(i / 2, dummy.matrix)
        return
      }
      const dist = d.send ? d.speed * easeOut(age / 1.6) : d.speed * (1 - Math.exp(-3 * age)) * 0.9 + d.speed * 0.12 * age
      pos.copy(d.dir).multiplyScalar(dist)
      pos.x += ox; pos.y += oy; pos.z += 0.5
      const pop = easeOut(age / 0.18)
      const fade = d.send ? 1 - easeOut((age - (d.life - 0.5)) / 0.5) : 1 - easeOut((age - (d.life - 0.8)) / 0.8)
      const s = d.size * pop * Math.max(0, fade)
      dummy.position.copy(pos)
      dummy.rotation.set(Math.sin(age * 2 + d.tilt) * 0.4, Math.cos(age * 1.6 + d.tilt) * 0.5, Math.sin(d.tilt) * 0.5 + age * d.spin * 0.15)
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
      // small green check on every other "sending" bubble
      if (d.send && i % 2 === 0 && checks.current) {
        const ci = i / 2
        const cs = age > 0.7 ? easeOut((age - 0.7) / 0.25) * Math.max(0, fade) * 0.17 : 0
        dummy.position.set(pos.x + s * 0.9, pos.y - s * 0.6, pos.z + 0.08)
        dummy.rotation.set(0, 0, 0)
        dummy.scale.setScalar(cs)
        dummy.updateMatrix()
        checks.current.setMatrixAt(ci, dummy.matrix)
      }
    })
    mesh.current.instanceMatrix.needsUpdate = true
    if (checks.current) checks.current.instanceMatrix.needsUpdate = true
  })
  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, N]} frustumCulled={false}>
        <primitive object={bubbleGeo} attach="geometry" />
        <meshStandardMaterial roughness={0.25} metalness={0.1} emissive="#10b981" emissiveIntensity={0.5} />
      </instancedMesh>
      <instancedMesh ref={checks} args={[undefined, undefined, SEND / 2]} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={checkTex} transparent toneMapped={false} />
      </instancedMesh>
    </>
  )
}

// Glowing fragments + radial light streaks, both instanced.
function BlastFX({ clock, origin, mobile }) {
  const frags = useRef()
  const streaks = useRef()
  const NF = mobile ? 50 : 120
  const NS = mobile ? 20 : 44
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const fd = useMemo(() => {
    const rnd = prng(4242)
    return Array.from({ length: NF }, () => ({ dir: sphereDir(rnd, 0.3), speed: 2 + rnd() * 6, size: 0.015 + rnd() * 0.03, life: 1.2 + rnd() * 1.4, ts: T.blast + rnd() * 0.1 }))
  }, [NF])
  const sd = useMemo(() => {
    const rnd = prng(99)
    return Array.from({ length: NS }, () => { const a = rnd() * Math.PI * 2; return { dir: new THREE.Vector3(Math.cos(a), Math.sin(a) * 0.8, (rnd() - 0.3) * 0.4).normalize(), r0: 0.5 + rnd() * 0.4, r1: 4 + rnd() * 5, len: 0.8 + rnd() * 1.6, ts: T.blast + rnd() * 0.15 } })
  }, [NS])
  const q = useMemo(() => new THREE.Quaternion(), [])
  const zAxis = useMemo(() => new THREE.Vector3(0, 0, 1), [])
  useFrame(() => {
    const t = clock.current
    const ox = origin.current.x, oy = origin.current.y
    fd.forEach((d, i) => {
      const age = t - d.ts
      if (age < 0 || age > d.life) { dummy.scale.setScalar(0) } else {
        const dist = d.speed * (1 - Math.exp(-2.5 * age))
        dummy.position.set(d.dir.x * dist + ox, d.dir.y * dist + oy, d.dir.z * dist + 0.5)
        dummy.rotation.set(age * 4, age * 3, 0)
        dummy.scale.setScalar(d.size * (1 - easeOut((age - d.life * 0.6) / (d.life * 0.4))))
      }
      dummy.updateMatrix(); frags.current.setMatrixAt(i, dummy.matrix)
    })
    sd.forEach((d, i) => {
      const age = t - d.ts
      if (age < 0 || age > 0.9) { dummy.scale.setScalar(0) } else {
        const p = easeOut(age / 0.9)
        const head = lerp(d.r0, d.r1, p), tail = Math.max(d.r0, head - d.len * (1 - p * 0.5))
        const mid = (head + tail) / 2
        dummy.position.set(d.dir.x * mid + ox, d.dir.y * mid + oy, d.dir.z * mid + 0.5)
        q.setFromUnitVectors(zAxis, d.dir); dummy.quaternion.copy(q)
        dummy.scale.set(1, 1, Math.max(0.001, (head - tail) * (1 - p)))
      }
      dummy.updateMatrix(); streaks.current.setMatrixAt(i, dummy.matrix)
      dummy.quaternion.identity()
    })
    frags.current.instanceMatrix.needsUpdate = true
    streaks.current.instanceMatrix.needsUpdate = true
  })
  return (
    <>
      <instancedMesh ref={frags} args={[undefined, undefined, NF]} frustumCulled={false}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#d9f99d" toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={streaks} args={[undefined, undefined, NS]} frustumCulled={false}>
        <boxGeometry args={[0.018, 0.018, 1]} />
        <meshBasicMaterial color="#6ee7b7" toneMapped={false} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </instancedMesh>
    </>
  )
}

// Shockwave rings and the central flash (capped opacity, short).
function Shockwave({ clock, origin }) {
  const rings = useRef([])
  const flash = useRef()
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const g = c.getContext('2d')
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64)
    gr.addColorStop(0, 'rgba(220,255,240,1)'); gr.addColorStop(0.4, 'rgba(52,211,153,0.5)'); gr.addColorStop(1, 'rgba(52,211,153,0)')
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128)
    return new THREE.CanvasTexture(c)
  }, [])
  useEffect(() => () => tex.dispose(), [tex])
  const root = useRef()
  useFrame(() => {
    const t = clock.current
    root.current.position.set(origin.current.x, origin.current.y, 0.4)
    rings.current.forEach((m, i) => {
      const age = t - (T.blast + i * 0.14)
      if (!m) return
      if (age < 0 || age > 1.1) { m.visible = false; return }
      m.visible = true
      m.scale.setScalar(0.4 + easeOut(age / 1.1) * 6.5)
      m.material.opacity = 0.7 * (1 - age / 1.1)
    })
    const fa = t - T.blast
    flash.current.visible = fa >= 0 && fa < 0.7
    if (flash.current.visible) {
      flash.current.scale.setScalar(2 + fa * 6)
      flash.current.material.opacity = 0.7 * Math.exp(-fa * 7)
    }
  })
  return (
    <group ref={root}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(m) => { rings.current[i] = m }} visible={false}>
          <ringGeometry args={[0.92, 1, 64]} />
          <meshBasicMaterial color={i === 1 ? '#bef264' : '#34d399'} transparent opacity={0} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh ref={flash} visible={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={tex} transparent opacity={0} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}

// Slow vertical green light trails in the background.
function Trails({ mobile }) {
  const mesh = useRef()
  const N = mobile ? 8 : 16
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const d = useMemo(() => { const r = prng(31); return Array.from({ length: N }, () => ({ x: (r() - 0.5) * 9, z: -1 - r() * 3, o: r() * 8, sp: 0.5 + r() * 0.9, h: 0.8 + r() * 1.6 })) }, [N])
  useFrame((state) => {
    const t = state.clock.elapsedTime
    d.forEach((a, i) => {
      dummy.position.set(a.x, ((a.o + t * a.sp) % 8) - 4, a.z)
      dummy.scale.set(1, a.h, 1)
      dummy.updateMatrix(); mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, N]} frustumCulled={false}>
      <boxGeometry args={[0.012, 1, 0.012]} />
      <meshBasicMaterial color="#34d399" transparent opacity={0.28} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  )
}

// Glowing platform follows the phone and scales with it.
function PlatformFx({ origin }) {
  const g = useRef()
  useFrame(() => {
    const o = origin.current
    if (!g.current || !o) return
    g.current.position.set(o.x, o.baseY, 0)
    g.current.scale.setScalar(Math.max(0.001, o.s))
  })
  return <group ref={g}><Platform reduce={false} /></group>
}

export default function ScrollScene({ progress, layout, active, mobile }) {
  const clock = useRef(0)
  const origin = useRef({ x: 0, y: 0, baseY: 0, s: 1 })
  return (
    <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, mobile ? 1.25 : 1.75]} camera={{ position: [0, 0.1, 7.2], fov: 40 }} gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }} style={{ pointerEvents: 'none' }}>
      <Driver progress={progress} clock={clock} />
      <CameraRig clock={clock} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <pointLight position={[-3, -1, 3]} intensity={28} color="#34d399" />
      <pointLight position={[3, 2, -2]} intensity={22} color="#a7f3d0" />
      <Trails mobile={mobile} />
      <Sparkles count={mobile ? 30 : 70} scale={[9, 6, 4]} size={3} speed={0.35} color="#6ee7b7" opacity={0.7} />
      <PlatformFx origin={origin} />
      <Phone clock={clock} layout={layout} origin={origin} />
      <Bubbles clock={clock} origin={origin} mobile={mobile} />
      <BlastFX clock={clock} origin={origin} mobile={mobile} />
      <Shockwave clock={clock} origin={origin} />
    </Canvas>
  )
}
