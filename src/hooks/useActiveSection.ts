import { useState, useEffect, useRef } from 'react'

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '')
  const observersRef = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    const disconnect = () => {
      observersRef.current.forEach((o) => o.disconnect())
      observersRef.current = []
    }

    const register = (): boolean => {
      disconnect()

      const newObservers: IntersectionObserver[] = []
      let allFound = true

      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) {
          allFound = false
          return
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id)
              }
            })
          },
          {
            root: null,
            rootMargin: '-10% 0px -80% 0px',
            threshold: 0,
          }
        )

        observer.observe(el)
        newObservers.push(observer)
      })

      observersRef.current = newObservers
      return allFound
    }

    const found = register()

    // Lazy-loaded sections may not be in the DOM yet on first mount.
    // Retry at progressive delays until all ids are found.
    const retryDelays = [200, 500, 900, 1500]
    const timers: ReturnType<typeof setTimeout>[] = []

    if (!found) {
      retryDelays.forEach((delay) => {
        timers.push(setTimeout(register, delay))
      })
    }

    return () => {
      timers.forEach(clearTimeout)
      disconnect()
    }
  }, [sectionIds])

  return activeSection
}
