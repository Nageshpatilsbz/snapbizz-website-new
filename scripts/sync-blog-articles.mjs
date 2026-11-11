import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { load } from 'cheerio'

const assets = new Map()

function registerAsset(source, slug) {
  if (!source || source.startsWith('data:')) return ''
  let url
  try {
    url = new URL(source, 'https://snapbizz.com')
  } catch {
    return ''
  }
  if (!['snapbizz.com', 'www.snapbizz.com'].includes(url.hostname)) return ''
  url.protocol = 'https:'
  url.search = ''
  const sourceUrl = url.href
  if (assets.has(sourceUrl)) return assets.get(sourceUrl).path

  const extension = ['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(path.extname(url.pathname).toLowerCase())
    ? path.extname(url.pathname).toLowerCase()
    : '.jpg'
  const index = [...assets.values()].filter((asset) => asset.slug === slug).length + 1
  const assetPath = `blog-assets/${slug}/${String(index).padStart(2, '0')}${extension}`
  assets.set(sourceUrl, { sourceUrl, path: assetPath, slug })
  return assetPath
}

function cleanArticle(markup, slug) {
  const $ = load(markup)
  $('script, style, iframe, video, audio, object, embed').remove()
  $('img').each((_, image) => {
    const element = $(image)
    const source = element.attr('src') || element.attr('data-src') || element.attr('data-lazy-src')
    const assetPath = registerAsset(source, slug)
    if (!assetPath) {
      element.remove()
      return
    }
    const alt = element.attr('alt') ?? ''
    for (const attribute of Object.keys(image.attribs ?? {})) element.removeAttr(attribute)
    element.attr('src', `__BLOG_BASE__${assetPath}`)
    element.attr('alt', alt)
    element.attr('loading', 'lazy')
  })
  $('body *').each((_, element) => {
    const node = $(element)
    if (element.tagName?.toLowerCase() === 'img') return
    for (const attribute of Object.keys(element.attribs ?? {})) node.removeAttr(attribute)
  })
  $('a').each((_, anchor) => {
    if (!$(anchor).text().trim() && !$(anchor).find('img').length) $(anchor).remove()
  })
  $('h1').each((_, heading) => {
    const node = $(heading)
    node.replaceWith($('<h2>').html(node.html()))
  })
  $('body').find('*').contents().each((_, node) => {
    if (node.type === 'text') node.data = node.data.replace(/\[\/?vc_[^\]]+\]/g, '')
  })
  $('p').each((_, paragraph) => {
    const element = $(paragraph)
    if (!element.text().replace(/\u00a0/g, ' ').trim() && !element.find('img').length) element.remove()
  })
  return $('body').html()?.trim() ?? ''
}

function plainText(markup) {
  return load(markup).text().replace(/\s+/g, ' ').replace(/\s*[.…]+$/, '').trim()
}

let input = ''
for await (const chunk of process.stdin) input += chunk
const response = JSON.parse(input)
const posts = Array.isArray(response) ? response : [response]
const stories = []
const articles = {}

for (const post of posts) {
  if (!post?.slug || !post?.content?.rendered) throw new Error('Blog post response is missing its slug or content.')
  const article = cleanArticle(post.content.rendered, post.slug)
  const fallbackImage = post.featuredImageUrl ? '' : load(post.content.rendered)('img').first().attr('src')
  const featuredImagePath = registerAsset(post.featuredImageUrl || fallbackImage, post.slug)
  const summaryText = plainText(post.excerpt?.rendered ?? '') || plainText(post.content.rendered)
  const summary = summaryText.length > 220
    ? `${summaryText.slice(0, 217).replace(/\s+\S*$/, '').trim()}...`
    : summaryText
  const featuredAlt = post.featuredImageAlt || post.title.rendered
  stories.push({
    slug: post.slug,
    title: plainText(post.title.rendered),
    date: post.date.slice(0, 10),
    dateLabel: new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
    summary,
    featuredImagePath: featuredImagePath || 'blog-assets/snappulse-retailer-survey/01.png',
    featuredImageAlt: featuredAlt,
  })
  articles[post.slug] = article
}

const module = `export const blogStories = ${JSON.stringify(stories, null, 2)} as const\n\nexport const blogArticles: Record<string, string> = ${JSON.stringify(articles, null, 2)}\n`
await writeFile(new URL('../src/data/blog.ts', import.meta.url), module)
process.stdout.write(JSON.stringify({ assets: [...assets.values()] }))