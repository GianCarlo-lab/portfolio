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
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
