const base = import.meta.env.BASE_URL

export const pageHref = (path: string) => `${base}${path.replace(/^\/+/, '')}`
export const industryHref = (id: string) => pageHref(`industries/${id}/`)
export const solutionHref = (id: string) => pageHref(`solutions/${id}/`)

export function siteHref(href: string): string {
  const company = /^#\/company\/([^/]+)$/.exec(href)
  if (company) return pageHref(`${company[1]}/`)
  const industry = /^#\/industry\/([^/]+)$/.exec(href)
  if (industry) return industryHref(industry[1])
  if (href.startsWith('#solution-')) return solutionHref(href.slice('#solution-'.length))
  if (href.startsWith('#')) return `${base}${href}`
  return href
}
