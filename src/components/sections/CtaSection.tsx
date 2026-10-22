import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function CtaSection() {
  return (
    <section className="relative overflow-hidden     bg-linear-to-br from-[#0b2a6b] via-brand-blue-dark to-[#0a7a6a] py-20 sm:py-24">
      <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_85%_0%,rgba(244,180,0,0.22),transparent_60%)]"
        aria-hidden="true"
      />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Let&rsquo;s Build the Right Solution for Your Business
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Whether you are a bank, retailer, government organization, or enterprise, let&rsquo;s
            discuss how our technology can simplify your operations.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" variant="primary" className="!bg-none !bg-white !text-brand-blue-dark hover:!bg-brand-blue-light" icon={<ArrowRight className="h-4 w-4" />}>
              Request a Demo
            </Button>
            <Button href="#contact" variant="inverted" icon={<MessageSquare className="h-4 w-4" />}>
              Talk to Our Team
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
