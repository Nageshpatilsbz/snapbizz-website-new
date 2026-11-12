import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { companyPageHref, companyPages } from '../../data/companyPages'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { PrivacyPolicy } from './PrivacyPolicy'
import { TermsAndConditions } from './TermsAndConditions'
import { ProductFaqLibrary } from './ProductFaqLibrary'
import { SiteLink } from '../ui/SiteLink'

const retailerTestimonials = [
  {
    title: 'Meet Gargiben from Ahmedabad',
    description: 'Gargiben is 69 years old and comfortably uses the SnapBizz billing machine.',
    videoId: 'S_ILtD2HqHw',
  },
  {
    title: 'Mr. Lala increases his store profits',
    description: 'Lala Ram uses SnapVision to display products and increase sales.',
    videoId: 'iLq_RTrYeZ0',
  },
  {
    title: 'Meet Anuradha from Telangana',
    description: 'Anuradha had never used a gadget before and quickly embraced the SnapBizz billing machine.',
    videoId: 'Matc0uzN0i0',
  },
  {
    title: 'Be like Imran Bhai and Ramu Kaka',
    description: 'Ramu Kaka transformed his grocery store into a smart store and increased profits.',
    videoId: '73zd5VS7bcA',
  },
  {
    title: 'Swastik Dry Fruits store goes hi-tech',
    description: 'Owner Mr. Manish uses SnapBizz to run store operations with ease.',
    videoId: 'nn4QpzyoGOs',
  },
]

const brandServices = [
  {
    title: 'Use analytics to track brand performances and make impactful decisions',
    description: 'Use point-of-sale purchase insights to understand shopper behavior and measure promotions.',
    videoId: '2oQNhf2pUQ0',
  },
  {
    title: 'Make your products stand out at the stores',
    description: 'Highlight products and promotions through digital merchandising at the point of sale.',
    videoId: '_AYGo2V84uE',
  },
  {
    title: 'Engage your customers contextually both in and out of the store',
    description: 'Reach shoppers through in-store displays, SMS, and contextual messaging on printed bills.',
    videoId: 'T-iLhCjSVjg',
  },
]

export function CompanyPage({ id }: { id: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const page = companyPages.find((item) => item.id === id)

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [id])

  if (!page) {
    return (
      <section className="brand-wash min-h-[70vh] pb-20 pt-32">
        <Container>
          <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-bold">Company page not found</h1>
          <p className="my-6">This page is not available. Use the company links below or return home.</p>
          <Button href="#top">Back to home</Button>
        </Container>
      </section>
    )
  }

  const Icon = page.icon

  return (
    <>
      <section className="brand-wash bg-surface pb-10 pt-24 sm:pb-20 sm:pt-32">
        <Container>
          <SiteLink href="#top" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
          </SiteLink>
          <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-blue shadow-soft sm:mt-8">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue-dark">{page.label}</p>
          <h1 ref={headingRef} tabIndex={-1} className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight focus:outline-none sm:text-5xl">{page.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed">{page.description}</p>
          {page.draft ? (
            <p className="mt-6 max-w-2xl rounded-2xl border border-brand-yellow/30 bg-brand-yellow/10 px-5 py-4 text-sm font-medium text-ink-700">
              Draft for review. This page needs approved legal content before publication.
            </p>
          ) : null}
        </Container>
      </section>
      <section className="brand-wash bg-surface-soft py-10 sm:py-20">
        <Container className="grid gap-6 sm:gap-10 lg:grid-cols-[1fr_17rem] lg:items-start">
          <div className="min-w-0 space-y-5">
            {page.id === 'brands' ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {brandServices.map((service) => (
                  <article key={service.videoId} className="min-w-0 overflow-hidden rounded-lg border border-line bg-white">
                    <div className="relative w-full bg-ink" style={{ aspectRatio: '16 / 9' }}>
                      <iframe
                        className="absolute inset-0 h-full w-full border-0"
                        src={`https://www.youtube-nocookie.com/embed/${service.videoId}`}
                        title={service.title}
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-5">
                      <h2 className="text-lg font-semibold leading-snug text-ink">{service.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-ink-500">{service.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : page.id === 'retailer-testimonials' ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {retailerTestimonials.map((testimonial) => (
                  <article key={testimonial.videoId} className="min-w-0 overflow-hidden rounded-lg border border-line bg-white">
                    <div className="relative w-full bg-ink" style={{ aspectRatio: '16 / 9' }}>
                      <iframe
                        className="absolute inset-0 h-full w-full border-0"
                        src={`https://www.youtube-nocookie.com/embed/${testimonial.videoId}`}
                        title={testimonial.title}
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-5">
                      <h2 className="text-lg font-semibold leading-snug text-ink">{testimonial.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-ink-500">{testimonial.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : page.id === 'privacy' ? <PrivacyPolicy /> : page.id === 'terms' ? <TermsAndConditions /> : page.sections.map((section) => page.id === 'faq' ? (
              <details key={section.title} className="group rounded-2xl border border-line bg-white p-6 shadow-sm">
                <summary className="cursor-pointer text-base font-semibold text-ink marker:text-brand-blue">{section.title}</summary>
                <p className="mt-4 text-sm leading-relaxed">{section.body}</p>
              </details>
            ) : (
              <article key={section.title} className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="mt-3 leading-relaxed">{section.body}</p>
              </article>
            ))}
            {page.id === 'faq' ? <ProductFaqLibrary /> : null}
            {!page.legal && page.id !== 'careers' ? (
              <div className="rounded-2xl bg-brand-blue-light p-6">
                <h2 className="text-xl font-semibold">Explore the right solution for your business.</h2>
                <p className="mt-3 text-sm leading-relaxed">Browse the platform or visit the Contact section to review the enquiry details.</p>
                <Button href="#contact" className="mt-5" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>Contact SnapBizz</Button>
              </div>
            ) : null}
          </div>
          <nav aria-label="Company pages" className="rounded-2xl border border-line bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="px-3 text-sm font-semibold">Explore SnapBizz</h2>
            <ul className="mt-4 space-y-1">
              {companyPages.map((item) => (
                <li key={item.id}>
                  <a href={companyPageHref(item.id)} aria-current={item.id === page.id ? 'page' : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${item.id === page.id ? 'bg-brand-blue-light font-semibold text-brand-blue-dark' : 'hover:bg-surface-soft hover:text-brand-blue-dark'}`}>
                    <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </>
  )
}
