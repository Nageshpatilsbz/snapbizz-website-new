import {
  BarChart3,
  Banknote,
  Boxes,
  CheckCircle2,
  ClipboardList,
  CloudUpload,
  CreditCard,
  FileCheck2,
  Globe2,
  HeartHandshake,
  Languages,
  LayoutDashboard,
  Monitor,
  Network,
  ReceiptText,
  ScanLine,
  Settings2,
  ShieldCheck,
  Smartphone,
  Tablet,
  Ticket,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'
import type { Step } from '../components/sections/SolutionFlow'

export interface IndustryFeature {
  icon: LucideIcon
  title: string
  text: string
}

export interface IndustryDetail {
  tagline: string
  overview: string
  features: IndustryFeature[]
  flow: Step[]
}

export const industryDetails: Record<string, IndustryDetail> = {
  retail: {
    tagline: 'Billing, collections and reporting for every counter',
    overview:
      'Retailers and distributors run on fast billing and reliable payment collection. SnapBizz brings billing workflows, payments, reporting and ERP integration together so every sale is recorded and reconciled.',
    features: [
      { icon: ReceiptText, title: 'Billing Workflows', text: 'Quick, accurate billing designed for busy counters.' },
      { icon: CreditCard, title: 'Payment Collection', text: 'Collect payments in the modes your customers prefer.' },
      { icon: BarChart3, title: 'Reporting', text: 'Sales and collection reports that show how the business is doing.' },
      { icon: Network, title: 'ERP Integration', text: 'Connect billing with the systems you already use.' },
    ],
    flow: [
      { icon: ReceiptText, label: 'Bill', detail: 'Create the invoice' },
      { icon: CreditCard, label: 'Collect', detail: 'Accept the payment' },
      { icon: FileCheck2, label: 'Reconcile', detail: 'Match payments to bills' },
      { icon: BarChart3, label: 'Report', detail: 'See the full picture' },
    ],
  },
  government: {
    tagline: 'Simple, transparent collection of municipal charges',
    overview:
      'Municipalities collect property tax, water tax and other charges from many citizens. SnapBizz helps record each collection, issue receipts and keep accounts reconciled and reportable.',
    features: [
      { icon: Banknote, title: 'Property & Water Tax', text: 'Collect recurring municipal charges in one place.' },
      { icon: ReceiptText, title: 'Instant Receipts', text: 'Give citizens a clear record of every payment.' },
      { icon: FileCheck2, title: 'Reconciliation', text: 'Match collections to dues and settlements.' },
      { icon: LayoutDashboard, title: 'Oversight Reports', text: 'Give officials visibility into collections.' },
    ],
    flow: [
      { icon: ClipboardList, label: 'Dues', detail: 'Charge is identified' },
      { icon: CreditCard, label: 'Collect', detail: 'Citizen pays' },
      { icon: ReceiptText, label: 'Receipt', detail: 'Proof of payment' },
      { icon: FileCheck2, label: 'Reconcile', detail: 'Accounts stay matched' },
    ],
  },
  parking: {
    tagline: 'Smooth entry, exit and payment for every vehicle',
    overview:
      'Parking operations need quick entry and exit handling and dependable billing. SnapBizz records vehicles, bills them, accepts payments and reconciles collections.',
    features: [
      { icon: ScanLine, title: 'Entry & Exit', text: 'Log vehicles as they come in and go out.' },
      { icon: ReceiptText, title: 'Automatic Billing', text: 'Charges are calculated for each visit.' },
      { icon: CreditCard, title: 'Payments', text: 'Collect parking fees at the exit point.' },
      { icon: FileCheck2, title: 'Reconciliation', text: 'Match daily collections with records.' },
    ],
    flow: [
      { icon: ScanLine, label: 'Entry', detail: 'Vehicle is recorded' },
      { icon: ReceiptText, label: 'Bill', detail: 'Fee is calculated' },
      { icon: CreditCard, label: 'Pay', detail: 'Payment at exit' },
      { icon: FileCheck2, label: 'Reconcile', detail: 'Daily accounts match' },
    ],
  },
  temple: {
    tagline: 'Seva, donations and prasadam, managed with ease',
    overview:
      'Temples handle seva ticketing, donations and prasadam sales for devotees from many backgrounds. SnapBizz supports these workflows with multilingual support and clear reporting.',
    features: [
      { icon: Ticket, title: 'Seva Ticketing', text: 'Issue seva tickets quickly and accurately.' },
      { icon: HeartHandshake, title: 'Donations', text: 'Record donations with proper receipts.' },
      { icon: Languages, title: 'Multilingual', text: 'Serve devotees in the language they are comfortable with.' },
      { icon: BarChart3, title: 'Reporting', text: 'Clear reports for trustees and administrators.' },
    ],
    flow: [
      { icon: Ticket, label: 'Seva', detail: 'Choose and book' },
      { icon: HeartHandshake, label: 'Donate', detail: 'Offer a contribution' },
      { icon: ReceiptText, label: 'Prasadam', detail: 'Collect prasadam' },
      { icon: BarChart3, label: 'Report', detail: 'Transparent records' },
    ],
  },
  railway: {
    tagline: 'Meals ordered easily, paid for securely',
    overview:
      'Railway e-catering lets travellers order meals and pay online. SnapBizz supports meal ordering together with secure payment integration.',
    features: [
      { icon: UtensilsCrossed, title: 'Meal Ordering', text: 'Travellers choose and order the meal they want.' },
      { icon: ShieldCheck, title: 'Secure Payments', text: 'Payment integration built for secure transactions.' },
      { icon: CheckCircle2, title: 'Order Confirmation', text: 'Clear confirmation for every order.' },
      { icon: BarChart3, title: 'Order Reports', text: 'Track orders and payments over time.' },
    ],
    flow: [
      { icon: UtensilsCrossed, label: 'Order', detail: 'Pick a meal' },
      { icon: ShieldCheck, label: 'Pay', detail: 'Secure checkout' },
      { icon: CheckCircle2, label: 'Confirm', detail: 'Order is confirmed' },
      { icon: Truck, label: 'Serve', detail: 'Meal reaches the traveller' },
    ],
  },
  traffic: {
    tagline: 'Electronic challans and easy fine collection',
    overview:
      'Traffic enforcement needs fast challan issuance and dependable fine collection. SnapBizz supports electronic challans and the collection of fines.',
    features: [
      { icon: Tablet, title: 'E-Challan Issuance', text: 'Issue challans electronically on the spot.' },
      { icon: CreditCard, title: 'Fine Collection', text: 'Accept fine payments with a clear record.' },
      { icon: ReceiptText, title: 'Digital Receipts', text: 'Provide proof of payment immediately.' },
      { icon: BarChart3, title: 'Reports', text: 'Keep track of issued and collected fines.' },
    ],
    flow: [
      { icon: Tablet, label: 'Issue', detail: 'E-challan is created' },
      { icon: CreditCard, label: 'Collect', detail: 'Fine is paid' },
      { icon: ReceiptText, label: 'Receipt', detail: 'Payment is recorded' },
      { icon: BarChart3, label: 'Report', detail: 'Collections are tracked' },
    ],
  },
  'enterprise-erp': {
    tagline: 'Billing that plugs into the systems you already run',
    overview:
      'Enterprises often need billing that works with their own software. SnapBizz offers PC-to-POS integration and customized Windows or Android billing solutions.',
    features: [
      { icon: Network, title: 'PC-to-POS Integration', text: 'Link your existing software to the POS.' },
      { icon: Monitor, title: 'Windows Billing', text: 'Customized billing for desktop workflows.' },
      { icon: Smartphone, title: 'Android Billing', text: 'Flexible billing on Android devices.' },
      { icon: Settings2, title: 'Customization', text: 'Solutions shaped around your processes.' },
    ],
    flow: [
      { icon: Settings2, label: 'Requirements', detail: 'Understand the workflow' },
      { icon: Network, label: 'Integrate', detail: 'Connect PC and POS' },
      { icon: Monitor, label: 'Bill', detail: 'On Windows or Android' },
      { icon: CloudUpload, label: 'Sync', detail: 'Data flows to your ERP' },
    ],
  },
  restaurant: {
    tagline: 'From table to bill, the whole dining flow',
    overview:
      'Restaurants coordinate guests, tables, the kitchen and billing. SnapBizz supports customer and table management, Kitchen Order Tickets (KOT), order processing and billing.',
    features: [
      { icon: Globe2, title: 'Table Management', text: 'Keep track of guests and tables.' },
      { icon: ClipboardList, title: 'Kitchen Order Tickets', text: 'Send orders to the kitchen as KOTs.' },
      { icon: Boxes, title: 'Order Processing', text: 'Handle orders from start to finish.' },
      { icon: ReceiptText, title: 'Billing', text: 'Generate accurate bills for every table.' },
    ],
    flow: [
      { icon: Globe2, label: 'Table', detail: 'Guests are seated' },
      { icon: ClipboardList, label: 'KOT', detail: 'Order goes to kitchen' },
      { icon: UtensilsCrossed, label: 'Serve', detail: 'Order is processed' },
      { icon: ReceiptText, label: 'Bill', detail: 'Bill and payment' },
    ],
  },
  'public-distribution': {
    tagline: 'Configurable workflows for public distribution and commodities',
    overview:
      'Public distribution, horticulture and mining each have their own transaction rules. SnapBizz offers configurable workflows with transaction recording, reconciliation and reporting.',
    features: [
      { icon: Settings2, title: 'Configurable Workflows', text: 'Set up PDS, horticulture or mining flows.' },
      { icon: ClipboardList, title: 'Transaction Recording', text: 'Every transaction is captured.' },
      { icon: FileCheck2, title: 'Reconciliation', text: 'Match records to maintain accuracy.' },
      { icon: BarChart3, title: 'Reporting', text: 'Reports for oversight and planning.' },
    ],
    flow: [
      { icon: Settings2, label: 'Configure', detail: 'Set the workflow' },
      { icon: ClipboardList, label: 'Record', detail: 'Log each transaction' },
      { icon: FileCheck2, label: 'Reconcile', detail: 'Verify the records' },
      { icon: BarChart3, label: 'Report', detail: 'Share the results' },
    ],
  },
}
