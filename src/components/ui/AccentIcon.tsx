import type { LucideIcon } from 'lucide-react'
import type { BrandAccent } from '../../types'

interface AccentIconProps {
  icon: LucideIcon
  accent: BrandAccent
  className?: string
  size?: 'sm' | 'md'
}

const sizeClasses: Record<'sm' | 'md', string> = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
}

const accentStyles: Record<BrandAccent, { bg: string; text: string }> = {
  blue: { bg: 'bg-brand-blue/10', text: 'text-brand-blue' },
  red: { bg: 'bg-brand-red/10', text: 'text-brand-red' },
  yellow: { bg: 'bg-brand-yellow/15', text: 'text-brand-yellow' },
  green: { bg: 'bg-brand-green/10', text: 'text-brand-green' },
}

export function AccentIcon({ icon: Icon, accent, className = '', size = 'md' }: AccentIconProps) {
  const styles = accentStyles[accent]
  return (
    <span
      className={`inline-flex ${sizeClasses[size]} shrink-0 items-center justify-center rounded-xl ${styles.bg} ${styles.text} ${className}`}
    >
      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
    </span>
  )
}

export const accentTextClass: Record<BrandAccent, string> = {
  blue: 'text-brand-blue',
  red: 'text-brand-red',
  yellow: 'text-brand-yellow',
  green: 'text-brand-green',
}

export const accentBorderClass: Record<BrandAccent, string> = {
  blue: 'border-brand-blue',
  red: 'border-brand-red',
  yellow: 'border-brand-yellow',
  green: 'border-brand-green',
}

export const accentBgClass: Record<BrandAccent, string> = {
  blue: 'bg-brand-blue',
  red: 'bg-brand-red',
  yellow: 'bg-brand-yellow',
  green: 'bg-brand-green',
}

export const accentSoftClass: Record<BrandAccent, string> = {
  blue: 'bg-brand-blue/[0.06]',
  red: 'bg-brand-red/[0.06]',
  yellow: 'bg-brand-yellow/[0.08]',
  green: 'bg-brand-green/[0.06]',
}
