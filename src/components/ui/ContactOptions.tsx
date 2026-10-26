import { Mail, Phone } from 'lucide-react'

const contactOptions = [
  {
    label: 'Call us',
    value: '1800 103 9780',
    href: 'tel:18001039780',
    icon: Phone,
  },
  {
    label: 'Email us',
    value: 'market@snapbizz.com',
    href: 'mailto:market@snapbizz.com?Subject=Enquiry%20from%20Webpage',
    icon: Mail,
  },
]

export function ContactOptions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {contactOptions.map(({ label, value, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          className="group flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-white p-4 transition hover:border-brand-blue/40 hover:shadow-soft focus-visible:outline-brand-blue"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-light text-brand-blue-dark transition group-hover:bg-brand-blue-dark group-hover:text-white">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-medium text-ink-500">{label}</span>
            <span className="mt-0.5 block break-all text-sm font-semibold text-ink-700 group-hover:text-brand-blue-dark">
              {value}
            </span>
          </span>
        </a>
      ))}
    </div>
  )
}
