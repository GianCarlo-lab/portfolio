import { lazy, Suspense } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Layout } from '@/components/layout/Layout/Layout'
import { Hero } from '@/modules/hero/Hero'
import { SectionLoader } from '@/components/common/SectionLoader/SectionLoader'
import { META } from '@/constants/meta'

const About = lazy(() =>
  import('@/modules/about/About').then((m) => ({ default: m.About }))
)
const Experience = lazy(() =>
  import('@/modules/experience/Experience').then((m) => ({ default: m.Experience }))
)
const Skills = lazy(() =>
  import('@/modules/skills/Skills').then((m) => ({ default: m.Skills }))
)
const Stats = lazy(() =>
  import('@/modules/stats/Stats').then((m) => ({ default: m.Stats }))
)
const Services = lazy(() =>
  import('@/modules/services/Services').then((m) => ({ default: m.Services }))
)
const Projects = lazy(() =>
  import('@/modules/projects/Projects').then((m) => ({ default: m.Projects }))
)
const Contact = lazy(() =>
  import('@/modules/contact/Contact').then((m) => ({ default: m.Contact }))
)

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{META.title}</title>
        <meta name="description" content={META.description} />
        <meta name="author" content={META.author} />
        <meta name="keywords" content={META.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#6366F1" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={META.url} />
        <meta property="og:title" content={META.title} />
        <meta property="og:description" content={META.description} />
        <meta property="og:image" content={META.image} />
        <meta property="og:locale" content="es_PE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META.title} />
        <meta name="twitter:description" content={META.description} />
        <meta name="twitter:image" content={META.image} />

        <link rel="canonical" href={META.url} />
      </Helmet>

      <Layout>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Stats />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </Layout>
    </HelmetProvider>
  )
}

export default App
