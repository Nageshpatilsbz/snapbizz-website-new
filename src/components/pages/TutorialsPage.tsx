import { ArrowRight, CircleHelp, GraduationCap, Play, Video } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { pageHref } from '../../lib/urls'

const products = [
  {
    id: 'turbo',
    name: 'SnapBizz Turbo',
    platform: 'Android POS',
    description: 'Get familiar with everyday billing and store workflows on Turbo.',
    playlistId: 'PLz08bURgOF-1jYk8cC_zRa0K1Ue8tsv4N',
    accent: 'green',
  },
  {
    id: 'lite',
    name: 'SnapBizz Lite',
    platform: 'Retail POS',
    description: 'Explore quick guides to customers, quick add, and cash flow.',
    playlistId: 'PLz08bURgOF-11K_nRw5_a0xHs8T1S-xuN',
    accent: 'blue',
  },
  {
    id: 'snaporder',
    name: 'SnapOrder',
    platform: 'Digital ordering',
    description: 'Follow the SnapOrder and SnapMerchant flow, then find answers to common questions.',
    accent: 'yellow',
  },
] as const

const selectedTabAccents = {
  green: 'border border-brand-green/25 bg-brand-green/10 text-brand-green shadow-sm',
  blue: 'border border-brand-blue/25 bg-brand-blue-light text-brand-blue-dark shadow-sm',
  yellow: 'border border-brand-yellow/40 bg-brand-yellow/20 text-[#755300] shadow-sm',
}

const productIconAccents = {
  green: 'bg-brand-green/10 text-brand-green',
  blue: 'bg-brand-blue-light text-brand-blue-dark',
  yellow: 'bg-brand-yellow/15 text-[#8a6200]',
}

export function TutorialsPage() {
  const [activeProductId, setActiveProductId] = useState<string>(products[0].id)
  const product = products.find(({ id }) => id === activeProductId) ?? products[0]

  return (
    <>
      <section className="border-b border-line bg-[linear-gradient(115deg,#eef5ff_0%,#ffffff_48%,#eff9f3_100%)] pb-10 pt-32 sm:pb-14 sm:pt-40">
        <Container className="grid items-center gap-6 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">SnapBizz Tutorials</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-700 sm:text-lg sm:leading-8">
              Practical how-to videos and product guidance for the tools that keep your store moving.
            </p>
          </div>
          <a href="mailto:training@snapbizz.com" className="inline-flex min-h-11 items-center gap-2 justify-self-start rounded-lg border border-line bg-white/80 px-4 text-sm font-semibold text-ink-700 transition hover:border-brand-green hover:text-brand-green lg:justify-self-end">
            <CircleHelp className="h-4 w-4" aria-hidden="true" />
            Contact training
          </a>
        </Container>
      </section>

      <section aria-labelledby="tutorial-library-title" className="bg-surface-soft py-10 sm:py-14">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="tutorial-library-title" className="text-2xl font-bold sm:text-3xl">What are you learning today?</h2>
            </div>
            <div className="inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-line bg-white p-1 shadow-soft" role="group" aria-label="Choose a product">
              {products.map(({ id, name, accent }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveProductId(id)}
                  aria-pressed={activeProductId === id}
                  className={`min-h-10 rounded-lg px-3 text-sm font-semibold transition-colors sm:px-4 ${activeProductId === id ? selectedTabAccents[accent] : 'text-ink-500 hover:bg-surface-soft hover:text-ink'}`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(17rem,0.7fr)] lg:gap-10">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">
                {product.name}
                <span className="ml-2 border-l border-line pl-2 font-normal text-ink-500">{product.platform}</span>
              </p>
              <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">{product.id === 'snaporder' ? 'Product walkthrough' : 'How-to videos'}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500">{product.description}</p>
              {'playlistId' in product ? (
                <div className="relative mt-6 w-full overflow-hidden rounded-xl bg-ink shadow-card" style={{ aspectRatio: '16 / 9' }}>
                  <iframe
                    className="absolute inset-0 h-full w-full border-0"
                    src={`https://www.youtube-nocookie.com/embed/videoseries?list=${product.playlistId}`}
                    title={`${product.name} how-to video playlist`}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="mt-6 flex w-full flex-col items-center justify-center rounded-xl border border-line bg-white px-6 text-center" style={{ aspectRatio: '16 / 9' }}>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-full ${productIconAccents[product.accent]}`}>
                    <Play className="ml-0.5 h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-lg font-semibold text-ink">SnapOrder &amp; SnapMerchant</p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-ink-500">Explore ordering and merchant guidance in the SnapOrder support library.</p>
                  <a href={pageHref('faq/?product=snaporder')} className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-blue-dark hover:text-brand-blue">
                    View SnapOrder guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>

            <aside className="flex min-w-0 flex-col border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Video className="h-4 w-4 text-brand-blue-dark" aria-hidden="true" />
                Keep learning
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-500">
                {product.id === 'snaporder' ? 'Find setup help, ordering guidance, and answers for your team.' : `Browse the complete ${product.name} video series or look up a specific question.`}
              </p>
              <div className="mt-5 flex flex-col divide-y divide-line border-y border-line">
                {'playlistId' in product ? (
                  <a href={`https://www.youtube.com/playlist?list=${product.playlistId}`} target="_blank" rel="noreferrer" className="group flex min-h-14 items-center justify-between gap-3 text-sm font-semibold text-brand-blue-dark hover:text-brand-blue">
                    Open full video playlist
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                ) : null}
                <a href={pageHref(`faq/?product=${product.id}`)} className="group flex min-h-14 items-center justify-between gap-3 text-sm font-semibold text-brand-blue-dark hover:text-brand-blue">
                  Browse {product.name} FAQs
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section aria-labelledby="training-title" className="border-y border-line bg-surface-soft py-10 sm:py-14">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-yellow/20 text-[#8a6200]">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 id="training-title" className="text-xl font-semibold">Join a live training session</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-500">Attend a 60-minute online session with the team every Thursday at 1:30 PM.</p>
            </div>
          </div>
          <Button href="https://zoom.us/meeting/register/tJErdO6prj0sHtfbK2GGvosARYDkobKKFCSh" target="_blank" rel="noreferrer" variant="secondary" className="shrink-0">
            Register for training <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Container>
      </section>
    </>
  )
}