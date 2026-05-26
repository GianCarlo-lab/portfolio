import { useEffect, useRef, useState } from 'react'

export function useAnimatedCounter(
  end: number,
  duration: number = 2000,
  start: number = 0,
  isActive: boolean = false
): number {
  const [value, setValue] = useState(start)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isActive) return

    const startTime = performance.now()
    const range = end - start

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(start + range * eased))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [isActive, end, start, duration])

  return value
}
