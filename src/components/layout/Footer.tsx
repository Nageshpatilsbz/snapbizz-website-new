import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { companyPageHref, companyPages } from '../../data/companyPages'
import { industries, retailServices, solutions } from '../../data/content'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

const linkClass = 'inline-block rounded-sm text-sm leading-relaxed text-white/80 transition-colors hover:text-white hover:underline underline-offset-4 focus-visible:outline-white'
const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-[#0b2a6b] via-[#183e82] to-[#105b61] text-white">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-5 border-b border-white/15 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Let's build what's next</p>
            <h2 className="mt-3 text-2xl font-semibold !text-white sm:text-3xl">Built for Business. Designed for Growth.</h2>
          </div>
          <a href="#contact" className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-blue-dark transition-colors hover:bg-brand-blue-light">
            Explore a Demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1.15fr_1fr_1fr_1fr_0.85fr]">
          <div className="sm:col-span-2 lg:col-span-4 xl:col-span-1">
            <a href="#top" aria-label="SnapBizz home" className="inline-flex rounded-2xl focus-visible:outline-white">
              <Logo variant="light" className="rounded-2xl px-4 py-3 shadow-lg [&_img]:h-12" />
            </a>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
              Connecting retail checkout, banking solutions, and enterprise payment operations through Android and Windows POS, web services, and tailored business workflows.
            </p>
            <a href={companyPageHref('about')} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline underline-offset-4">
              Get to know SnapBizz <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Footer solutions">
            <h3 className="text-xs font-semibold uppercase tracking-wider !text-white">Solutions</h3>
            <ul className="mt-5 space-y-3">
              {solutions.map((solution) => (
                <li key={solution.id}><a href={`#solution-${solution.id}`} className={linkClass}>{solution.title}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer industries">
            <h3 className="text-xs font-semibold uppercase tracking-wider !text-white">Industries</h3>
            <ul className="mt-5 space-y-3">
              {industries.map((industry) => (
                <li key={industry.id}><a href={`#/industry/${industry.id}`} className={linkClass}>{industry.title}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer platform">
            <h3 className="text-xs font-semibold uppercase tracking-wider !text-white">Platform & Services</h3>
            <ul className="mt-5 space-y-3">
              <li><a href="#platform" className={linkClass}>Platform Overview</a></li>
              {retailServices.map((service) => (
                <li key={service.id}><a href={`#service-${service.id}`} className={linkClass}>{service.name}</a></li>
              ))}
              <li><a href="#how-it-works" className={linkClass}>How It Works</a></li>
              <li><a href="#why-us" className={linkClass}>Why SnapBizz</a></li>
            </ul>
          </nav>

          <nav aria-label="Footer company">
            <h3 className="text-xs font-semibold uppercase tracking-wider !text-white">Company</h3>
            <ul className="mt-5 space-y-3">
              {companyPages.filter((page) => !page.legal).map((page) => (
                <li key={page.id}><a href={companyPageHref(page.id)} className={linkClass}>{page.label}</a></li>
              ))}
              <li><a href="#contact" className={linkClass}>Contact Us</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-6 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} SnapBizz. All rights reserved.</p>
          <nav aria-label="Legal and home">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {companyPages.filter((page) => page.legal).map((page) => (
                <li key={page.id}><a href={companyPageHref(page.id)} className="hover:text-white hover:underline underline-offset-4">{page.label}{page.draft ? <span className="text-white/50"> (Draft)</span> : null}</a></li>
              ))}
              <li><a href="#top" className="hover:text-white hover:underline underline-offset-4">Back to home &uarr;</a></li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
