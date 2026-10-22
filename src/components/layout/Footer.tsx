import { industries, solutions } from '../../data/content'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              SnapBizz helps retailers digitize their stores with Turbo &amp; Neo POS solutions and
              enables banks and fintechs to offer merchant business applications, payment
              integrations, and customized enterprise workflows.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40">Solutions</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {solutions.map((solution) => (
                <li key={solution.id}>
                  <a href="#solutions" className="text-sm text-white/70 hover:text-white">
                    {solution.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40">Industries</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {industries.slice(0, 5).map((industry) => (
                <li key={industry.id}>
                  <a href="#industries" className="text-sm text-white/70 hover:text-white">
                    {industry.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} SnapBizz. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#contact" className="hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
