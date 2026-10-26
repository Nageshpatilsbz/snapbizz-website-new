import { build } from 'vite'
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const args = process.argv.slice(2)
if (args.length && (args.length !== 2 || args[0] !== '--base')) {
  throw new Error('Usage: npm run build -- [--base /subdirectory/]')
}
const base = args[1] ?? '/'
if (!base.startsWith('/') || !base.endsWith('/') || base.includes('..') || base.includes('?') || base.includes('#')) {
  throw new Error('The asset base must be an absolute path ending with /.')
}
const origin = new URL(process.env.SITE_URL ?? 'https://www.snapbizz.com')
if (!['https:', 'http:'].includes(origin.protocol) || origin.pathname !== '/' || origin.search || origin.hash || origin.username || origin.password) {
  throw new Error('SITE_URL must be an HTTP(S) origin without a path, query, or credentials.')
}
const siteUrl = `${origin.origin}${base}`
const urlFor = (route) => new URL(route.replace(/^\//, ''), siteUrl).href
const escape = (text) => text.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
const json = (value) => JSON.stringify(value).replace(/</g, '\\u003c')

await build({ base })
const cache = path.resolve('node_modules', '.cache')
await mkdir(cache, { recursive: true })
const serverDir = await mkdtemp(path.join(cache, 'snapbizz-prerender-'))

try {
  await build({
    base,
    publicDir: false,
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: serverDir,
      emptyOutDir: true,
      rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
    },
  })
  const { render, pages, getPage } = await import(pathToFileURL(path.join(serverDir, 'entry-server.mjs')).href)
  const template = await readFile(path.resolve('dist', 'index.html'), 'utf8')
  if (!template.includes('<!--seo-start-->') || !template.includes('<div id="root"></div>')) {
    throw new Error('The HTML template is missing the SEO markers or root container.')
  }
  const organization = {
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: 'SnapBizz',
    legalName: 'SnapBizz Cloudtech Pvt. Ltd.',
    url: siteUrl,
    logo: urlFor('/favicon-512.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 5/1 Gulmohar Enclave, Kundanahalli Gate, Marathahalli Post',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560037',
      addressCountry: 'IN',
    },
  }
  for (const page of [...pages, getPage('/404/')]) {
    const url = urlFor(page.path)
    const graph = [
      organization,
      { '@type': 'WebSite', '@id': `${siteUrl}#website`, url: siteUrl, name: 'SnapBizz', publisher: { '@id': organization['@id'] } },
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: page.title, description: page.description, isPartOf: { '@id': `${siteUrl}#website` }, about: { '@id': organization['@id'] } },
    ]
    if (page.kind !== 'home' && page.kind !== 'not-found') {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: page.title.replace(/ \| SnapBizz$/, ''), item: url },
        ],
      })
    }
    const head = [
      `<title>${escape(page.title)}</title>`,
      `<meta name="description" content="${escape(page.description)}" />`,
      `<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow'}" />`,
      ...(page.noindex ? [] : [`<link rel="canonical" href="${escape(url)}" />`]),
      `<meta property="og:site_name" content="SnapBizz" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:locale" content="en_IN" />`,
      `<meta property="og:title" content="${escape(page.title)}" />`,
      `<meta property="og:description" content="${escape(page.description)}" />`,
      `<meta property="og:url" content="${escape(url)}" />`,
      `<meta property="og:image" content="${escape(urlFor('/favicon-512.png'))}" />`,
      `<meta property="og:image:alt" content="SnapBizz logo" />`,
      `<meta name="twitter:card" content="summary" />`,
      `<meta name="twitter:title" content="${escape(page.title)}" />`,
      `<meta name="twitter:description" content="${escape(page.description)}" />`,
      `<meta name="twitter:image" content="${escape(urlFor('/favicon-512.png'))}" />`,
      `<script type="application/ld+json">${json({ '@context': 'https://schema.org', '@graph': graph })}</script>`,
    ].join('\n    ')
    const content = await render(page.path)
    const headingCount = (content.match(/<h1(?:\s|>)/g) ?? []).length
    if (content.includes('Loading page...') || headingCount !== 1) {
      throw new Error(`Prerender failed for ${page.path}: ${headingCount} h1 headings; loading fallback: ${content.includes('Loading page...')}.`)
    }
    const html = template
      .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, () => head)
      .replace('<html lang="en">', '<html lang="en" data-prerendered>')
      .replace('<div id="root"></div>', () => `<div id="root">${content}</div>`)
    const file = page.kind === 'not-found'
      ? path.resolve('dist', '404.html')
      : path.resolve('dist', `.${page.path}`, 'index.html')
    await mkdir(path.dirname(file), { recursive: true })
    await writeFile(file, html)
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter((page) => !page.noindex).map((page) => `  <url><loc>${escape(urlFor(page.path))}</loc></url>`).join('\n')}\n</urlset>\n`
  await writeFile(path.resolve('dist', 'sitemap.xml'), sitemap)
  await writeFile(path.resolve('dist', 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${urlFor('/sitemap.xml')}\n`)
  console.log(`Prerendered ${pages.length} pages plus 404.html. Sitemap: ${urlFor('/sitemap.xml')}`)
} finally {
  await rm(serverDir, { recursive: true, force: true })
}
