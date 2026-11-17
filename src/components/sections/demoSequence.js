import { useEffect, useState } from 'react'

// Simulated campaign demo: a looping step counter shared by the phone screen and floating cards.
// Nothing is ever sent.
export const FINAL_STEP = 5
export const STEP_PROGRESS = [0, 8, 40, 65, 88, 100]
// ms to wait before moving from step i to i+1 (last entry = pause before looping).
const DELAYS = [700, 1300, 1000, 900, 900, 4200]

export function useDemoStep(reduce) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (reduce) return undefined
    let id
    const tick = (s) => {
      id = setTimeout(() => {
        const next = s === FINAL_STEP ? 0 : s + 1
        setStep(next)
        tick(next)
      }, DELAYS[s])
    }
    tick(0)
    return () => clearTimeout(id)
  }, [reduce])
  return reduce ? FINAL_STEP : step
}
