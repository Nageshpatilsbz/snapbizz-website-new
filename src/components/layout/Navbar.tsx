import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navItems } from '../../data/content'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 shadow-soft backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-3 lg:px-8" aria-label="Primary">
        <a href="#top" className="flex items-center" aria-label="SnapBizz home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.items && setOpenDropdown(item.label)}
              onMouseLeave={() => item.items && setOpenDropdown(null)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-surface-soft hover:text-brand-blue"
                aria-expanded={item.items ? openDropdown === item.label : undefined}
                aria-haspopup={item.items ? 'true' : undefined}
              >
                {item.label}
                {item.items ? <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /> : null}
              </a>

              <AnimatePresence>
                {item.items && openDropdown === item.label ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full w-80 rounded-2xl border border-line bg-white p-2 shadow-card"
                  >
                    {item.items.map((dropdownItem) => (
                      <a
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-soft"
                      >
                        <dropdownItem.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
                        <span>
                          <span className="block text-sm font-semibold text-ink">{dropdownItem.label}</span>
                          <span className="mt-0.5 block text-xs text-ink-500">{dropdownItem.description}</span>
                        </span>
                      </a>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#contact" variant="primary">
            Request a Demo
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-ink lg:hidden"
          onClick={() => setIsMobileOpen((open) => !open)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-ink-700 hover:bg-surface-soft"
                  >
                    {item.label}
                  </a>
                  {item.items ? (
                    <div className="ml-3 flex flex-col gap-0.5 border-l border-line pl-3">
                      {item.items.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-ink-500 hover:bg-surface-soft hover:text-brand-blue"
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <Button href="#contact" variant="primary" className="mt-3 w-full" onClick={() => setIsMobileOpen(false)}>
                Request a Demo
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
