import { motion } from 'framer-motion'
import { processSteps } from '../../data/content'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function HowItWorks() {
  return (
    <section className="bg-surface-soft py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="How It Works"
          title="A Straightforward Path to Deployment"
          description="A general engagement process we follow with every partner &mdash; tailored to your workflow, not a fixed script."
        />

        <div className="grid gap-8 sm:grid-cols-3">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative rounded-2xl border border-line bg-white p-7 shadow-soft"
            >
              <span className="font-display text-4xl font-bold text-brand-blue/20">{step.step}</span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
