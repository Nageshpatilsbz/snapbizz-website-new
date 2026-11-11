import { ArrowLeft } from 'lucide-react'
import { newsStories } from '../../data/news'
import { newsArticles } from '../../data/newsArticles'
import { pageHref } from '../../lib/urls'
import { Container } from '../ui/Container'

export function NewsArticlePage({ slug }: { slug: string }) {
  const story = newsStories.find((item) => item.slug === slug)

  if (!story) {
    return (
      <section className="min-h-[65vh] pb-20 pt-32">
        <Container>
          <h1 className="text-3xl font-bold">Article not found</h1>
          <a href={pageHref('news/')} className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-blue-dark hover:text-brand-blue">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to News
          </a>
        </Container>
      </section>
    )
  }

  return (
    <>
      <section className="border-b border-line bg-surface-soft pb-10 pt-[6rem] sm:pb-14 sm:pt-[7rem]">
        <Container>
          <a href={pageHref('news/')} className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-blue-dark transition-colors hover:text-brand-blue">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to News
          </a>
          <header className="mt-7 max-w-4xl">
            <p className="text-sm font-semibold text-brand-blue-dark">{story.source}<span className="mx-2 text-line">|</span><time dateTime={story.date}>{story.dateLabel}</time></p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{story.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-ink-700 sm:text-lg sm:leading-8">{story.summary}</p>
          </header>
          <figure className="mt-8 overflow-hidden rounded-xl border border-line bg-white p-2 sm:p-4">
            <img src={story.image} alt={story.imageAlt} className="mx-auto max-h-[36rem] w-full object-contain" />
          </figure>
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <Container>
          <article className="mx-auto max-w-3xl space-y-5 text-base leading-8 text-ink-700 [&_blockquote]:border-l-2 [&_blockquote]:border-brand-blue [&_blockquote]:pl-5 [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h3]:pt-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-6 [&_ol]:list-decimal [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc">
            <div dangerouslySetInnerHTML={{ __html: newsArticles[story.slug] ?? '' }} />
          </article>
          <a href={pageHref('news/')} className="mx-auto mt-10 flex min-h-10 max-w-3xl items-center gap-2 border-t border-line pt-5 text-sm font-semibold text-brand-blue-dark transition-colors hover:text-brand-blue">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to all news
          </a>
        </Container>
      </section>
    </>
  )
}