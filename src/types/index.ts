import type { LucideIcon } from 'lucide-react'

export type BrandAccent = 'blue' | 'red' | 'yellow' | 'green'

export interface NavLink {
  label: string
  href: string
}

export interface NavDropdownItem {
  label: string
  description: string
  href: string
  icon: LucideIcon
}

export interface NavItem {
  label: string
  href: string
  items?: NavDropdownItem[]
}

export interface Capability {
  label: string
  icon: LucideIcon
  accent: BrandAccent
}

export interface Solution {
  id: string
  accent: BrandAccent
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  cta: string
}

export interface Industry {
  id: string
  title: string
  description: string
  icon: LucideIcon
  accent: BrandAccent
}

export interface PlatformFeature {
  title: string
  description: string
  icon: LucideIcon
  accent: BrandAccent
}

export interface ProcessStep {
  step: string
  title: string
  description: string
}

export interface ReasonItem {
  title: string
  description: string
  icon: LucideIcon
  accent: BrandAccent
}

export interface ContactFormValues {
  fullName: string
  businessEmail: string
  companyName: string
  phoneNumber: string
  industry: string
  solutionOfInterest: string
  requirements: string
  consent: boolean
}
