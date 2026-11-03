import { motion, useReducedMotion } from 'framer-motion'
import { reasons } from '../../data/content'
import { AccentIcon, accentBgClass, accentSoftClass, accentTextClass } from '../ui/AccentIcon'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function WhyChooseUs() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="why-us" className="brand-wash relative isolate flex items-center overflow-hidden bg-surface-soft py-12 sm:py-28 lg:min-h-screen">
      <Container className="flex w-full flex-col gap-8 sm:gap-14">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built Around Practical Business Value"
          description="We focus on what actually helps your operations run better &mdash; not unsupported marketing claims."
        />

        <ul
          className="relative grid gap-4 sm:auto-rows-fr sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          style={{ perspective: 1200 }}
        >
          {reasons.map((reason) => (
            <motion.li
              key={reason.title}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white bg-white p-6 shadow-[0_2px_4px_rgba(15,23,42,0.02),0_12px_32px_-16px_rgba(15,23,42,0.18)] ring-1 ring-ink/5 transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_16px_-8px_rgba(15,23,42,0.1),0_28px_48px_-20px_rgba(15,23,42,0.24)] motion-safe:hover:-translate-y-1.5 sm:p-7">
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-80 ${accentSoftClass[reason.accent]}`}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 -translate-x-[150%] bg-linear-to-r from-transparent via-white/70 to-transparent -skew-x-12 transition-transform duration-1000 motion-safe:group-hover:translate-x-[150%]"
                  aria-hidden="true"
                />
                <reason.icon
                  className={`pointer-events-none absolute -bottom-5 -right-4 h-36 w-36 -rotate-12 opacity-[0.045] ${accentTextClass[reason.accent]}`}
                  strokeWidth={1}
                  aria-hidden="true"
                />
                <div className="relative mb-4 flex items-center justify-between sm:mb-6">
                  <span className="rounded-2xl bg-white p-1.5 shadow-[0_4px_12px_rgba(15,23,42,0.08)] ring-1 ring-ink/5 transition-transform duration-300 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-105">
                    <AccentIcon icon={reason.icon} accent={reason.accent} className="rounded-xl" />
                  </span>
                </div>
                <h3 className="relative text-lg font-semibold leading-snug tracking-tight text-ink">{reason.title}</h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-500">{reason.description}</p>
                <div className="relative mt-6 h-px bg-line/70" aria-hidden="true">
                  <span className={`absolute inset-y-0 left-0 w-10 transition-[width] duration-500 group-hover:w-20 ${accentBgClass[reason.accent]}`} />
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
