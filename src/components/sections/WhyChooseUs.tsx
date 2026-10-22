import { motion } from 'framer-motion'
import { reasons } from '../../data/content'
import { AccentIcon, accentSoftClass } from '../ui/AccentIcon'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function WhyChooseUs() {
  return (
    <section id="why-us" className="flex min-h-screen items-center bg-surface py-24 sm:py-28">
      <Container className="flex w-full flex-col gap-14">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built Around Practical Business Value"
          description="We focus on what actually helps your operations run better &mdash; not unsupported marketing claims."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className={`flex cursor-pointer flex-col gap-4 rounded-2xl border border-line p-6 transition-all hover:-translate-y-1 hover:shadow-soft ${accentSoftClass[reason.accent]}`}
            >
              <AccentIcon icon={reason.icon} accent={reason.accent} size="sm" />
              <h3 className="text-base font-semibold text-ink">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-ink-500">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
