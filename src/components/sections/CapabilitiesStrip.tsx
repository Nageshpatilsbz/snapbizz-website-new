import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { capabilities } from '../../data/content'
import { accentBgClass, accentSoftClass, accentTextClass } from '../ui/AccentIcon'
import { Container } from '../ui/Container'

const details = [
  { description: 'Merchant tools that go beyond payments.', href: '#solutions' },
  { description: 'Flexible billing for the way you work.', href: '#solutions' },
  { description: 'Connected collections and reconciliation.', href: '#solutions' },
  { description: 'A clearer view of your store performance.', href: '#platform' },
  { description: 'Build relationships beyond the checkout.', href: '#platform' },
]

export function CapabilitiesStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end center'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section
      ref={sectionRef}
      aria-label="SnapBizz capabilities"
      className="brand-wash relative border-y border-line bg-surface-soft py-10 sm:py-14"
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reducedMotion ? 1 : progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-linear-to-r from-brand-blue via-brand-green to-brand-yellow"
      />
      <Container>
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-5 pt-3 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0">
          {capabilities.map((capability, index) => (
            <motion.a
              key={capability.label}
              href={details[index].href}
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22, delay: reducedMotion ? 0 : index * 0.08 }}
              whileHover={reducedMotion ? undefined : 'hover'}
              variants={{ hover: { y: -6, transition: { type: 'spring', stiffness: 300, damping: 22, delay: 0 } } }}
              className="group relative flex min-h-60 w-64 shrink-0 snap-center flex-col overflow-hidden rounded-lg border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-card focus-visible:shadow-card lg:w-auto lg:min-w-0"
            >
              <div className="flex items-center justify-between">
                <motion.span
                  variants={{ hover: { rotate: -8, scale: 1.08 } }}
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${accentSoftClass[capability.accent]} ${accentTextClass[capability.accent]}`}
                >
                  <capability.icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                </motion.span>
                <ArrowUpRight
                  className="h-4 w-4 text-ink-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink group-focus-visible:text-ink motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </div>
              <h2 className="mt-6 text-base font-semibold leading-snug text-ink">{capability.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{details[index].description}</p>
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${accentBgClass[capability.accent]}`}
              />
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  )
}
