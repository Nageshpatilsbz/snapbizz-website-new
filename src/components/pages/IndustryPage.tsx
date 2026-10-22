import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { industries } from '../../data/content'
import { industryDetails } from '../../data/industryDetails'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { FlowDiagram } from '../sections/SolutionFlow'
import type { BrandAccent } from '../../types'

const gradients: Record<BrandAccent, string> = {
  blue: 'from-brand-blue to-[#1fc1e0]',
  red: 'from-brand-red to-[#f08a24]',
  yellow: 'from-[#f4b400] to-[#f08a24]',
  green: 'from-brand-green to-[#1fc1e0]',
}

const tints: Record<BrandAccent, string> = {
  blue: 'from-[#e8f0fe] via-white to-[#e6f8fc]',
  red: 'from-[#fdecea] via-white to-[#fff3e6]',
  yellow: 'from-[#fff6dc] via-white to-[#fff0e0]',
  green: 'from-[#e3f6ec] via-white to-[#e6f8fc]',
}

export function IndustryPage({ id }: { id: string }) {
  const industry = industries.find((i) => i.id === id)
  const detail = industryDetails[id]

  if (!industry || !detail) {
    return (
      <section className="brand-wash flex min-h-[70vh] items-center pt-24">
        <Container className="flex flex-col items-start gap-4">
          <h1 tabIndex={-1} className="text-3xl font-bold">Industry not found</h1>
          <Button href="#industries" variant="secondary">Back to industries</Button>
        </Container>
      </section>
    )
  }

  const Icon = industry.icon
  const gradient = gradients[industry.accent]
  const others = industries.filter((i) => i.id !== id)

  return (
    <>
      <section className={`relative overflow-hidden bg-linear-to-br ${tints[industry.accent]} pt-32 pb-20`}>
        <div className={`pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-linear-to-br ${gradient} opacity-20 blur-3xl`} />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-start gap-5">
            <a href="#industries" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
              <ArrowLeft className="h-4 w-4" /> All industries
            </a>
            <h1 tabIndex={-1} className="text-4xl font-bold focus:outline-none sm:text-5xl">{industry.title}</h1>
            <p className="text-xl font-medium text-ink-700">{detail.tagline}</p>
            <p className="max-w-xl leading-relaxed text-ink-500">{detail.overview}</p>
            <Button href="#contact">Request a Demo</Button>
          </div>

          <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
            <div className={`absolute inset-0 rounded-full bg-linear-to-br ${gradient} opacity-15`} />
            <div className="absolute inset-8 rounded-full border-2 border-dashed border-ink-300" />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className={`flex h-36 w-36 items-center justify-center rounded-[2rem] bg-linear-to-br ${gradient} text-white shadow-xl`}
            >
              <Icon className="h-16 w-16" />
            </motion.div>
            {detail.flow.map((step, i) => {
              const pos = ['left-0 top-6', 'right-0 top-12', 'left-2 bottom-8', 'right-0 bottom-4'][i]
              const StepIcon = step.icon
              return (
                <motion.div
                  key={step.label}
                  animate={{ y: [0, i % 2 ? 6 : -6, 0] }}
                  transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute ${pos} flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-card`}
                >
                  <StepIcon className="h-4 w-4 text-brand-blue" /> {step.label}
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="brand-wash bg-white py-20">
        <Container>
          <h2 className="text-3xl font-bold sm:text-4xl">What you get</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {detail.features.map((f, i) => {
              const FIcon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-line bg-surface-soft p-6"
                >
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br ${gradient} text-white`}>
                    <FIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.text}</p>
                </motion.div>
              )
            })}
          </div>
          <FlowDiagram steps={detail.flow} title={`How ${industry.title} works`} />
        </Container>
      </section>

      <section className="brand-wash bg-surface-soft py-20">
        <Container>
          <h2 className="text-2xl font-bold sm:text-3xl">Explore other industries</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <a
                key={o.id}
                href={`#/industry/${o.id}`}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-card"
              >
                {o.title}
                <ArrowRight className="h-4 w-4 text-brand-blue" />
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
