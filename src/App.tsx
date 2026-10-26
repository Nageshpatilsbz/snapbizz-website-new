import { lazy, Suspense, useEffect } from 'react'
import { IndustryPage } from './components/pages/IndustryPage'
import { NotFoundPage } from './components/pages/NotFoundPage'
import { getPage, getPagePath } from './lib/seo'
import { siteHref } from './lib/urls'
import { CapabilitiesStrip } from './components/sections/CapabilitiesStrip'
import { ContactForm } from './components/sections/ContactForm'
import { CtaSection } from './components/sections/CtaSection'
import { Hero } from './components/sections/Hero'
import { HowItWorks } from './components/sections/HowItWorks'
import { OfficeLocation } from './components/sections/OfficeLocation'
import { Industries } from './components/sections/Industries'
import { Platform } from './components/sections/Platform'
import { Solutions } from './components/sections/Solutions'
import { WhyChooseUs } from './components/sections/WhyChooseUs'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'

const CompanyPage = lazy(() => import('./components/pages/CompanyPage').then((module) => ({ default: module.CompanyPage })))
const SolutionPage = lazy(() => import('./components/pages/SolutionPage').then((module) => ({ default: module.SolutionPage })))
const DataPage = lazy(() => import('./components/pages/DataPage').then((module) => ({ default: module.DataPage })))

function App({ pathname }: { pathname?: string }) {
  const page = getPage(pathname ?? getPagePath(window.location.pathname))

  useEffect(() => {
    document.documentElement.removeAttribute('data-prerendered')
    document.title = page.title
    const navigateHash = () => {
      const hash = window.location.hash
      if (/^#\/(company|industry)\//.test(hash)) {
        window.location.replace(siteHref(hash))
        return
      }
      if (page.kind !== 'home' && hash) {
        window.location.replace(siteHref(hash))
        return
      }
      if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    }
    const timer = window.setTimeout(navigateHash, 50)
    window.addEventListener('hashchange', navigateHash)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('hashchange', navigateHash)
    }
  }, [page.title, page.kind])

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Suspense fallback={<div role="status" className="min-h-[70vh] px-6 pb-20 pt-32 text-center">Loading page...</div>}>
          {page.kind === 'company' ? <CompanyPage key={page.id} id={page.id!} />
            : page.kind === 'industry' ? <IndustryPage id={page.id!} />
              : page.kind === 'solution' ? <SolutionPage id={page.id!} />
                : page.kind === 'data' ? <DataPage />
                : page.kind === 'not-found' ? <NotFoundPage />
                  : <>
                    <Hero />
                    <CapabilitiesStrip />
                    <Solutions />
                    <Industries />
                    <Platform />
                    <HowItWorks />
                    <WhyChooseUs />
                    <CtaSection />
                    <ContactForm />
                    <OfficeLocation />
                  </>}
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
