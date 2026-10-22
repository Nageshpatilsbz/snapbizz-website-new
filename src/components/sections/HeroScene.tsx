import { BarChart3, CreditCard, Handshake, Package, ShoppingBag, Smartphone, type LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Logo } from '../ui/Logo'

interface EcosystemNode {
  title: string
  note: string
  icon: LucideIcon
  artwork?: 'turbo' | 'neo' | 'mobile'
  color: string
  x: number
  y: number
  lx: number
  ly: number
}

const nodes: EcosystemNode[] = [
  { title: 'Bank partners', note: 'APOS & fintech', icon: Handshake, color: '#1765ee', x: 12, y: 22, lx: 10, ly: 19 },
  { title: 'Online orders', note: 'Snap order app', icon: Smartphone, artwork: 'mobile', color: '#00a878', x: 50, y: 14, lx: 50, ly: 18 },
  { title: 'Payments', note: 'UPI, cards, cash', icon: CreditCard, color: '#f59e0b', x: 88, y: 22, lx: 90, ly: 19 },
  { title: 'Turbo POS', note: 'Android', icon: ShoppingBag, artwork: 'turbo', color: '#0f9d58', x: 8, y: 54, lx: 6, ly: 53 },
  { title: 'Neo POS', note: 'Windows', icon: ShoppingBag, artwork: 'neo', color: '#1765ee', x: 92, y: 54, lx: 94, ly: 53 },
  { title: 'Inventory', note: 'Live stock', icon: Package, color: '#ef7d22', x: 22, y: 86, lx: 18, ly: 87 },
  { title: 'Business insights', note: 'Sales analytics', icon: BarChart3, color: '#ef5261', x: 78, y: 86, lx: 82, ly: 87 },
]

function NodeArtwork({ node }: { node: EcosystemNode }) {
  if (node.artwork === 'turbo') {
    return (
      <svg viewBox="0 0 112 104" className="h-full w-full" aria-hidden="true">
        <ellipse cx="56" cy="95" rx="40" ry="4" fill="#17263d" opacity="0.1" />
        <path d="M48 65h18l4 23H44z" fill="#aebdd5" />
        <rect x="34" y="87" width="46" height="6" rx="3" fill="#dbe5f3" />
        <rect x="12" y="10" width="88" height="59" rx="7" fill="#17263d" />
        <rect x="17" y="15" width="78" height="47" rx="3" fill="#f8fafc" />
        <path d="M20 15h72a3 3 0 0 1 3 3v8H17v-8a3 3 0 0 1 3-3" fill="#0f9d58" />
        <rect x="23" y="32" width="25" height="23" rx="3" fill="#d8f3e5" />
        <path d="M29 38h13M29 43h9M29 48h11" stroke="#0f9d58" strokeWidth="2" strokeLinecap="round" />
        <path d="M55 34h31M55 40h24M55 46h28" stroke="#bdcbdc" strokeWidth="3" strokeLinecap="round" />
        <rect x="73" y="51" width="14" height="6" rx="2" fill="#0f9d58" />
        <circle cx="56" cy="65" r="1.5" fill="#7c8da6" />
      </svg>
    )
  }

  if (node.artwork === 'neo') {
    return (
      <svg viewBox="0 0 120 104" className="h-full w-full" aria-hidden="true">
        <ellipse cx="60" cy="95" rx="49" ry="4" fill="#17263d" opacity="0.1" />
        <rect x="18" y="24" width="84" height="59" rx="5" fill="#17263d" />
        <rect x="23" y="29" width="74" height="48" rx="2" fill="#f8fafc" />
        <path d="M25 29h70a2 2 0 0 1 2 2v8H23v-8a2 2 0 0 1 2-2" fill="#4285f4" />
        <rect x="27" y="43" width="14" height="29" rx="2" fill="#e8f0fe" />
        <path d="M30 48h8M30 54h6M30 60h7" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" />
        <path d="M47 46h43M47 52h36" stroke="#bdcbdc" strokeWidth="3" strokeLinecap="round" />
        <rect x="47" y="59" width="12" height="11" rx="2" fill="#d8f3e5" />
        <rect x="63" y="59" width="12" height="11" rx="2" fill="#e8f0fe" />
        <rect x="79" y="59" width="12" height="11" rx="2" fill="#fff1cb" />
        <path d="M18 81h84l15 10a2 2 0 0 1-2 3H5a2 2 0 0 1-2-3z" fill="#dbe5f3" />
        <path d="M27 84h66l6 4H21z" fill="#aebdd5" />
        <path d="M48 90h24" stroke="#7c8da6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (node.artwork === 'mobile') {
    return (
      <svg viewBox="0 0 112 104" className="h-full w-full" aria-hidden="true">
        <ellipse cx="56" cy="97" rx="28" ry="4" fill="#17263d" opacity="0.1" />
        <rect x="31" y="4" width="50" height="90" rx="9" fill="#17263d" />
        <rect x="35" y="9" width="42" height="80" rx="6" fill="#f8fafc" />
        <path d="M46 9h20v3a3 3 0 0 1-3 3H49a3 3 0 0 1-3-3z" fill="#17263d" />
        <rect x="40" y="22" width="32" height="18" rx="4" fill="#00a878" />
        <path d="M48 28h15M48 33h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <rect x="40" y="46" width="13" height="13" rx="3" fill="#d8f3e5" />
        <rect x="59" y="46" width="13" height="13" rx="3" fill="#e8f0fe" />
        <path d="M41 65h29" stroke="#bdcbdc" strokeWidth="3" strokeLinecap="round" />
        <rect x="40" y="73" width="32" height="8" rx="3" fill="#00a878" />
      </svg>
    )
  }

  return (
    <span className="flex h-full w-full items-center justify-center" style={{ color: node.color }}>
      <node.icon className="h-11 w-11 sm:h-14 sm:w-14" strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} aria-hidden="true" />
    </span>
  )
}

export default function HeroScene() {
  return (
    <div className="mx-auto w-full max-w-2xl lg:ml-auto lg:max-w-none lg:pl-12 xl:pl-20">
      <div
        role="img"
        aria-label="Connected SnapBizz ecosystem: Turbo Android POS and Neo Windows POS linked to bank and fintech partners, inventory, online orders, digital payments, and business analytics"
        className="relative aspect-7/6 min-h-104 w-full select-none sm:min-h-0"
      >
        <div
          className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(23,101,238,0.16),rgba(0,168,120,0.07)_60%,transparent)]"
          aria-hidden="true"
        />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {nodes.map((node) => (
            <g key={node.title}>
              <line x1="50" y1="50" x2={node.x} y2={node.y} stroke={node.color} strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1.6 1.8" vectorEffect="non-scaling-stroke" className="hero-flow opacity-60 lg:hidden" />
              <line x1="50" y1="50" x2={node.lx} y2={node.ly} stroke={node.color} strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1.6 1.8" vectorEffect="non-scaling-stroke" className="hero-flow hidden opacity-60 lg:block" />
            </g>
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
          <div className="hero-pulse absolute inset-0 rounded-[2rem] bg-brand-blue/30" />
          <div className="relative flex w-32 flex-col items-center gap-2 rounded-[2rem] bg-linear-to-br from-brand-blue to-[#0d4fc4] p-3 text-white shadow-[0_24px_50px_-12px_rgba(23,101,238,0.55)] sm:w-48 xl:w-52 xl:p-4 2xl:w-64">
            <span className="flex w-full items-center justify-center rounded-2xl bg-white px-2 py-3 sm:px-3">
              <Logo className="[&_img]:h-12 sm:[&_img]:h-14 xl:[&_img]:h-16 2xl:[&_img]:h-20" />
            </span>
            <span className="flex w-full flex-col gap-1">
              <span className="h-1.5 w-full rounded-full bg-white/30" />
              <span className="h-1.5 w-3/4 rounded-full bg-white/30" />
              <span className="h-1.5 w-1/2 rounded-full bg-white/60" />
            </span>
            <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-green shadow-md">
              <ShoppingBag className="h-4 w-4" />
            </span>
          </div>
        </div>

        {nodes.map((node, index) => (
          <div
            key={node.title}
            className="hero-float absolute left-(--x) top-(--y) lg:left-(--lx) lg:top-(--ly) motion-reduce:-translate-x-1/2 motion-reduce:-translate-y-1/2"
            style={{
              '--x': `${node.x}%`,
              '--y': `${node.y}%`,
              '--lx': `${node.lx}%`,
              '--ly': `${node.ly}%`,
              '--hero-delay': `${index * -1.1}s`,
            } as CSSProperties}
          >
            <div className="flex w-20 flex-col items-center rounded-2xl border border-white bg-white/95 px-1.5 pb-2 text-center shadow-[0_14px_34px_-14px_rgba(32,44,60,0.35)] sm:w-32 sm:px-2 sm:pb-3 xl:w-36">
              <span className="-mt-5 mb-1 block h-14 w-16 drop-shadow-sm sm:-mt-6 sm:h-18 sm:w-24">
                <NodeArtwork node={node} />
              </span>
              <span className="block text-[10px] font-semibold leading-tight text-ink sm:text-xs xl:text-sm">{node.title}</span>
              <span className="mt-0.5 block text-[9px] leading-tight text-ink-500 sm:text-[11px] xl:text-xs">{node.note}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
