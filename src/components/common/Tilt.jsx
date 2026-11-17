import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

// Perspective tilt that follows the pointer. `base` is the resting [rotateX, rotateY] in degrees.
export default function Tilt({ children, max = 8, base = [0, 0], className = '' }) {
  const reduce = useReducedMotion()
  const rx = useMotionValue(base[0])
  const ry = useMotionValue(base[1])
  const sx = useSpring(rx, { stiffness: 120, damping: 18 })
  const sy = useSpring(ry, { stiffness: 120, damping: 18 })

  const onMove = (e) => {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(base[1] + px * 2 * max)
    rx.set(base[0] - py * 2 * max)
  }
  const onLeave = () => { rx.set(base[0]); ry.set(base[1]) }

  return (
    <div className={className} style={{ perspective: 1400 }} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d' }}>{children}</motion.div>
    </div>
  )
}
