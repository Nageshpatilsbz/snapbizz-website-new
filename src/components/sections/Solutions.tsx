import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { solutions } from '../../data/content'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { SolutionFlow } from './SolutionFlow'

const panelId = (id: string) => `solution-${id}`

const panelGradients = [
  'from-brand-blue to-[#1fc1e0]',
  'from-brand-green via-[#12a89a] to-[#1fc1e0]',
  'from-[#8f5bd6] to-brand-blue',
  'from-brand-red to-[#f08a24]',
]

export function Solutions() {
  const [activeId, setActiveId] = useState(solutions[0].id)
  const [showTabs, setShowTabs] = useState(false)

  useEffect(() => {
    const update = () => {
      const zone = document.getElementById('solution-panels')
      if (!zone) return
      const { top, bottom } = zone.getBoundingClientRect()
      setShowTabs(top <= 120 && bottom >= 260)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.getAttribute('data-solution') ?? solutions[0].id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    solutions.forEach((solution) => {
      const el = document.getElementById(panelId(solution.id))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const goTo = (id: string) => {
    document.getElementById(panelId(id))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="solutions" className="bg-surface">
      <div className="pt-24 sm:pt-28">
        <Container>
          <SectionHeading
            eyebrow="Solutions"
            title="Retail Technology. Fintech Partnerships. Enterprise Workflows."
            description="From independent stores to banks, fintechs, and multi-location enterprises, explore solutions built around everyday operations."
          />
        </Container>
      </div>

      <div id="solution-panels" className="relative mt-12">
        <div
          id="solution-tabs"
          className={`fixed inset-x-0 top-18 z-40 border-b border-line bg-white/95 px-6 py-2.5 shadow-md backdrop-blur transition-all duration-300 lg:px-8 ${
            showTabs ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
          }`}
          aria-hidden={!showTabs}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1.5 rounded-xl bg-surface-soft p-1.5 xl:grid-cols-4">
            {solutions.map((solution) => {
              const isActive = solution.id === activeId
              return (
                <button
                  key={solution.id}
                  type="button"
                  onClick={() => goTo(solution.id)}
                  className={`relative isolate flex min-h-12 min-w-0 items-center justify-center rounded-lg px-3 py-2 text-center text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:text-sm ${
                    isActive
                      ? 'text-white'
                      : 'text-ink-500 hover:-translate-y-0.5 hover:bg-brand-blue-light hover:text-brand-blue-dark'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="solution-tab-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-linear-to-r from-brand-blue to-brand-blue-dark shadow-md shadow-brand-blue/30"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  ) : null}
                  {solution.title}
                </button>
              )
            })}
          </div>
        </div>

        {solutions.map((solution, index) => (
          <div
            key={solution.id}
            id={panelId(solution.id)}
            data-solution={solution.id}
            className={`flex min-h-screen items-center pb-12 pt-44 ${
              index % 2 === 0 ? 'bg-surface-soft' : 'bg-white'
            }`}
          >
            <Container className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="grid gap-6 lg:grid-cols-5">
                  <div
                    className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-linear-to-br p-7 text-white shadow-[0_28px_60px_-20px_rgba(15,30,80,0.55)] ring-1 ring-white/25 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.015] hover:shadow-[0_40px_80px_-20px_rgba(15,30,80,0.7)] sm:p-9 lg:col-span-2 ${panelGradients[index % panelGradients.length]}`}
                  >
                    <div className="card-sheen" aria-hidden="true" />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:18px_18px]"
                      aria-hidden="true"
                    />
                    <solution.icon
                      className="pointer-events-none absolute -bottom-8 -right-8 h-52 w-52 rotate-12 text-white/10 transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                    <div
                      className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/25 blur-3xl"
                      aria-hidden="true"
                    />
                    <span className="relative text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      Solution {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="icon-glint relative mt-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg ring-1 ring-white/50 backdrop-blur transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <solution.icon className="h-8 w-8" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="relative mt-6 text-2xl font-semibold tracking-tight !text-white sm:text-3xl">
                      {solution.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
                      {solution.description}
                    </p>
                    <a
                      href="#contact"
                      className="group relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue-dark transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      {solution.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </div>

                  <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-3">
                    {solution.features.map((feature, fi) => (
                      <li
                        key={feature}
                        className="group/feat relative flex cursor-pointer items-start gap-3 overflow-hidden rounded-2xl border border-line bg-linear-to-br from-white to-surface-soft p-4 pl-5 text-sm leading-snug text-ink-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-[0_16px_32px_-14px_rgba(66,133,244,0.45)]"
                      >
                        <span
                          className={`absolute inset-y-0 left-0 w-1 bg-linear-to-b ${panelGradients[index % panelGradients.length]}`}
                          aria-hidden="true"
                        />
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green/10 ring-1 ring-brand-green/20 transition-transform duration-300 group-hover/feat:scale-110">
                          <CheckCircle2 className="h-4 w-4 text-brand-green" aria-hidden="true" />
                        </span>
                        <span className="flex-1">{feature}</span>
                        <span className="text-[10px] font-bold tabular-nums text-ink-300">
                          {String(fi + 1).padStart(2, '0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {activeId === solution.id ? (
                  <SolutionFlow key={solution.id} solutionId={solution.id} />
                ) : (
                  <div className="mt-10 h-48" aria-hidden="true" />
                )}

                <p className="mt-6 text-xs leading-relaxed text-ink-500">
                  Product availability and feature coverage vary by solution, supported devices,
                  deployment configuration, and partnership.
                </p>
              </motion.div>
            </Container>
          </div>
        ))}
      </div>
    </section>
  )
}
