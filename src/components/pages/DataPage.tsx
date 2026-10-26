import { ArrowRight, BarChart3, Database, GraduationCap, Landmark, ShoppingBasket, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { ContactOptions } from '../ui/ContactOptions'
import { SiteLink } from '../ui/SiteLink'

const audiences = [
  {
    title: 'Financial Institutions',
    icon: Landmark,
    description:
      'Leverage our data for investment analysis and informed decision-making. Gain deeper insights into consumer spending patterns and trends, enabling more accurate credit scoring for lending decisions. Identify potential investment opportunities and mitigate risks with confidence.',
  },
  {
    title: 'FMCG Companies',
    icon: ShoppingBasket,
    description:
      'Unlock the power of analytics on market baskets and consumer behavior. Our data empowers you with decision support for targeted couponing, personalized marketing engagements, and product promotions. By understanding consumer preferences and purchase trends, optimize your strategies for maximum impact and ROI.',
  },
  {
    title: 'Research Institutes/Universities',
    icon: GraduationCap,
    description:
      'Access comprehensive market research analysis on a country-wide scale. Dive into detailed insights on consumer behavior, product preferences, and market dynamics. Our data can support research projects, including randomized control trials through controlled experimentation and data-driven analysis.',
  },
]

export function DataPage() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [formNotice, setFormNotice] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (contactOpen && !dialog.open) dialog.showModal()
    if (!contactOpen && dialog.open) dialog.close()
  }, [contactOpen])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = 'Enquiry from Webpage'
    const body = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, '', 'Message:', message].join('\n')
    window.location.href = `mailto:market@snapbizz.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setFormNotice('Your email app should open with your enquiry ready to send. Please send the email to complete your enquiry.')
  }

  const openContactForm = () => {
    setFormNotice('')
    setContactOpen(true)
  }

  const closeContactForm = () => {
    dialogRef.current?.close()
    setContactOpen(false)
  }

  const inputClasses =
    'w-full rounded-xl border border-line bg-surface-soft px-4 py-3 text-sm text-ink transition placeholder:text-ink-300 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-blue/15'

  return (
    <>
      <section className="brand-wash bg-surface pb-16 pt-32 sm:pb-20">
        <Container>
          <SiteLink href="#top" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
            <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" /> Back to home
          </SiteLink>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue-dark">Snapbizz Data Suite</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                Snapbizz Data Suite
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-700">
                Your Gateway to Informed Decision-Making
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed">
                Unlock a clearer view of India&apos;s FMCG market with consumer transaction insights drawn from point-of-sale data.
              </p>
              <Button type="button" onClick={openContactForm} className="mt-8">
                Contact us <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="rounded-3xl border border-[#263b57] bg-[#14243a] p-8 text-white shadow-[0_20px_50px_-24px_rgba(20,36,58,0.55)] sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c6a76a]/40 bg-[#c6a76a]/15 text-[#e4c98f]">
                <Database className="h-7 w-7" aria-hidden="true" />
              </div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#e4c98f]">India POS Data</p>
              <h2 className="mt-3 text-2xl font-semibold !text-white sm:text-3xl">Retail intelligence, grounded in transactions.</h2>
              <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
                <BarChart3 className="h-5 w-5 shrink-0 text-[#e4c98f]" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-white/80">Explore product transactions, price dynamics, quantities, discounts, and more.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr]">
            <div className="rounded-3xl border border-[#e6dcc8] bg-[#f5f0e6] p-7 shadow-sm sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6a35]">POS Data India</p>
              <h2 className="mt-4 text-2xl font-bold leading-snug text-[#263244] sm:text-3xl">
                Snapbizz Consumer Transaction Data of FMCG Products - POS Data India
              </h2>
            </div>
            <div className="rounded-3xl border border-line bg-white p-7 shadow-sm sm:p-9">
              <p className="text-lg leading-relaxed text-ink-700">
                Snapbizz&apos;s FMCG Consumer Transaction Data is your gateway to comprehensive consumption analysis, enabling you to unravel trends and make informed decisions. Discover the pulse of the market and propel your strategies forward with the power of precise data insights.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue-dark">Consumer Transaction Data</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Unlock a treasure trove of retail intelligence.</h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed">
            <p>
              Unlock a treasure trove of retail intelligence with Snapbizz&apos;s Consumer Transaction Data of FMCG Products, meticulously collected through Point of Sale (POS) transactions across India. This data is the cornerstone of informed decision-making, offering a panoramic view of product transactions enriched with vital details, including price dynamics, quantities, discounts, and more.
            </p>
            <p>
              Our data derives directly from the point of sale, ensuring unparalleled accuracy and authenticity. This information is categorized into ten main market segments, allowing for precise market analysis and insights. Furthermore, our data empowers you to generate brand-specific growth projections and uncover intricate consumption patterns across diverse product categories.
            </p>
            <p>
              Elevate your understanding of consumer behavior and market dynamics with Snapbizz&apos;s cutting-edge data offering. Experience the future of retail intelligence today.
            </p>
          </div>
        </Container>
      </section>

      <section className="brand-wash bg-surface-soft py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue-dark">Built for decision-makers</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Who can buy our Data?</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {audiences.map(({ title, icon: Icon, description }) => (
              <article key={title} className="rounded-3xl border border-line bg-white p-7 shadow-sm sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-light text-brand-blue-dark">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button type="button" onClick={openContactForm}>
              Contact us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        onClose={() => setContactOpen(false)}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-3xl border-0 bg-white p-0 shadow-card backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
        aria-labelledby="data-contact-title"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue-dark">Snapbizz Data Suite</p>
              <h2 id="data-contact-title" className="mt-2 text-2xl font-bold">We&apos;ll get back to you!</h2>
              <p className="mt-2 text-sm leading-relaxed">Share your details and tell us how we can help.</p>
            </div>
            <button type="button" onClick={closeContactForm} className="rounded-full p-2 text-ink-500 transition hover:bg-surface-soft hover:text-ink" aria-label="Close contact form">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5">
            <ContactOptions />
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-ink-700" htmlFor="data-contact-name">
              Name
              <input id="data-contact-name" name="name" type="text" autoComplete="name" required className={`${inputClasses} mt-1.5`} />
            </label>
            <label className="block text-sm font-medium text-ink-700" htmlFor="data-contact-email">
              Email
              <input id="data-contact-email" name="email" type="email" autoComplete="email" required className={`${inputClasses} mt-1.5`} />
            </label>
            <label className="block text-sm font-medium text-ink-700" htmlFor="data-contact-phone">
              Phone
              <input id="data-contact-phone" name="phone" type="tel" autoComplete="tel" required className={`${inputClasses} mt-1.5`} />
            </label>
            <label className="block text-sm font-medium text-ink-700" htmlFor="data-contact-message">
              Message
              <textarea id="data-contact-message" name="message" rows={4} required className={`${inputClasses} mt-1.5`} />
            </label>
            {formNotice ? <p role="alert" className="rounded-xl border border-brand-yellow/40 bg-brand-yellow/10 p-3 text-sm text-ink-700">{formNotice}</p> : null}
            <Button type="submit" className="w-full">Send enquiry</Button>
          </form>
        </div>
      </dialog>
    </>
  )
}
