import { BarChart3, CreditCard, Landmark, Package, ShoppingBag, Smartphone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Logo } from '../ui/Logo'

const nodes = [
  { title: 'Bank partners', note: 'APOS & fintech', icon: Landmark, color: '#1765ee', x: 22, y: 20 },
  { title: 'Online orders', note: 'Snap order app', icon: Smartphone, color: '#00a878', x: 50, y: 7 },
  { title: 'Payments', note: 'UPI, cards, cash', icon: CreditCard, color: '#f59e0b', x: 80, y: 20 },
  { title: 'Inventory', note: 'Live stock', icon: Package, color: '#ef7d22', x: 22, y: 80 },
  { title: 'Business insights', note: 'Sales analytics', icon: BarChart3, color: '#ef5261', x: 80, y: 80 },
]

export default function HeroScene() {
  return (
    <div className="mx-auto w-full max-w-2xl lg:ml-auto lg:max-w-none lg:pl-12 xl:pl-20">
      <div
        role="img"
        aria-label="Connected SnapBizz ecosystem: a retail checkout linked to bank and fintech partners, inventory, online orders, digital payments, and business analytics"
        className="relative aspect-7/5 w-full select-none"
      >
        <div
          className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(23,101,238,0.16),rgba(0,168,120,0.07)_60%,transparent)]"
          aria-hidden="true"
        />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {nodes.map((node) => (
            <line
              key={node.title}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              stroke={node.color}
              strokeWidth="0.35"
              strokeLinecap="round"
              strokeDasharray="1.6 1.8"
              vectorEffect="non-scaling-stroke"
              className="hero-flow opacity-60"
            />
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
          <div className="hero-pulse absolute inset-0 rounded-[2rem] bg-brand-blue/30" />
          <div className="relative flex w-48 flex-col items-center gap-2 rounded-[2rem] bg-linear-to-br from-brand-blue to-[#0d4fc4] p-3 text-white shadow-[0_24px_50px_-12px_rgba(23,101,238,0.55)] sm:w-64 sm:p-4 lg:w-72">
            <span className="flex w-full items-center justify-center rounded-2xl bg-white px-3 py-3 sm:px-4 sm:py-4">
              <Logo className="[&_img]:h-14 sm:[&_img]:h-20 lg:[&_img]:h-24" />
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
            className="hero-float absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%`, '--hero-delay': `${index * -1.1}s` } as CSSProperties}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white bg-white/90 p-2 shadow-[0_14px_34px_-14px_rgba(32,44,60,0.35)] backdrop-blur sm:gap-3 sm:p-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white sm:h-10 sm:w-10"
                style={{ backgroundColor: node.color }}
              >
                <node.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <span className="hidden pr-1 sm:block">
                <span className="block text-sm font-semibold leading-tight text-ink">{node.title}</span>
                <span className="block text-xs text-ink-500">{node.note}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <ul aria-label="Ecosystem connections" className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 sm:hidden">
        {nodes.map((node) => (
          <li key={node.title} className="flex items-center gap-1.5 text-[11px] font-medium text-ink-700">
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ backgroundColor: node.color }} aria-hidden="true" />
            {node.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

