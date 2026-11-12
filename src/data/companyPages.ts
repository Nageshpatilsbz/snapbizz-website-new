import { Building2, FileText, Handshake, HelpCircle, ShieldCheck, Users, type LucideIcon } from 'lucide-react'
import { pageHref } from '../lib/urls'

interface CompanyPageContent {
  id: string
  label: string
  title: string
  description: string
  icon: LucideIcon
  draft?: boolean
  legal?: boolean
  sections: { title: string; body: string }[]
}

export const companyPages: CompanyPageContent[] = [
  {
    id: 'about',
    label: 'About SnapBizz',
    title: 'Built for Business. Designed for Growth.',
    description: 'Connecting retail operations, banking partnerships, and enterprise payment workflows.',
    icon: Building2,
    sections: [
      { title: 'What we do', body: 'SnapBizz brings together Android and Windows POS, inventory, digital ordering, business insights, and customer engagement. Our solutions support everyday retail operations and connected business workflows.' },
      { title: 'Who we work with', body: 'Our solutions address the needs of retailers, distributors, banks, fintechs, and enterprises. Configurations vary by industry, supported devices, integrations, and partner requirements.' },
      { title: 'How we work', body: 'We start by understanding your workflow, then configure the solution and plan deployment, training, and support around the agreed scope.' },
    ],
  },
  {
    id: 'partners',
    label: 'Partner with Us',
    title: 'Build Connected Business Experiences.',
    description: 'Explore opportunities across banking, devices, distribution, and enterprise integrations.',
    icon: Handshake,
    sections: [
      { title: 'Banks and fintechs', body: 'Explore partner-branded merchant applications, supported payment integrations, and reporting workflows tailored to your business requirements.' },
      { title: 'Device and technology partners', body: 'Discuss supported Android POS devices, Windows deployments, printing, and integration requirements with the SnapBizz ecosystem.' },
      { title: 'Enterprise and distribution partners', body: 'Talk through multi-location operations, ERP connections, rollout needs, and industry-specific workflows. Partnership scope and availability are agreed individually.' },
    ],
  },
  {
    id: 'brands',
    label: 'SnapBizz Brand Services',
    title: 'SnapBizz Brand Services',
    description: 'Connect FMCG brands with retailers and shoppers through digital merchandising, engagement, and actionable purchase insights.',
    icon: Building2,
    sections: [],
  },
  {
    id: 'retailer-testimonials',
    label: 'Retailer Testimonials',
    title: 'Retailer Testimonials',
    description: 'Hear how retailers use SnapBizz in their stores.',
    icon: Users,
    sections: [],
  },
  {
    id: 'careers',
    label: 'Careers',
    title: 'Help Shape Connected Commerce.',
    description: 'Discover future opportunities to grow with SnapBizz.',
    icon: Users,
    sections: [
      { title: 'No current openings', body: 'Thank you for your interest in joining SnapBizz. We do not have any open positions at the moment. Please check back for future opportunities.' },
    ],
  },
  {
    id: 'faq',
    label: 'FAQs',
    title: 'A Few Things You May Want to Know.',
    description: 'Quick answers about the SnapBizz platform, deployments, and partnerships.',
    icon: HelpCircle,
    sections: [
      { title: 'What is the difference between Turbo and Neo?', body: 'Turbo is the Android offering, while Neo is designed for Windows laptops and desktops. The right configuration depends on your billing, inventory, device, and integration requirements.' },
      { title: 'Does SnapBizz work with banks and fintechs?', body: 'Bank-branded APOS solutions support partner-branded merchant workflows and payment integrations. Device support and features depend on the agreed deployment.' },
      { title: 'Can billing connect to payment collection?', body: 'Payment Collection & Reconciliation connects supported PC-based billing and APOS workflows to help match billing records with payments. Supported payment methods and ERP connections vary by configuration.' },
      { title: 'Can solutions be tailored to my industry?', body: 'Custom Enterprise Solutions support tailored branding, billing, and operational workflows. Explore the industry pages for examples, then discuss your specific requirements.' },
      { title: 'How do deployment and support work?', body: 'The process starts with understanding your workflow, followed by configuration and deployment. Training, onboarding, and support are defined with the partner for the selected solution.' },
      { title: 'Where can I find pricing or request a demonstration?', body: 'Use the Contact section to describe your requirements and submit an enquiry. Our team will follow up to discuss pricing or arrange a demonstration.' },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    title: 'Privacy Policy',
    description: 'Last updated: 08.April.2021',
    icon: ShieldCheck,
    legal: true,
    sections: [],
  },
  {
    id: 'terms',
    label: 'Terms & Conditions',
    title: 'Terms & Conditions',
    description: 'Software agreement and mobile service privacy terms. Effective Date: April 15, 2014.',
    icon: FileText,
    legal: true,
    sections: [],
  },
]

export const companyPageHref = (id: string) => pageHref(`${id}/`)
