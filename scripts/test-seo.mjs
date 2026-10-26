import assert from 'node:assert/strict'
import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { test } from 'node:test'

const dist = path.resolve('dist')
const decode = (value) => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const home = await readFile(path.join(dist, 'index.html'), 'utf8')
const canonical = (html) => /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1]
const root = new URL(canonical(home))
const base = root.pathname

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const result = []
  for (const entry of entries) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) result.push(...await htmlFiles(file))
    else if (entry.name.endsWith('.html')) result.push(file)
  }
  return result
}

const documents = await Promise.all((await htmlFiles(dist)).map(async (file) => ({
  file,
  html: await readFile(file, 'utf8'),
})))

test('all 24 routes have complete content and unique metadata before JavaScript', () => {
  assert.equal(documents.length, 25)
  const titles = new Set()
  const descriptions = new Set()
  for (const { file, html } of documents) {
    const relative = path.relative(dist, file).split(path.sep).join('/')
    const title = /<title>([^<]+)<\/title>/.exec(html)?.[1]
    const description = /<meta name="description" content="([^"]+)"/.exec(html)?.[1]
    assert.ok(title, `Missing title: ${relative}`)
    assert.ok(description, `Missing description: ${relative}`)
    assert.ok(!titles.has(title), `Duplicate title: ${relative}`)
    assert.ok(!descriptions.has(description), `Duplicate description: ${relative}`)
    titles.add(title)
    descriptions.add(description)
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, relative)
    assert.ok(!html.includes('Loading page...'), `Unresolved content: ${relative}`)
    assert.ok(!html.includes('Switched to client rendering'), `Server rendering failed: ${relative}`)
    const noindex = relative === '404.html' || relative === 'careers/index.html'
    assert.ok(html.includes(`content="${noindex ? 'noindex, follow' : 'index, follow'}"`), relative)
    if (noindex) assert.equal(canonical(html), undefined, relative)
    else {
      const expected = new URL(relative.replace(/index\.html$/, ''), root).href
      assert.equal(decode(canonical(html)), expected, relative)
    }
    for (const tag of ['og:title', 'og:description', 'og:url', 'og:image']) {
      assert.equal((html.match(new RegExp(`property="${tag}"`, 'g')) ?? []).length, 1, relative)
    }
    assert.ok(html.includes('name="twitter:card"'), relative)
    const structured = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)[1])
    assert.equal(structured['@context'], 'https://schema.org')
    assert.ok(structured['@graph'].some((item) => item['@type'] === 'Organization'))
    if (relative !== 'index.html' && relative !== '404.html') {
      assert.ok(structured['@graph'].some((item) => item['@type'] === 'BreadcrumbList'), relative)
    }
  }
})

test('sitemap and robots advertise only indexable canonical URLs', async () => {
  const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8')
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]))
  assert.equal(urls.length, 23)
  assert.equal(new Set(urls).size, urls.length)
  assert.ok(urls.includes(root.href))
  assert.ok(urls.every((url) => url.startsWith(root.href) && !url.includes('#') && !url.includes('/careers/')))
  const expected = documents.map(({ html }) => canonical(html)).filter(Boolean).map(decode).sort()
  assert.deepEqual(urls.sort(), expected)
  const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8')
  assert.ok(robots.includes(`Sitemap: ${new URL('sitemap.xml', root).href}`))
  assert.ok(!robots.includes('Disallow: /'))
})

test('all generated internal links, anchors, and local assets resolve', async () => {
  for (const { file, html } of documents) {
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const href = decode(match[1])
      if (!href.startsWith('/') || href.startsWith('//')) continue
      const url = new URL(href, root)
      assert.ok(url.pathname.startsWith(base), `Link escaped the deployment base: ${href}`)
      const localPath = decodeURIComponent(url.pathname.slice(base.length))
      let target = path.join(dist, localPath)
      const info = await stat(target)
      if (info.isDirectory()) target = path.join(target, 'index.html')
      await stat(target)
      if (url.hash) {
        const targetHtml = await readFile(target, 'utf8')
        assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${path.relative(dist, file)}: missing anchor ${href}`)
      }
    }
    assert.ok(!/href="#\/(?:company|industry)\//.test(html), file)
  }
})
