import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, BarChart3, Check, ChevronRight, LayoutDashboard } from 'lucide-react'
import { useId, useState } from 'react'
import type { PointerEvent } from 'react'
import { platformFeatureDetails, platformFeatures, retailServices } from '../../data/content'
import { accentSoftClass, accentTextClass } from '../ui/AccentIcon'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Platform() {
  const reducedMotion = useReducedMotion()
  const explorerId = useId()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedFeature = platformFeatures[selectedIndex]
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const light = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 170, damping: 24 })
  const rotateY = useSpring(tiltY, { stiffness: 170, damping: 24 })
  const lightOpacity = useSpring(light, { stiffness: 130, damping: 24 })
  const lightPosition = useTransform(rotateY, [-6, 6], [0, 100])
  const backgroundPosition = useMotionTemplate`${lightPosition}% 50%`

  const moveDashboard = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    tiltX.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 9)
    tiltY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12)
    light.set(1)
  }

  const resetDashboard = () => {
    tiltX.set(0)
    tiltY.set(0)
    light.set(0)
  }

  return (
    <section id="platform" className="bg-surface py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Platform"
          title="More Than Billing: A Connected Retail Ecosystem"
          description="Connect store operations, digital commerce, customer engagement, and business insights with services suited to your deployment."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            onPointerMove={moveDashboard}
            onPointerLeave={resetDashboard}
            onPointerCancel={resetDashboard}
            style={{ perspective: 1200 }}
            className="relative min-w-0 py-4"
          >
            <motion.div
              data-dashboard-preview
              style={{
                rotateX: reducedMotion ? 0 : rotateX,
                rotateY: reducedMotion ? 0 : rotateY,
                transformStyle: 'preserve-3d',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset -1px 0 0 rgba(255,255,255,0.08), 0 3px 0 #424b59, 0 7px 0 -1px #2a323e, 0 11px 0 -2px #18202c, 0 18px 24px -12px rgba(11,14,20,0.55), 12px 34px 56px -14px rgba(11,14,20,0.32)',
              }}
              className="relative rounded-lg border border-white/20 bg-ink p-5 sm:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-br from-white/10 via-transparent to-brand-blue/5"
              />
              <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5 text-white/80">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <LayoutDashboard className="h-4 w-4 text-brand-blue" /> Business Dashboard
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" /> Preview
                </span>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
              {[
                { label: 'Stores', value: '12', accent: 'bg-brand-blue' },
                { label: 'Devices', value: '48', accent: 'bg-brand-green' },
                { label: 'Collections', value: '\u20B9 18.2L', accent: 'bg-brand-yellow' },
                { label: 'Pending', value: '3', accent: 'bg-brand-red' },
              ].map((stat) => (
                <div key={stat.label} className="min-w-0 border-l border-white/10 pl-3">
                  <span className={`inline-block h-1 w-5 rounded-full ${stat.accent}`} />
                  <p className="mt-2 text-lg font-bold text-white sm:text-xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/60">{stat.label}</p>
                </div>
              ))}
              </div>

              <div className="relative mt-8">
                <div className="mb-4 flex items-center gap-2 text-xs text-white/70">
                  <BarChart3 className="h-3.5 w-3.5 text-brand-blue" aria-hidden="true" />
                  Collection activity
                </div>
                <div
                  role="img"
                  aria-label="Illustrative collection activity chart, not live business data"
                  className="relative flex h-32 items-end gap-2 border-b border-white/15 px-1"
                  style={{ backgroundImage: 'repeating-linear-gradient(to top, transparent 0, transparent 31px, rgba(255,255,255,0.06) 31px, rgba(255,255,255,0.06) 32px)' }}
                >
                  {[30, 46, 38, 62, 50, 74, 58, 82, 66, 90, 70, 96].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={reducedMotion ? false : { scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, delay: index * 0.045, ease: 'easeOut' }}
                      className="relative min-w-0 flex-1 origin-bottom rounded-t-sm border-t border-white/40 bg-linear-to-t from-brand-blue/25 to-brand-blue"
                      style={{ height: `${height}%` }}
                    >
                      <span className="absolute inset-y-0 right-0 w-1 bg-black/15" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative mt-5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/50">
                <span>Multi-store &middot; multi-device</span>
                <span>Example data</span>
              </div>
              <motion.div
                aria-hidden="true"
                style={{ opacity: reducedMotion ? 0 : lightOpacity, backgroundPosition, backgroundSize: '200% 100%' }}
                className="pointer-events-none absolute inset-0 rounded-lg bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.02)_55%,transparent_80%)]"
              />
            </motion.div>
          </motion.div>

          <div className="min-w-0" aria-labelledby={`${explorerId}-heading`}>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 id={`${explorerId}-heading`} className="text-sm font-semibold text-ink">Platform Capabilities</h3>
              <span className="text-xs tabular-nums text-ink-500">
                <span className="font-semibold text-ink">{String(selectedIndex + 1).padStart(2, '0')}</span>
                <span className="mx-1.5 text-ink-300">/</span>
                {String(platformFeatures.length).padStart(2, '0')}
              </span>
            </div>
            <div
              role="tablist"
              aria-label="Platform capabilities"
              className="grid grid-cols-2 gap-2"
              onKeyDown={(event) => {
                const offsets: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 2, ArrowUp: -2 }
                let nextIndex: number
                if (event.key === 'Home') nextIndex = 0
                else if (event.key === 'End') nextIndex = platformFeatures.length - 1
                else if (event.key in offsets) nextIndex = (selectedIndex + offsets[event.key] + platformFeatures.length) % platformFeatures.length
                else return
                event.preventDefault()
                setSelectedIndex(nextIndex)
                event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus()
              }}
            >
              {platformFeatures.map((feature, index) => {
                const isSelected = selectedIndex === index
                return (
                  <button
                    key={feature.title}
                    id={`${explorerId}-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`${explorerId}-panel`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelectedIndex(index)}
                    className={`group flex min-h-16 min-w-0 items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                      isSelected ? `border-ink/20 ${accentSoftClass[feature.accent]} shadow-sm` : 'border-line bg-white hover:bg-surface-soft'
                    }`}
                  >
                    <feature.icon className={`h-4 w-4 shrink-0 ${isSelected ? accentTextClass[feature.accent] : 'text-ink-300'}`} aria-hidden="true" />
                    <span className={`min-w-0 flex-1 text-xs font-semibold leading-snug ${isSelected ? 'text-ink' : 'text-ink-500'}`}>{feature.title}</span>
                    <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-opacity ${isSelected ? 'text-ink opacity-100' : 'text-ink-300 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'}`} aria-hidden="true" />
                  </button>
                )
              })}
            </div>

            <div
              id={`${explorerId}-panel`}
              role="tabpanel"
              aria-labelledby={`${explorerId}-tab-${selectedIndex}`}
              tabIndex={0}
              className="mt-6 min-h-80 border-t border-line pt-5 sm:min-h-72"
            >
              <motion.div
                key={selectedFeature.title}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
              >
                <div className="flex items-center gap-2.5">
                  <selectedFeature.icon className={`h-5 w-5 shrink-0 ${accentTextClass[selectedFeature.accent]}`} aria-hidden="true" />
                  <h4 className="text-lg font-semibold leading-snug text-ink">{selectedFeature.title}</h4>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{selectedFeature.description}</p>
                <ul className="mt-4 space-y-2.5">
                  {platformFeatureDetails[selectedFeature.title].map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-xs leading-relaxed text-ink-700">
                      <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${accentTextClass[selectedFeature.accent]}`} aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-brand-blue-dark hover:text-ink">
                  Discuss Your Requirements <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="border-t border-line pt-10">
          <h3 className="text-xl font-semibold text-ink">Connected Services for Everyday Retail</h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {retailServices.map((service) => (
              <li key={service.name} className="border-l-2 border-brand-green pl-4">
                <h4 className="text-base font-semibold text-ink">{service.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{service.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-ink-500">
            Product availability and feature coverage may vary by solution, deployment, and partnership.
          </p>
        </div>
      </Container>
    </section>
  )
}
