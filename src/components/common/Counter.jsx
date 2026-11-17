import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

export default function Counter({ to, suffix = '', duration = 1.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return undefined
    const controls = animate(0, to, { duration, ease: 'easeOut', onUpdate: (l) => setV(Math.round(l)) })
    return () => controls.stop()
  }, [inView, reduce, to, duration])

  return <span ref={ref} className="tabular-nums">{(reduce ? to : v).toLocaleString()}{suffix}</span>
}
