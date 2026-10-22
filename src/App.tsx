import { useEffect, useState } from 'react'
import { IndustryPage } from './components/pages/IndustryPage'
import { CapabilitiesStrip } from './components/sections/CapabilitiesStrip'
import { ContactForm } from './components/sections/ContactForm'
import { CtaSection } from './components/sections/CtaSection'
import { Hero } from './components/sections/Hero'
import { HowItWorks } from './components/sections/HowItWorks'
import { Industries } from './components/sections/Industries'
import { Platform } from './components/sections/Platform'
import { Solutions } from './components/sections/Solutions'
import { WhyChooseUs } from './components/sections/WhyChooseUs'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'

const industryRoute = /^#\/industry\/(.+)$/

function App() {
  const [hash, setHash] = useState(window.location.hash)
  const match = industryRoute.exec(hash)
  const industryId = match ? match[1] : null

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (industryId) {
      window.scrollTo(0, 0)
      const t0 = window.setTimeout(() => window.scrollTo(0, 0), 60)
      return () => window.clearTimeout(t0)
    }
    const target = hash.length > 1 ? document.getElementById(hash.slice(1)) : null
    const t = window.setTimeout(() => {
      if (target) target.scrollIntoView()
    }, 50)
    return () => window.clearTimeout(t)
  }, [industryId, hash])

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        {industryId ? (
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
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
