import { ArrowUpRight, Building2, MapPin, Navigation } from 'lucide-react'
import { Container } from '../ui/Container'

const companyName = 'Snapbizz Cloudtech Pvt. Ltd.'
const addressLines = [
  'No. 5/1 Gulmohar Enclave, Kundanahalli Gate,',
  'Marathahalli Post, Bengaluru - 560037',
]
const mapQuery = encodeURIComponent(`${companyName}, ${addressLines.join(' ')}`)
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`

export function OfficeLocation() {
  return (
    <section id="office-location" aria-labelledby="office-location-heading" className="brand-wash scroll-mt-24 bg-surface py-16 sm:py-20">
      <Container>
        <div className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-soft lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col items-start p-6 sm:p-8 lg:p-10">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue-dark">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Find us in Bengaluru
            </p>
            <h2 id="office-location-heading" className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Our Office</h2>
            <div className="mt-6 flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-light text-brand-blue">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <address className="min-w-0 not-italic">
                <p className="font-semibold text-ink">{companyName}</p>
                <p className="mt-2 text-sm leading-relaxed">
                  {addressLines.map((line, index) => (
                    <span key={line}>{index > 0 ? <br /> : null}{line}</span>
                  ))}
                </p>
              </address>
            </div>
            <p className="mt-5 rounded-xl bg-surface-soft px-4 py-3 text-sm text-ink-700">
              <span className="font-semibold">Landmark:</span> LG service center
            </p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
            <p className="mt-4 text-xs leading-relaxed text-ink-500">Map provided by Google Maps. You can also open the directions link to view the location directly.</p>
          </div>
          <iframe
            title={`${companyName} office location in Bengaluru`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-72 w-full border-0 sm:h-80 lg:h-full lg:min-h-88"
          />
        </div>
      </Container>
    </section>
  )
}
