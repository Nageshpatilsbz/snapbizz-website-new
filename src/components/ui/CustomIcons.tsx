import type { LucideIcon } from 'lucide-react'

type IconProps = React.SVGProps<SVGSVGElement>

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const TempleIcon = ((props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 2v3" />
    <path d="M8 9a4 4 0 0 1 8 0" />
    <path d="M5 21V13h14v8" />
    <path d="M3 21h18" />
    <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
    <path d="M7 13V9.5M17 13V9.5" />
  </svg>
)) as unknown as LucideIcon

export const TrafficSignalIcon = ((props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="7" y="2" width="10" height="20" rx="3" />
    <circle cx="12" cy="7" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="12" cy="17" r="1.6" />
  </svg>
)) as unknown as LucideIcon
