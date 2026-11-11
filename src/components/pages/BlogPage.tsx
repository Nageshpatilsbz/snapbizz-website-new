import { ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'
import { blogStories } from '../../data/blog'
import { pageHref } from '../../lib/urls'
import { Container } from '../ui/Container'

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [featuredStory, ...stories] = blogStories
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const visibleStories = stories.filter(({ title, summary }) => `${title} ${summary}`.toLowerCase().includes(normalizedQuery))

  return (
    <>
      <section className="border-b border-line bg-surface-soft pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">SnapBizz Blog</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-700 sm:text-lg sm:leading-8">
              Retail observations, SnapPulse data, and ideas from the kirana ecosystem.
            </p>
          </div>

          <article className="mt-9 grid overflow-hidden rounded-xl border border-line bg-white shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
            <a href={pageHref(`blog/${featuredStory.slug}/`)} aria-label={`Read ${featuredStory.title}`} className="flex min-h-64 items-center justify-center bg-[#edf3fa] p-5 sm:p-8">
              <img src={pageHref(featuredStory.featuredImagePath)} alt={featuredStory.featuredImageAlt} className="max-h-96 w-full object-contain" />
            </a>
            <div className="flex flex-col items-start justify-center p-6 sm:p-9 lg:p-12">
              <p className="text-sm font-semibold text-brand-blue-dark"><time dateTime={featuredStory.date}>{featuredStory.dateLabel}</time></p>
              <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
                <a href={pageHref(`blog/${featuredStory.slug}/`)} className="transition-colors hover:text-brand-blue-dark">{featuredStory.title}</a>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-ink-500 sm:text-base">{featuredStory.summary}</p>
              <a href={pageHref(`blog/${featuredStory.slug}/`)} className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-blue-dark transition-colors hover:text-brand-blue">
                Read article <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        </Container>
      </section>

      <section aria-labelledby="blog-archive-title" className="bg-white py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-5 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="blog-archive-title" className="text-2xl font-bold sm:text-3xl">All articles</h2>
              <p className="mt-2 text-sm text-ink-500">{visibleStories.length + (normalizedQuery ? 0 : 1)} articles</p>
            </div>
            <label className="relative block w-full sm:max-w-sm">
              <span className="sr-only">Search blog articles</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search articles"
                className="min-h-11 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-sm text-ink placeholder:text-ink-300 focus:border-brand-blue focus:outline-none"
              />
            </label>
          </div>

          {normalizedQuery && `${featuredStory.title} ${featuredStory.summary}`.toLowerCase().includes(normalizedQuery) ? (
            <article className="mt-7 flex items-center gap-5 border-b border-line pb-6 sm:gap-8">
              <a href={pageHref(`blog/${featuredStory.slug}/`)} aria-label={`Read ${featuredStory.title}`} className="h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-surface-soft sm:h-32 sm:w-44">
                <img src={pageHref(featuredStory.featuredImagePath)} alt={featuredStory.featuredImageAlt} className="h-full w-full object-cover" />
              </a>
              <div>
                <p className="text-xs font-medium text-ink-500"><time dateTime={featuredStory.date}>{featuredStory.dateLabel}</time></p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-ink"><a href={pageHref(`blog/${featuredStory.slug}/`)}>{featuredStory.title}</a></h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-500">{featuredStory.summary}</p>
              </div>
            </article>
          ) : null}

          <div className="grid gap-x-6 gap-y-10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleStories.map((story) => (
              <article key={story.slug} className="flex h-full min-w-0 flex-col">
                <a href={pageHref(`blog/${story.slug}/`)} aria-label={`Read ${story.title}`} className="group block overflow-hidden rounded-lg bg-surface-soft">
                  <img src={pageHref(story.featuredImagePath)} alt={story.featuredImageAlt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </a>
                <div className="flex flex-1 flex-col items-start pt-4">
                  <p className="text-xs font-medium text-ink-500"><time dateTime={story.date}>{story.dateLabel}</time></p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-ink"><a href={pageHref(`blog/${story.slug}/`)} className="transition-colors hover:text-brand-blue-dark">{story.title}</a></h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-ink-500">{story.summary}</p>
                  <a href={pageHref(`blog/${story.slug}/`)} className="mt-3 inline-flex min-h-10 items-center gap-2 border-t border-line pt-3 text-sm font-semibold text-brand-blue-dark transition-colors hover:text-brand-blue">
                    Read article <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          {!visibleStories.length && !(normalizedQuery && `${featuredStory.title} ${featuredStory.summary}`.toLowerCase().includes(normalizedQuery)) ? (
            <p className="py-10 text-sm text-ink-500">No articles match your search.</p>
          ) : null}
        </Container>
      </section>
    </>
  )
}