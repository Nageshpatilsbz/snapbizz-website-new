import {
  Banknote,
  BarChart3,
  Building2,
  CloudUpload,
  CreditCard,
  FileCheck2,
  Landmark,
  Layers,
  LayoutDashboard,
  Network,
  ReceiptText,
  ScanBarcode,
  Smartphone,
  UserPlus,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export interface Step {
  icon: LucideIcon
  label: string
  detail: string
}

const flows: Record<string, Step[]> = {
  'turbo-neo-retail-pos': [
    { icon: ScanBarcode, label: 'Scan', detail: 'Barcode or product lookup' },
    { icon: ReceiptText, label: 'Bill & Pay', detail: 'Cash, UPI or card' },
    { icon: CloudUpload, label: 'Sync', detail: 'Cloud backup of every sale' },
    { icon: BarChart3, label: 'Insights', detail: 'Reports and dashboards' },
  ],
  'bank-branded-apos': [
    { icon: Landmark, label: 'Bank Brand', detail: 'Your logo and identity' },
    { icon: UserPlus, label: 'Onboard', detail: 'Merchants join the program' },
    { icon: Smartphone, label: 'Accept', detail: 'Payments at the counter' },
    { icon: Wallet, label: 'Settle', detail: 'Funds reach the bank' },
  ],
  'custom-enterprise': [
    { icon: Layers, label: 'Requirements', detail: 'Mapped to your workflow' },
    { icon: Network, label: 'Integrate', detail: 'ERP and existing systems' },
    { icon: Building2, label: 'Roll Out', detail: 'Multi-store deployment' },
    { icon: LayoutDashboard, label: 'Monitor', detail: 'One central view' },
  ],
  'payment-collection': [
    { icon: CreditCard, label: 'Collect', detail: 'Multiple payment modes' },
    { icon: FileCheck2, label: 'Reconcile', detail: 'Match payments to bills' },
    { icon: Banknote, label: 'Settle', detail: 'Clear, trackable payouts' },
    { icon: BarChart3, label: 'Report', detail: 'Audit-ready statements' },
  ],
}

export function SolutionFlow({ solutionId }: { solutionId: string }) {
  const steps = flows[solutionId]
  if (!steps) return null
  return <FlowDiagram steps={steps} />
}

export function FlowDiagram({ steps, title = 'How it works' }: { steps: Step[]; title?: string }) {
  return (
    <div
      className="mt-10 rounded-3xl border border-line bg-white px-3 py-8 shadow-sm sm:px-8 lg:py-12"
      role="img"
      aria-label={`${title}: ${steps.map((step) => step.label).join(', then ')}`}
    >
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-brand-blue">
        {title}
      </p>
      <div className="relative grid grid-cols-4">
        <div className="absolute inset-x-[12.5%] top-8 h-1 rounded-full bg-line" aria-hidden="true">
          <span className="flow-dot absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-linear-to-r from-brand-blue to-brand-green shadow-md shadow-brand-blue/50" />
        </div>
        {steps.map((step, index) => (
          <div key={step.label} className="relative flex flex-col items-center gap-2 text-center">
            <span
              className="flow-node relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-line bg-white text-ink-500"
              style={{ animationDelay: `${index * 1.6}s` }}
            >
              <step.icon className="h-7 w-7" />
            </span>
            <span className="text-sm font-semibold text-ink sm:text-lg">{step.label}</span>
            <span className="hidden max-w-44 text-sm leading-snug text-ink-500 sm:block">{step.detail}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
