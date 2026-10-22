import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { solutions } from '../../data/content'
import { AccentIcon, accentTextClass } from '../ui/AccentIcon'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Solutions() {
  const [activeId, setActiveId] = useState(solutions[0].id)
  const active = solutions.find((solution) => solution.id === activeId) ?? solutions[0]

  return (
    <section id="solutions" className="bg-surface py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Solutions"
          title="Retail Technology. Fintech Partnerships. Enterprise Workflows."
          description="From independent stores to banks, fintechs, and multi-location enterprises, explore solutions built around everyday operations."
        />

        <div className="rounded-3xl border border-line bg-surface-soft p-6 shadow-soft sm:p-10">
          <div className="grid grid-cols-1 gap-2 rounded-lg bg-white p-1.5 shadow-sm sm:grid-cols-2 xl:grid-cols-4">
            {solutions.map((solution) => {
              const isActive = solution.id === activeId
              return (
                <button
                  key={solution.id}
                  type="button"
                  onClick={() => setActiveId(solution.id)}
                  className={`relative isolate flex min-h-14 min-w-0 items-center justify-center rounded-md px-4 py-3 text-center text-sm font-semibold wrap-break-word transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                    isActive ? 'text-white' : 'text-ink-500 hover:text-ink'
                  }`}
                  aria-pressed={isActive}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="solution-tab-pill"
                      className="absolute inset-0 -z-10 rounded-md bg-ink"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  ) : null}
                  {solution.title}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-8 p-2 sm:p-0"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <AccentIcon icon={active.icon} accent={active.accent} />
                  <div>
                    <h3 className="text-xl font-semibold text-ink sm:text-2xl">{active.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">
                      {active.description}
                    </p>
                  </div>
                </div>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {active.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${accentTextClass[active.accent]}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs leading-relaxed text-ink-500">
                Product availability and feature coverage vary by solution, supported devices,
                deployment configuration, and partnership.
              </p>

              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand-blue"
              >
                {active.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
