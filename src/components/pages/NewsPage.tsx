import { ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { newsStories } from '../../data/news'
import { pageHref } from '../../lib/urls'

export function NewsPage() {
  const [featuredStory, ...stories] = newsStories

  return (
    <>
      <section className="border-b border-line bg-surface-soft pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">News from SnapBizz</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-700 sm:text-lg sm:leading-8">
              Company updates and coverage of the retailers, technology, and changing habits shaping local commerce.
            </p>
          </div>

          <article className="mt-10 grid overflow-hidden rounded-xl border border-line bg-white shadow-soft lg:grid-cols-2">
            <div className="flex min-h-64 items-center justify-center bg-[#f15a24] p-5 sm:p-8">
              <img src={featuredStory.image} alt={featuredStory.imageAlt} className="max-h-80 w-full object-contain" />
            </div>
            <div className="flex flex-col items-start justify-center p-6 sm:p-9 lg:p-12">
              <p className="text-sm font-semibold text-brand-blue-dark">Company update <span className="mx-2 text-line">|</span> <time dateTime={featuredStory.date}>{featuredStory.dateLabel}</time></p>
              <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">{featuredStory.title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-ink-500 sm:text-base">{featuredStory.summary}</p>
              <a href={pageHref(`news/${featuredStory.slug}/`)} className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-blue-dark transition-colors hover:text-brand-blue">
                Read full article <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        </Container>
      </section>

      <section aria-labelledby="news-archive-title" className="bg-white py-12 sm:py-16">
        <Container>
          <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
            <div>
              <h2 id="news-archive-title" className="text-2xl font-bold sm:text-3xl">Stories and coverage</h2>
              <p className="mt-2 text-sm text-ink-500">From SnapBizz and the retail ecosystem.</p>
            </div>
            <p className="hidden shrink-0 text-sm text-ink-500 sm:block">{newsStories.length} stories</p>
          </div>

          <div className="grid gap-x-6 gap-y-10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <article key={story.title} className="flex h-full min-w-0 flex-col">
                <a href={pageHref(`news/${story.slug}/`)} aria-label={`Read ${story.title}`} className="group block overflow-hidden rounded-lg bg-surface-soft">
                  <img src={story.image} alt={story.imageAlt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </a>
                <div className="flex flex-1 flex-col items-start pt-4">
                  <p className="text-xs font-medium text-ink-500">{story.source} <span className="mx-1.5 text-line">|</span> <time dateTime={story.date}>{story.dateLabel}</time></p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-ink"><a href={pageHref(`news/${story.slug}/`)} className="transition-colors hover:text-brand-blue-dark">{story.title}</a></h3>
                  <p className="mt-3 text-sm leading-6 text-ink-500">{story.summary}</p>
                  <a href={pageHref(`news/${story.slug}/`)} className="mt-auto inline-flex min-h-10 items-center gap-2 border-t border-line pt-3 text-sm font-semibold text-brand-blue-dark transition-colors hover:text-brand-blue">
                    Read full article <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}