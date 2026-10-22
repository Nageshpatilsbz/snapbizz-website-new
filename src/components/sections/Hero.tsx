import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import HeroScene from './HeroScene'

const offerings = [
  'Android & Windows POS',
  'Banking & Fintech',
  'Collections & Reconciliation',
]

export function Hero() {
  return (
    <section id="top" className="brand-wash relative isolate flex min-h-screen items-center overflow-hidden bg-surface pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="mx-auto grid w-full max-w-[1680px] items-center gap-10 px-6 lg:grid-cols-[0.85fr_1.35fr] lg:gap-6 lg:px-10 xl:px-16">
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue-dark sm:text-sm">
            SnapBizz · Retail POS &amp; Fintech Solutions
          </p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Built for Business.{' '}
            <span className="bg-linear-to-r from-brand-blue via-brand-red via-45% to-brand-yellow bg-clip-text text-transparent">
              Designed for Growth.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
            One smart platform connecting retail checkout, banking solutions, and enterprise payment operations.
          </p>

          <ul className="mt-6 flex max-w-xl flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-wide text-ink-700">
            {offerings.map((offering, index) => (
              <li key={offering} className="inline-flex items-center gap-3">
                {offering}
                {index < offerings.length - 1 ? (
                  <span className="text-brand-blue" aria-hidden="true">·</span>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
              Request a Demo
            </Button>
            <Button href="#solutions" variant="secondary">
              Explore Our Solutions
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full min-w-0"
        >
          <HeroScene />
        </motion.div>
      </div>
    </section>
  )
}
