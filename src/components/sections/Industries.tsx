import { motion } from 'framer-motion'
import { industries } from '../../data/content'
import { AccentIcon } from '../ui/AccentIcon'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Industries() {
  return (
    <section id="industries" className="bg-surface-soft py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Industries"
          title="Purpose-Built Solutions for Every Workflow"
          description="Each industry has its own billing, collection, and reporting needs. Our platform adapts to every one of them."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft transition-shadow hover:shadow-card"
            >
              <AccentIcon icon={industry.icon} accent={industry.accent} />
              <h3 className="text-base font-semibold text-ink">{industry.title}</h3>
              <p className="text-sm leading-relaxed text-ink-500">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
