import { writeFile } from 'node:fs/promises'
import { load } from 'cheerio'

function cleanArticle(markup) {
  const $ = load(markup)
  $('script, style, iframe, video, audio, img, object, embed, .ult-spacer').remove()
  $('body *').each((_, element) => {
    const node = $(element)
    for (const attribute of Object.keys(element.attribs ?? {})) node.removeAttr(attribute)
  })
  $('a').each((_, anchor) => {
    if (!$(anchor).text().trim()) $(anchor).remove()
  })
  $('body').find('*').contents().each((_, node) => {
    if (node.type === 'text') node.data = node.data.replace(/\[\/?vc_[^\]]+\]/g, '')
  })
  $('p').each((_, paragraph) => {
    const text = $(paragraph).text().replace(/\u00a0/g, ' ').trim()
    if (!text || text.startsWith('I am text block. Click edit button to change this text.')) $(paragraph).remove()
  })
  return $('body').html()?.trim() ?? ''
}

let input = ''
for await (const chunk of process.stdin) input += chunk
const response = JSON.parse(input)
const posts = Array.isArray(response) ? response : [response]
const articles = {}

for (const post of posts) {
  if (!post?.slug || !post?.content?.rendered) throw new Error('Article response is missing its slug or content.')
  articles[post.slug] = cleanArticle(post.content.rendered)
  console.log(`Processed ${post.slug}`)
}

const output = `export const newsArticles: Record<string, string> = ${JSON.stringify(articles, null, 2)}\n`
await writeFile(new URL('../src/data/newsArticles.ts', import.meta.url), output)
console.log(`Saved ${Object.keys(articles).length} local articles.`)