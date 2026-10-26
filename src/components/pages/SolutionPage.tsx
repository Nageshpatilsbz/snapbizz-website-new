import { ArrowLeft, ArrowRight } from 'lucide-react'
import { solutions } from '../../data/content'
import { solutionHref } from '../../lib/urls'
import { Solutions } from '../sections/Solutions'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { SiteLink } from '../ui/SiteLink'

export function SolutionPage({ id }: { id: string }) {
  const solution = solutions.find((item) => item.id === id)!

  return (
    <>
      <section className="brand-wash bg-surface pb-12 pt-32">
        <Container>
          <SiteLink href="#solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-dark">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All solutions
          </SiteLink>
          <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-brand-blue-dark">{solution.platform}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{solution.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed">{solution.description}</p>
          <Button href="#contact" className="mt-6">Discuss Your Requirements</Button>
        </Container>
      </section>
      <Solutions solutionId={id} />
      <section className="brand-wash bg-surface py-16">
        <Container>
          <h2 className="text-2xl font-semibold">Explore related solutions</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.filter((item) => item.id !== id).map((item) => (
              <li key={item.id}>
                <a href={solutionHref(item.id)} className="block h-full rounded-2xl border border-line bg-white p-5 shadow-sm transition-colors hover:border-brand-blue">
                  <h3 className="flex items-center justify-between gap-3 font-semibold">{item.title}<ArrowRight className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" /></h3>
                  <p className="mt-3 text-sm leading-relaxed">{item.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
