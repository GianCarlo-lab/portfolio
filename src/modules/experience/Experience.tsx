import { experiences } from '@/data/experience.data'
import { SectionTitle } from '@/components/common/SectionTitle/SectionTitle'
import { TimelineItem } from './TimelineItem'
import { TimelineConnector } from './TimelineConnector'

export function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <SectionTitle
          label="Experiencia"
          title="Trayectoria profesional"
          subtitle="Los proyectos y equipos que forjaron mi stack."
          align="left"
        />

        <div className="relative mt-10">
          {/* Animated background connector */}
          <TimelineConnector />

          {/* Timeline items */}
          <div className="flex flex-col">
            {experiences.map((item, i) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={i}
                isLast={i === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
