import { ArrowLeft } from 'lucide-react'
import { blogArticles, blogStories } from '../../data/blog'
import { pageHref } from '../../lib/urls'
import { Container } from '../ui/Container'

export function BlogArticlePage({ slug }: { slug: string }) {
  const story = blogStories.find((item) => item.slug === slug)

  if (!story) {
    return (
      <section className="min-h-[65vh] pb-20 pt-32">
        <Container>
          <h1 className="text-3xl font-bold">Article not found</h1>
          <a href={pageHref('blog/')} className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-blue-dark hover:text-brand-blue">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Blog
          </a>
        </Container>
      </section>
    )
  }

  const article = (blogArticles[slug] ?? '').replaceAll('__BLOG_BASE__', pageHref(''))

  return (
    <>
      <section className="border-b border-line bg-surface-soft pb-10 pt-[6rem] sm:pb-14 sm:pt-[7rem]">
        <Container>
          <a href={pageHref('blog/')} className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-blue-dark transition-colors hover:text-brand-blue">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Blog
          </a>
          <header className="mt-6 max-w-4xl">
            <p className="text-sm font-semibold text-brand-blue-dark"><time dateTime={story.date}>{story.dateLabel}</time></p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{story.title}</h1>
          </header>
          {story.featuredImagePath ? (
            <figure className="mt-7 overflow-hidden rounded-xl border border-line bg-white p-2 sm:p-4">
              <img src={pageHref(story.featuredImagePath)} alt={story.featuredImageAlt} className="mx-auto max-h-[70vh] w-full object-contain" />
            </figure>
          ) : null}
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <Container>
          <article className="mx-auto max-w-3xl space-y-5 text-base leading-8 text-ink-700 [&_a]:text-brand-blue-dark [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-brand-blue [&_blockquote]:pl-5 [&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-ink-500 [&_figure]:my-6 [&_figure>img]:mx-auto [&_figure>img]:h-auto [&_figure>img]:max-h-[70vh] [&_figure>img]:max-w-full [&_figure>img]:rounded-lg [&_figure>img]:object-contain [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h3]:pt-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_img]:h-auto [&_img]:max-h-[70vh] [&_img]:max-w-full [&_img]:object-contain [&_li]:ml-6 [&_ol]:list-decimal [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc">
            <div dangerouslySetInnerHTML={{ __html: article }} />
          </article>
          <a href={pageHref('blog/')} className="mx-auto mt-10 flex min-h-10 max-w-3xl items-center gap-2 border-t border-line pt-5 text-sm font-semibold text-brand-blue-dark transition-colors hover:text-brand-blue">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to all Blog articles
          </a>
        </Container>
      </section>
    </>
  )
}