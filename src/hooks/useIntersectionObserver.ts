import { useEffect, useRef, useState } from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
}

export function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  options: Options = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element || hasTriggered.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px',
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, options.threshold, options.rootMargin])

  return isIntersecting
}
