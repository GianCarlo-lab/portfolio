import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const options: IntersectionObserverInit = {
      root: null,
      // Detect when section title crosses the top 20-30% band of the viewport.
      // -70% bottom margin means sections don't need to be 50% visible.
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    }

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        })
      }, options)

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds])

  return activeSection
}
