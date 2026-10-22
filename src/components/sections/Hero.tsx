import { motion } from 'framer-motion'
import { ArrowRight, Banknote, ShoppingBag, Wallet } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { Button } from '../ui/Button'

const HeroIllustration = lazy(() => import('./HeroIllustration'))

const offerings = [
  { label: 'Turbo & Neo Retail POS for Android and Windows', icon: ShoppingBag },
  { label: 'Bank-Branded APOS & Fintech Solutions', icon: Banknote },
  { label: 'Enterprise Collections & Payment Reconciliation', icon: Wallet },
]

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-surface pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-160 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(66,133,244,0.12),rgba(255,255,255,0))]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-[1680px] items-center gap-10 px-6 lg:grid-cols-[0.85fr_1.35fr] lg:gap-6 lg:px-10 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            SnapBizz{' '}
            <span className="bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              Retail POS
            </span>{' '}
            &amp; Fintech Solutions
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
            One connected ecosystem for retailers, banks, fintechs, and enterprises. From the
            checkout counter to online orders, inventory, payments, and business insights,
            SnapBizz brings everyday operations together.
          </p>

          <ul className="mt-6 flex flex-col gap-2.5 max-w-xl">
            {offerings.map((offering) => (
              <li key={offering.label} className="flex items-center gap-2.5 text-sm font-medium text-ink-700">
                <offering.icon className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                {offering.label}
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
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="relative mx-auto w-full min-w-0"
        >
          <Suspense fallback={<div className="aspect-7/5 w-full" aria-hidden="true" />}>
            <HeroIllustration />
          </Suspense>
        </motion.div>
      </div>
    </section>
  )
}
