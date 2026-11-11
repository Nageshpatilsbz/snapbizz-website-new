import { ArrowRight, BadgeCheck, ChartNoAxesCombined, Coins, Handshake, Repeat2, ShoppingBasket, Wallet } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

const opportunities = [
  {
    title: 'Established market presence',
    description: 'Bring a proven retail technology platform to grocery markets where SnapBizz already has a strong presence.',
    icon: BadgeCheck,
    accent: 'text-brand-blue-dark bg-brand-blue-light',
  },
  {
    title: 'Attractive unit economics',
    description: 'Original partner material cites potential margins exceeding ₹6,500 per unit, depending on product and agreement.',
    icon: Coins,
    accent: 'text-[#8a6200] bg-brand-yellow/15',
  },
  {
    title: 'Ongoing revenue potential',
    description: 'Eligible renewals and continued customer relationships may create recurring revenue over time.',
    icon: Repeat2,
    accent: 'text-brand-green bg-brand-green/10',
  },
  {
    title: 'A practical way to expand',
    description: 'Add a retail technology portfolio to your existing business and relationships with local merchants.',
    icon: Wallet,
    accent: 'text-brand-blue-dark bg-brand-blue-light',
  },
  {
    title: 'A growing digital grocery market',
    description: 'Help neighborhood stores build stronger digital operations in an essential, high-frequency category.',
    icon: ShoppingBasket,
    accent: 'text-brand-green bg-brand-green/10',
  },
]

export function DistributorsPage() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <section className="border-b border-line bg-[linear-gradient(115deg,#fff8e9_0%,#ffffff_48%,#eaf8f3_100%)] pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Container className="text-center">
          <motion.div
            className="mx-auto max-w-4xl"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
          >
            <p className="text-sm font-semibold text-brand-green">SnapBizz Distribution Partnership</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Become a SnapBizz Distribution Partner</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink-700 sm:text-lg sm:leading-8">
              Your opportunity to drive more revenue and empower kirana store owners is here.
            </p>
            <Button href="#contact" className="mt-7" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
              Become a Distributor
            </Button>
          </motion.div>
        </Container>
      </section>

      <section aria-labelledby="distribution-opportunity-title" className="brand-wash bg-surface-soft py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-brand-blue-dark">Why partner with SnapBizz</p>
            <h2 id="distribution-opportunity-title" className="mt-2 text-2xl font-bold sm:text-3xl">Build a business around local retail</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {opportunities.map(({ title, description, icon: Icon, accent }, index) => (
              <motion.article
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.07, ease: 'easeOut' }}
                className={`flex min-h-48 flex-col items-center justify-center rounded-lg border border-line bg-white px-5 py-6 text-center shadow-sm sm:px-7 ${index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${accent}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-ink-500">{description}</p>
              </motion.article>
            ))}
          </div>

          <p className="mx-auto mt-5 max-w-4xl text-center text-xs leading-5 text-ink-500">
            Market share and margin figures are indicative claims from SnapBizz partner material. Actual economics, recurring revenue, investment, product availability, and territory depend on the final commercial agreement and are not guaranteed.
          </p>
        </Container>
      </section>

      <section className="brand-wash border-y border-line bg-surface-soft py-10 sm:py-14">
        <Container>
          <motion.div
            className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut' }}
          >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
              <Handshake className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-semibold">Let’s discuss your territory</h2>
              <p className="mt-1 text-sm text-ink-500">Tell us about your business and distribution network.</p>
            </div>
          </div>
          <Button href="#contact" icon={<ChartNoAxesCombined className="h-4 w-4" aria-hidden="true" />}>
            Become a Distributor
          </Button>
          </motion.div>
        </Container>
      </section>
    </>
  )
}