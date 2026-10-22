import { lazy, Suspense, useEffect, useState } from 'react'
import { IndustryPage } from './components/pages/IndustryPage'
import { companyPages } from './data/companyPages'
import { industries } from './data/content'
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

const industryRoute = /^#\/industry\/(.+)$/
const companyRoute = /^#\/company\/([^/]+)$/
const CompanyPage = lazy(() => import('./components/pages/CompanyPage').then((module) => ({ default: module.CompanyPage })))

function App() {
  const [hash, setHash] = useState(window.location.hash)
  const match = industryRoute.exec(hash)
  const industryId = match ? match[1] : null
  const companyMatch = companyRoute.exec(hash)
  const companyId = companyMatch ? companyMatch[1] : null

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (industryId || companyId) {
        window.scrollTo({ top: 0, behavior: 'instant' })
        if (industryId) document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
      } else {
        const target = hash.length > 1 ? document.getElementById(hash.slice(1)) : null
        target?.scrollIntoView()
      }
    }, 50)
    return () => window.clearTimeout(t)
  }, [industryId, companyId, hash])

  useEffect(() => {
    const pageTitle = companyId
      ? companyPages.find((page) => page.id === companyId)?.label ?? 'Page not found'
      : industryId ? industries.find((industry) => industry.id === industryId)?.title ?? 'Industry not found' : null
    document.title = pageTitle ? `${pageTitle} | SnapBizz` : 'SnapBizz | Powering Smarter Payments and Business Operations'
  }, [industryId, companyId])

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        {companyId ? (
          <Suspense fallback={<div role="status" className="min-h-[70vh] px-6 pb-20 pt-32 text-center">Loading page...</div>}>
            <CompanyPage key={companyId} id={companyId} />
          </Suspense>
        ) : industryId ? (
          <IndustryPage id={industryId} />
        ) : (
          <>
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
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
