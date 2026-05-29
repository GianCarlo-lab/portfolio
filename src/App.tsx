import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SectionLoader } from '@/components/common/SectionLoader/SectionLoader'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage }))
)
const ServiceDetailPage = lazy(() =>
  import('@/pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
)
const CleanCodePage = lazy(() =>
  import('@/pages/about/CleanCodePage').then((m) => ({ default: m.CleanCodePage }))
)
const AttentionToDetailPage = lazy(() =>
  import('@/pages/about/AttentionToDetailPage').then((m) => ({ default: m.AttentionToDetailPage }))
)
const ContinuousLearningPage = lazy(() =>
  import('@/pages/about/ContinuousLearningPage').then((m) => ({ default: m.ContinuousLearningPage }))
)
const FullStackVisionPage = lazy(() =>
  import('@/pages/about/FullStackVisionPage').then((m) => ({ default: m.FullStackVisionPage }))
)
const TeamworkPage = lazy(() =>
  import('@/pages/about/TeamworkPage').then((m) => ({ default: m.TeamworkPage }))
)

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<SectionLoader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/servicios/:serviceId"
            element={
              <Suspense fallback={<SectionLoader />}>
                <ServiceDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/sobre-mi/clean-code"
            element={
              <Suspense fallback={<SectionLoader />}>
                <CleanCodePage />
              </Suspense>
            }
          />
          <Route
            path="/sobre-mi/atencion-al-detalle"
            element={
              <Suspense fallback={<SectionLoader />}>
                <AttentionToDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/sobre-mi/aprendizaje-continuo"
            element={
              <Suspense fallback={<SectionLoader />}>
                <ContinuousLearningPage />
              </Suspense>
            }
          />
          <Route
            path="/sobre-mi/vision-fullstack"
            element={
              <Suspense fallback={<SectionLoader />}>
                <FullStackVisionPage />
              </Suspense>
            }
          />
          <Route
            path="/sobre-mi/trabajo-en-equipo"
            element={
              <Suspense fallback={<SectionLoader />}>
                <TeamworkPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
