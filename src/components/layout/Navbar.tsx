import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navItems } from '../../data/content'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { SiteLink } from '../ui/SiteLink'

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)
  const dropdownRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setIsScrolled(y > 12)
      const delta = y - lastY
      if (y < 120) setIsHidden(false)
      else if (delta > 14) setIsHidden(true)
      else if (delta < -10) setIsHidden(false)
      if (Math.abs(delta) > 10) lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hidden = isHidden && !isMobileOpen && openDropdown === null

  useEffect(() => {
    document.documentElement.dataset.nav = hidden ? 'hidden' : 'shown'
  }, [hidden])

  useEffect(() => {
    if (!isMobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMobileOpen])

  useEffect(() => {
    const closeMenus = () => {
      setOpenDropdown(null)
      setIsMobileOpen(false)
    }
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeMenus()
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onBreakpoint = () => {
      if (desktop.matches) setIsMobileOpen(false)
      else setOpenDropdown(null)
    }
    window.addEventListener('hashchange', closeMenus)
    document.addEventListener('pointerdown', closeOutside)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      window.removeEventListener('hashchange', closeMenus)
      document.removeEventListener('pointerdown', closeOutside)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
          setIsMobileOpen(false)
          setOpenDropdown(null)
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return
        if (isMobileOpen) {
          setIsMobileOpen(false)
          mobileButtonRef.current?.focus()
        } else if (openDropdown) {
          dropdownRefs.current[openDropdown]?.focus()
          setOpenDropdown(null)
        }
      }}
      className={`fixed inset-x-0 top-0 z-50 will-change-transform transition-[transform,opacity,background-color,box-shadow,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      } ${isScrolled ? 'bg-white/85 shadow-soft backdrop-blur-lg' : 'bg-transparent'}`}
    >
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-3 lg:px-8"
        aria-label="Primary"
      >
        <SiteLink href="#top" className="flex shrink-0 items-center" aria-label="SnapBizz home">
          <Logo className="[&_img]:h-13 sm:[&_img]:h-14" />
        </SiteLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.items && setOpenDropdown(item.label)}
              onMouseLeave={(event) => {
                if (item.items && !event.currentTarget.contains(document.activeElement)) setOpenDropdown(null)
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpenDropdown(null)
              }}
            >
              {item.items ? (
                <button
                  ref={(element) => { dropdownRefs.current[item.label] = element }}
                  type="button"
                  onClick={(event) => setOpenDropdown((open) => event.detail === 0 && open === item.label ? null : item.label)}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-surface-soft hover:text-brand-blue"
                  aria-expanded={openDropdown === item.label}
                  aria-controls={openDropdown === item.label ? `nav-${item.label.toLowerCase()}` : undefined}
                >
                  {item.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              ) : (
                <SiteLink href={item.href} className="flex rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-surface-soft hover:text-brand-blue">
                  {item.label}
                </SiteLink>
              )}

              <AnimatePresence>
                {item.items && openDropdown === item.label ? (
                  <motion.div
                    id={`nav-${item.label.toLowerCase()}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full max-h-[calc(100dvh-6rem)] w-80 -translate-x-1/2 overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white p-2 shadow-card"
                  >
                    <SiteLink href={item.href} onClick={() => setOpenDropdown(null)} className="mb-1 block rounded-xl bg-brand-blue-light px-3 py-3 text-sm font-semibold text-brand-blue-dark hover:bg-brand-blue/15">
                      {item.label === 'Company' ? 'About SnapBizz' : `Explore All ${item.label}`}
                    </SiteLink>
                    {item.items.map((dropdownItem) => (
                      <SiteLink
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-soft"
                      >
                        <dropdownItem.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
                        <span>
                          <span className="block text-sm font-semibold text-ink">{dropdownItem.label}</span>
                          <span className="mt-0.5 block text-xs text-ink-500">{dropdownItem.description}</span>
                        </span>
                      </SiteLink>
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
          ref={mobileButtonRef}
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-ink lg:hidden"
          onClick={() => setIsMobileOpen((open) => !open)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <div className="flex max-h-[calc(100dvh-4.5rem)] flex-col gap-1 overflow-y-auto overscroll-contain px-6 py-4">
              {navItems.map((item) => (
                item.items ? (
                  <details key={item.label} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-surface-soft [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <div className="mb-2 ml-3 flex flex-col gap-0.5 border-l border-line pl-3">
                      <SiteLink href={item.href} onClick={() => setIsMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-blue-dark hover:bg-surface-soft">
                        {item.label === 'Company' ? 'About SnapBizz' : `Explore All ${item.label}`}
                      </SiteLink>
                      {item.items.map((dropdownItem) => (
                        <SiteLink
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-ink-500 hover:bg-surface-soft hover:text-brand-blue"
                        >
                          {dropdownItem.label}
                        </SiteLink>
                      ))}
                    </div>
                  </details>
                ) : (
                  <SiteLink key={item.label} href={item.href} onClick={() => setIsMobileOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-surface-soft">
                    {item.label}
                  </SiteLink>
                )
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
