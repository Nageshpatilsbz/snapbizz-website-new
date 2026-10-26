import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { MouseEvent } from 'react'
import { industries } from '../../data/content'
import type { BrandAccent, Industry } from '../../types'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { siteHref } from '../../lib/urls'

const gradients: Record<BrandAccent, string> = {
  blue: 'from-brand-blue to-[#1fc1e0]',
  red: 'from-brand-red to-[#f08a24]',
  yellow: 'from-[#f4b400] to-[#f08a24]',
  green: 'from-brand-green to-[#1fc1e0]',
}

const glows: Record<BrandAccent, string> = {
  blue: 'hover:shadow-[0_24px_48px_-12px_rgba(66,133,244,0.45)]',
  red: 'hover:shadow-[0_24px_48px_-12px_rgba(219,68,55,0.4)]',
  yellow: 'hover:shadow-[0_24px_48px_-12px_rgba(244,180,0,0.5)]',
  green: 'hover:shadow-[0_24px_48px_-12px_rgba(15,157,88,0.4)]',
}

const tints: Record<BrandAccent, string> = {
  blue: 'from-[#e8f0fe]',
  red: 'from-[#fdecea]',
  yellow: 'from-[#fff6dc]',
  green: 'from-[#e3f6ec]',
}

function TiltCard({ industry, index }: { industry: Industry; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9])
  const Icon = industry.icon

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.a
        href={siteHref(`#/industry/${industry.id}`)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`group relative flex h-full cursor-pointer flex-col gap-4 overflow-hidden rounded-3xl border border-line bg-linear-to-br ${tints[industry.accent]} via-white to-white p-6 shadow-card transition-shadow duration-300 ${glows[industry.accent]}`}
      >
        <div className="card-sheen" style={{ animationDelay: `${index * 0.45}s` }} />
        <div className={`absolute inset-x-0 top-0 h-1.5 bg-linear-to-r ${gradients[industry.accent]}`} />
        <div
          className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-linear-to-br ${gradients[industry.accent]} opacity-15 blur-2xl transition-opacity group-hover:opacity-35`}
        />
        <div
          style={{ transform: 'translateZ(40px)' }}
          className={`icon-glint relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${gradients[industry.accent]} text-white shadow-lg ring-4 ring-white`}
        >
          <Icon className="h-7 w-7" />
        </div>
        <h3 style={{ transform: 'translateZ(25px)' }} className="text-lg font-semibold text-ink">
          {industry.title}
        </h3>
        <p style={{ transform: 'translateZ(15px)' }} className="text-sm leading-relaxed text-ink-500">
          {industry.description}
        </p>
        <span
          style={{ transform: 'translateZ(30px)' }}
          className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-dark"
        >
          View details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
        </span>
      </motion.a>
    </motion.div>
  )
}

export function Industries() {
  return (
    <section id="industries" className="brand-wash bg-surface-soft py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Industries"
          title="Purpose-Built Solutions for Every Workflow"
          description="Each industry has its own billing, collection, and reporting needs. Our platform adapts to every one of them."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <TiltCard key={industry.id} industry={industry} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
