import {
  Banknote,
  Building2,
  Car,
  Landmark,
  Layers,
  LayoutDashboard,
  Globe2,
  Receipt,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrainFront,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { TempleIcon, TrafficSignalIcon } from '../components/ui/CustomIcons'
import turboImg from '../assets/products/turbo.png'
import neoImg from '../assets/products/neo.png'
import printerImg from '../assets/products/printer.png'
import warehousePortalImg from '../assets/w-portal.png'
import aposImg from '../assets/products/apos.png'
import tabletImg from '../assets/products/tablet.png'
import type {
  Capability,
  BrandAccent,
  Industry,
  NavItem,
  PlatformFeature,
  ProcessStep,
  ReasonItem,
  Solution,
} from '../types'

export const navItems: NavItem[] = [
  {
    label: 'Solutions',
    href: '#solutions',
    items: [
      {
        label: 'Turbo POS (Android)',
        description: 'Android POS terminal for billing, inventory, and engagement.',
        href: '#solution-turbo-android-pos',
        icon: ShoppingBag,
      },
      {
        label: 'Neo POS (Windows)',
        description: 'Windows POS software for laptops and desktops.',
        href: '#solution-neo-windows-pos',
        icon: LayoutDashboard,
      },
      {
        label: 'Label Printer',
        description: 'Barcode and price label printing for your POS.',
        href: '#solution-label-printer',
        icon: Receipt,
      },
      {
        label: 'Warehouse Portal',
        description: 'Stock, orders, and multi-location visibility.',
        href: '#solution-warehouse-portal',
        icon: Building2,
      },
      {
        label: 'Bank-Branded APOS',
        description: 'Partner-branded merchant applications for banks and fintechs.',
        href: '#solution-bank-branded-apos',
        icon: Banknote,
      },
      {
        label: 'Custom Enterprise Solutions',
        description: 'Tailored workflows, branding, and billing for your business.',
        href: '#solution-custom-enterprise',
        icon: Layers,
      },
      {
        label: 'Payment Collection & Reconciliation',
        description: 'Unified collection, reporting, and ERP reconciliation.',
        href: '#solution-payment-collection',
        icon: Wallet,
      },
    ],
  },
  {
    label: 'Industries',
    href: '#industries',
    items: [
      { label: 'Retail & Distribution', description: 'Billing, payments, and ERP integration.', href: '#/industry/retail', icon: ShoppingBag },
      { label: 'Government & Municipalities', description: 'Tax and civic charge collection.', href: '#/industry/government', icon: Landmark },
      { label: 'Parking Management', description: 'Entry, exit, billing, and reconciliation.', href: '#/industry/parking', icon: Car },
      { label: 'Temple Management', description: 'Seva, donations, and prasadam sales.', href: '#/industry/temple', icon: TempleIcon },
      { label: 'Railway E-Catering', description: 'Meal ordering and secure payments.', href: '#/industry/railway', icon: TrainFront },
      { label: 'Traffic Management', description: 'E-challan issuance and fine collection.', href: '#/industry/traffic', icon: TrafficSignalIcon },
      { label: 'Enterprise & ERP', description: 'PC-to-POS and custom billing.', href: '#/industry/enterprise-erp', icon: Building2 },
      { label: 'Restaurant Management', description: 'Tables, KOT, orders, and billing.', href: '#/industry/restaurant', icon: ReceiptText },
      { label: 'Public Distribution & Commodities', description: 'PDS, horticulture, and mining workflows.', href: '#/industry/public-distribution', icon: Layers },
    ],
  },
  { label: 'Platform', href: '#platform' },
  { label: 'About Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]

export const capabilities: Capability[] = [
  { label: 'Bank & Fintech Partnerships', icon: Banknote, accent: 'blue' },
  { label: 'Android & Windows POS', icon: Layers, accent: 'green' },
  { label: 'Integrated Payments', icon: Wallet, accent: 'yellow' },
  { label: 'Retail Business Insights', icon: LayoutDashboard, accent: 'red' },
  { label: 'Customer Engagement', icon: Users, accent: 'blue' },
]

export const solutions: Solution[] = [
  {
    id: 'turbo-android-pos',
    accent: 'green',
    icon: ShoppingBag,
    title: 'Turbo POS',
    platform: 'Android',
    image: turboImg,
    imageAlt: 'SnapBizz Turbo Android POS terminal',
    description:
      'Android POS terminal for fast counter billing, inventory, customer engagement, and business insights.',
    features: [
      'Itemized and non-itemized billing with product lookup',
      'Multiple carts for faster queue clearance',
      'Product catalogs and barcode-based workflows',
      'Inventory and store management',
      'WhatsApp, RCS, SMS campaigns, offers, and Google Reviews',
      'Sales reports, dashboards, and portal-based store visibility',
    ],
    cta: 'Request a Turbo Demo',
  },
  {
    id: 'neo-windows-pos',
    accent: 'blue',
    icon: LayoutDashboard,
    title: 'Neo POS',
    platform: 'Windows',
    image: neoImg,
    imageAlt: 'SnapBizz Neo Windows POS on a laptop',
    description:
      'Windows POS software for laptops and desktops, built for high-volume billing and full store management.',
    features: [
      'Fast keyboard and barcode-scanner billing',
      'Works on existing Windows laptops and desktops',
      'Product catalogs, bulk import, and stock control',
      'Printer and label integration',
      'Customer engagement and offers',
      'Sales reports and multi-store portal visibility',
    ],
    cta: 'Request a Neo Demo',
  },
  {
    id: 'label-printer',
    accent: 'yellow',
    icon: Receipt,
    title: 'Label Printer',
    platform: 'Hardware',
    image: printerImg,
    imageAlt: 'TSC label printer for barcode and price labels',
    description:
      'Barcode and price label printing that works with SnapBizz POS for shelves, products, and packaging.',
    features: [
      'Barcode and price label printing',
      'Thermal printing with no ink or toner',
      'Works with Turbo and Neo POS',
      'Custom label sizes and templates',
      'Quick shelf and product labelling',
      'Reliable, durable build for daily use',
    ],
    cta: 'Ask About Printers',
  },
  {
    id: 'warehouse-portal',
    accent: 'red',
    icon: Building2,
    title: 'Warehouse Portal',
    platform: 'Web',
    image: warehousePortalImg,
    imageAlt: 'SnapBizz Warehouse Portal web app showing the product catalogue and inventory',
    description:
      'Web portal for distributors and warehouses to manage stock, orders, and store-level visibility.',
    features: [
      'Central inventory across warehouses and stores',
      'Order and dispatch tracking',
      'Product catalog management',
      'Multi-location dashboards',
      'Reports and audit-ready records',
      'Integration with SnapBizz POS and ERP',
    ],
    cta: 'Request Portal Access',
  },
  {
    id: 'bank-branded-apos',
    accent: 'blue',
    icon: Banknote,
    title: 'Bank-Branded APOS Solutions',
    platform: 'Android',
    image: aposImg,
    imageAlt: 'Bank-branded Android APOS handheld device',
    description:
      'Customizable merchant applications on supported Android APOS devices, helping banks and fintechs deepen merchant engagement.',
    features: [
      'Bank branding and banners for relevant banking products',
      'Catalog management using the SnapBizz product database',
      'Itemized and quick billing with inventory tools',
      'Digital Khata Book for customer dues, sales, and payments',
      'Supported WhatsApp, RCS, SMS, coupons, and Google Review links',
      'Business reports and supported multi-device, multi-store dashboards',
    ],
    cta: 'Explore Solution',
  },
  {
    id: 'custom-enterprise',
    accent: 'green',
    icon: Layers,
    title: 'Custom Enterprise Solutions',
    platform: 'Custom',
    image: tabletImg,
    imageAlt: 'SnapBizz tablet showing the Billing Monitor for custom enterprise workflows',
    description:
      'Purpose-built workflows for businesses with specialized operational requirements, carrying your own branding across every customer touchpoint.',
    features: [
      'Tailored operational workflows',
      'Enterprise branding',
      'Customized billing and payment processes',
      'Collections, distribution, ticketing, and transit workflows',
      'Android APOS and mobile deployments based on requirements',
      'Asset-lite smartphone capabilities with UPI QR where configured',
    ],
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'payment-collection',
    accent: 'yellow',
    icon: Wallet,
    title: 'Payment Collection & Reconciliation',
    platform: 'Web + POS',
    image: warehousePortalImg,
    imageAlt: 'SnapBizz Warehouse Portal web interface alongside an APOS payment device',
    secondaryImage: {
      src: aposImg,
      alt: 'APOS device connected to PC billing for payment collection',
    },
    description:
      'Connect PC-based billing with supported APOS devices, match billing records to payments, and simplify reconciliation.',
    features: [
      'PC billing-to-APOS integration',
      'Payment initiation and transaction-status handling where supported',
      'Matching billing records with payment transactions',
      'Cash, UPI, and card workflows where supported',
      'Centralized reporting',
      'Multi-endpoint reconciliation and supported ERP integration',
    ],
    cta: 'Explore Solution',
  },
]

export const industries: Industry[] = [
  {
    id: 'retail',
    title: 'Retail and Distribution',
    description: 'Payment collection, billing workflows, reporting, and ERP integration.',
    icon: ShoppingBag,
    accent: 'blue',
  },
  {
    id: 'government',
    title: 'Government and Municipalities',
    description: 'Property tax, water tax, and municipal charge collection.',
    icon: Landmark,
    accent: 'red',
  },
  {
    id: 'parking',
    title: 'Parking Management',
    description: 'Vehicle entry and exit, billing, payments, and reconciliation.',
    icon: Car,
    accent: 'yellow',
  },
  {
    id: 'temple',
    title: 'Temple Management',
    description: 'Seva ticketing, donations, prasadam sales, multilingual support, and reporting.',
    icon: TempleIcon,
    accent: 'green',
  },
  {
    id: 'railway',
    title: 'Railway E-Catering',
    description: 'Meal ordering and secure payment integration.',
    icon: TrainFront,
    accent: 'blue',
  },
  {
    id: 'traffic',
    title: 'Traffic Management',
    description: 'Electronic challan issuance and fine collection.',
    icon: TrafficSignalIcon,
    accent: 'red',
  },
  {
    id: 'enterprise-erp',
    title: 'Enterprise and ERP',
    description: 'PC-to-POS integration and customized Windows or Android billing solutions.',
    icon: Building2,
    accent: 'green',
  },
  {
    id: 'restaurant',
    title: 'Restaurant Management',
    description: 'Customer and table management, Kitchen Order Tickets (KOT), order processing, and billing.',
    icon: ReceiptText,
    accent: 'yellow',
  },
  {
    id: 'public-distribution',
    title: 'Public Distribution & Commodities',
    description: 'Configurable PDS, horticulture, and mining workflows with transaction recording, reconciliation, and reporting.',
    icon: Layers,
    accent: 'blue',
  },
]

export const platformFeatures: PlatformFeature[] = [
  { title: 'Centralized Dashboards', description: 'Store and device visibility through supported dashboards and portals.', icon: LayoutDashboard, accent: 'blue' },
  { title: 'Business Insights', description: 'Sales reports and performance information for informed decisions.', icon: Sparkles, accent: 'yellow' },
  { title: 'Inventory & Product Management', description: 'Product information, catalogs, and stock-related operations.', icon: Layers, accent: 'green' },
  { title: 'Customer Engagement', description: 'Supported WhatsApp, RCS, SMS, offers, and Google Review engagement.', icon: Globe2, accent: 'blue' },
  { title: 'Cloud Backup & Recovery', description: 'Cloud-based backup and recovery for retail business information.', icon: ShieldCheck, accent: 'red' },
  { title: 'ERP & POS Integration', description: 'Payment and business-system integrations based on project requirements.', icon: Receipt, accent: 'green' },
  { title: 'Windows & Android Deployment', description: 'Desktop retail, supported APOS devices, and mobile deployment options.', icon: ReceiptText, accent: 'yellow' },
  { title: 'Training & Merchant Support', description: 'Product training, implementation assistance, and onboarding support.', icon: Users, accent: 'blue' },
]

export const platformFeatureDetails: Record<string, string[]> = {
  'Centralized Dashboards': ['Central visibility across supported stores and devices', 'Portal-based management capabilities', 'Centralized business and transaction reporting'],
  'Business Insights': ['Sales reports and performance information', 'Retail data and business analytics through SnapPulse', 'Insights to support informed store decisions'],
  'Inventory & Product Management': ['Product information and catalog management', 'Barcode-based retail workflows', 'Stock-related operations and everyday store management'],
  'Customer Engagement': ['Supported WhatsApp, RCS, and SMS campaigns', 'Promotional offers and coupons', 'Google Review links and customer communication'],
  'Cloud Backup & Recovery': ['Cloud-based backup of retail business information', 'Data recovery capabilities', 'Cloud data access based on the deployed configuration'],
  'ERP & POS Integration': ['PC billing integration with supported APOS devices', 'Matching billing records with payment transactions', 'Supported ERP integration and payment reconciliation'],
  'Windows & Android Deployment': ['Windows POS for desktop-based retail workflows', 'Merchant applications on supported Android APOS devices', 'Asset-lite smartphone options based on configuration'],
  'Training & Merchant Support': ['Product training and sales-team enablement', 'Implementation assistance and merchant onboarding', 'Ongoing support as agreed with the partner'],
}

export const retailServices: { name: string; description: string; icon: LucideIcon; accent: BrandAccent }[] = [
  { name: 'SnapBilling', description: 'Billing, inventory, and day-to-day retail operations.', icon: ReceiptText, accent: 'blue' },
  { name: 'SnapOrder', description: 'Online ordering and digital shopping experiences.', icon: ShoppingBag, accent: 'green' },
  { name: 'SnapPulse', description: 'Retail data, reports, and business analytics.', icon: LayoutDashboard, accent: 'red' },
  { name: 'SnapSupply', description: 'Digital ordering of supplies for retailers.', icon: Layers, accent: 'yellow' },
  { name: 'SnapConnect', description: 'Customer communication and engagement.', icon: Users, accent: 'blue' },
]

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Understand Your Workflow',
    description: 'Identify the operational requirements and business goals.',
  },
  {
    step: '02',
    title: 'Configure Your Solution',
    description: 'Tailor branding, workflows, payment processes, and integrations to the use case.',
  },
  {
    step: '03',
    title: 'Deploy and Support',
    description: 'Enable the solution with reporting capabilities and dedicated support.',
  },
]

export const reasons: ReasonItem[] = [
  { title: 'Flexible, Customized Workflows', description: 'Solutions configured around how your business actually operates.', icon: Layers, accent: 'blue' },
  { title: 'Centralized Reporting & Visibility', description: 'One view across stores, devices, and teams.', icon: LayoutDashboard, accent: 'green' },
  { title: 'Multilingual, Multi-Environment', description: 'Built for diverse languages and business environments.', icon: Globe2, accent: 'yellow' },
  { title: 'ERP & POS Integration', description: 'Works alongside the systems you already depend on.', icon: Receipt, accent: 'red' },
  { title: 'Multi-Industry Expertise', description: 'From retail to government to temple management.', icon: Building2, accent: 'blue' },
  { title: 'Dedicated Customer Support', description: 'A team invested in your rollout and ongoing operations.', icon: Users, accent: 'green' },
]

export const industryOptions = [...industries.map((industry) => industry.title), 'Bank', 'Device Partner', 'Custom']
export const solutionOptions = solutions.map((solution) => solution.title)
