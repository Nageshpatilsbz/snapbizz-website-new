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
    <section id="top" className="brand-wash relative isolate flex items-center overflow-hidden bg-surface pb-4 pt-20 sm:pb-6 sm:pt-24 lg:min-h-screen min-[768px]:pb-6 min-[768px]:pt-20 min-[1200px]:pb-2 min-[1200px]:pt-20">
      <div className="mx-auto grid w-full max-w-[1680px] items-center gap-4 px-4 sm:gap-6 sm:px-6 min-[768px]:grid-cols-[0.9fr_1.1fr] min-[768px]:gap-4 min-[1200px]:grid-cols-[0.85fr_1.35fr] min-[1200px]:gap-6 min-[1200px]:px-10 min-[1400px]:px-16">
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue-dark sm:mb-4 sm:text-sm">
            SnapBizz · Retail POS &amp; Fintech Solutions
          </p>
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Built for Business,{' '}
            <span className="bg-linear-to-r from-brand-blue via-brand-red via-45% to-brand-yellow bg-clip-text text-transparent">
              Designed for Growth.
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-500 sm:mt-4 sm:text-lg">
            One smart platform connecting retail checkout, banking solutions, and enterprise payment operations.
          </p>

          <ul className="mt-3 flex max-w-xl flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-wide text-ink-700 sm:mt-4 sm:gap-y-2 sm:text-xs">
            {offerings.map((offering, index) => (
              <li key={offering} className="inline-flex items-center gap-3">
                {offering}
                {index < offerings.length - 1 ? (
                  <span className="text-brand-blue" aria-hidden="true">·</span>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
            <Button href="#contact" variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
              Request a Demo
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
