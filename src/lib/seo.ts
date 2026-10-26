import { companyPages } from '../data/companyPages'
import { industries, solutions } from '../data/content'
import { industryDetails } from '../data/industryDetails'

export interface PageMetadata {
  path: string
  title: string
  description: string
  kind: 'home' | 'company' | 'industry' | 'solution' | 'data' | 'not-found'
  id?: string
  noindex?: boolean
}

const solutionTitles: Record<string, string> = {
  'turbo-android-pos': 'Android POS Billing & Inventory Software',
  'neo-windows-pos': 'Windows POS Billing Software for Retail',
  'label-printer': 'Barcode & Price Label Printing for POS',
  'warehouse-portal': 'Warehouse Inventory & Order Management Portal',
  'bank-branded-apos': 'Bank-Branded APOS & Merchant Applications',
  'custom-enterprise': 'Custom Enterprise Billing & Payment Solutions',
  'payment-collection': 'Payment Collection & Reconciliation',
}

const companyDescriptions: Record<string, string> = {
  about: 'Learn how SnapBizz connects retail checkout, Android and Windows POS, banking partnerships, and enterprise payment workflows.',
  partners: 'Explore SnapBizz partnerships for banks, fintechs, device providers, distributors, and enterprise billing and payment integrations.',
  faq: 'Find answers about SnapBizz Android and Windows POS, bank-branded APOS, payment reconciliation, deployment, and support.',
  privacy: 'Read the SnapBizz Cloudtech Pvt. Ltd. website Privacy Policy, including information collection, usage, sharing, opt-out, and grievance contacts.',
  terms: 'Read the SnapBizz software license agreement and mobile service privacy terms, including licensing, restrictions, liability, and data handling.',
}

export const pages: PageMetadata[] = [
  {
    path: '/',
    title: 'SnapBizz | Retail POS, Banking & Payment Solutions',
    description: 'Connect retail billing, inventory, banking partnerships, and enterprise payment operations with SnapBizz Android POS, Windows POS, and web solutions.',
    kind: 'home',
  },
  {
    path: '/data/',
    title: 'Snapbizz Data Suite | SnapBizz',
    description: 'Explore Snapbizz consumer transaction data for FMCG products, built from POS transactions across India.',
    kind: 'data',
  },
  ...companyPages.map((page): PageMetadata => ({
    path: `/${page.id}/`,
    title: `${page.label} | SnapBizz`,
    description: companyDescriptions[page.id] ?? page.description,
    kind: 'company',
    id: page.id,
    noindex: page.draft || page.id === 'careers',
  })),
  ...industries.map((industry): PageMetadata => ({
    path: `/industries/${industry.id}/`,
    title: `${industry.title} Solutions | SnapBizz`,
    description: industryDetails[industry.id].overview,
    kind: 'industry',
    id: industry.id,
  })),
  ...solutions.map((solution): PageMetadata => ({
    path: `/solutions/${solution.id}/`,
    title: `${solutionTitles[solution.id] ?? solution.title} | SnapBizz`,
    description: solution.description,
    kind: 'solution',
    id: solution.id,
  })),
]

export function getPage(pathname: string): PageMetadata {
  const path = `${pathname.replace(/\/+$/, '')}/`
  return pages.find((page) => page.path === path) ?? {
    path,
    title: 'Page Not Found | SnapBizz',
    description: 'This address does not match a SnapBizz page. Explore retail POS, banking, and payment solutions from the homepage.',
    kind: 'not-found',
    noindex: true,
  }
}

export function getPagePath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return base && (pathname === base || pathname.startsWith(`${base}/`))
    ? pathname.slice(base.length) || '/'
    : pathname
}
