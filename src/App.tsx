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

function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Hero />
        <CapabilitiesStrip />
        <Solutions />
        <Industries />
        <Platform />
        <HowItWorks />
        <WhyChooseUs />
        <CtaSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
