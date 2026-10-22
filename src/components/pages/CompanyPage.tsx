import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { companyPageHref, companyPages } from '../../data/companyPages'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

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
      <section className="brand-wash bg-surface pb-16 pt-32 sm:pb-20">
        <Container>
          <a href="#top" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
          </a>
          <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-blue shadow-soft">
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
      <section className="brand-wash bg-surface-soft py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_17rem] lg:items-start">
          <div className="min-w-0 space-y-5">
            {page.sections.map((section, index) => page.id === 'faq' ? (
              <details key={section.title} className="group rounded-2xl border border-line bg-white p-6 shadow-sm">
                <summary className="cursor-pointer text-base font-semibold text-ink marker:text-brand-blue">{section.title}</summary>
                <p className="mt-4 text-sm leading-relaxed">{section.body}</p>
              </details>
            ) : (
              <article key={section.title} className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
                <p className="text-xs font-semibold tabular-nums text-brand-blue">{String(index + 1).padStart(2, '0')}</p>
                <h2 className="mt-3 text-xl font-semibold">{section.title}</h2>
                <p className="mt-3 leading-relaxed">{section.body}</p>
              </article>
            ))}
            {!page.draft && page.id !== 'careers' ? (
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
