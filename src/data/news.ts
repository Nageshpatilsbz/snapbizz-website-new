import iciciEazyStore from '../assets/news/icici-eazystore.png'
import premKumarInterview from '../assets/news/prem-kumar-interview.jpg'
import consumptionBharatBoost from '../assets/news/consumption-bharat-boost.bmp'
import festiveSpending from '../assets/news/festive-spending-tradeoffs.jpg'
import kiranaB2b from '../assets/news/kiranas-b2b-apps.jpg'
import localCustomers from '../assets/news/customers-vocal-for-local.jpg'
import snapbizzGrowth from '../assets/news/snapbizz-scaled-revenue.jpg'
import kiranaHeroes from '../assets/news/kirana-stores-new-heroes.jpg'
import kiranaDigital from '../assets/news/kirana-stores-go-digital.jpg'
import digitalDistribution from '../assets/news/digital-distribution-fmcg.jpg'

export const newsStories = [
  {
    slug: 'powering-icici-banks-eazystore-solution',
    title: 'Snapbizz Powering ICICI Bank’s EazyStore Solution',
    date: '2022-07-11',
    dateLabel: 'July 11, 2022',
    source: 'SnapBizz',
    summary: 'SnapBizz technology supports ICICI Bank’s EazyStore with digital storefronts, advanced billing, and supply management for small merchants.',
    image: iciciEazyStore,
    imageAlt: 'ICICI Bank EazyStore online shop promotion',
  },
  {
    slug: 'our-challenge-now-is-to-build-a-robust-distribution-network-to-cater-over-200-cities-prem-kumar-founder-ceo-snapbizz',
    title: 'Our Challenge Now Is To Build A Robust Distribution Network To Cater Over 200 Cities',
    date: '2020-11-02',
    dateLabel: 'November 2, 2020',
    source: 'BW Disrupt',
    summary: 'SnapBizz founder and CEO Prem Kumar discusses distribution expansion, the business model, competition, and plans for growth.',
    image: premKumarInterview,
    imageAlt: 'SnapBizz founder and CEO Prem Kumar',
  },
  {
    slug: 'consumption-gets-a-bharat-boost',
    title: 'Consumption Gets a Bharat Boost',
    date: '2020-10-07',
    dateLabel: 'October 7, 2020',
    source: 'Business Today',
    summary: 'Coverage on the revival of consumer spending in smaller towns and the changing balance between regional markets and metros.',
    image: consumptionBharatBoost,
    imageAlt: 'Retail and consumer products representing spending beyond major cities',
  },
  {
    slug: 'consumers-making-key-trade-offs-in-festive-spending',
    title: 'Consumers making key trade-offs in festive spending',
    date: '2020-09-02',
    dateLabel: 'September 2, 2020',
    source: 'The Economic Times',
    summary: 'A report looks at how the pandemic changed grocery baskets, shopping frequency, store visits, and online versus in-store choices.',
    image: festiveSpending,
    imageAlt: 'Festive retail products and consumer shopping choices',
  },
  {
    slug: 'kiranas-flock-to-b2b-apps-for-supplies',
    title: 'Kiranas flock to B2B apps for supplies',
    date: '2020-08-17',
    dateLabel: 'August 17, 2020',
    source: 'LiveMint',
    summary: 'Neighbourhood grocery stores turn to digital payments and B2B apps to replenish stock as lockdowns disrupt supply chains.',
    image: kiranaB2b,
    imageAlt: 'A neighborhood grocery store using digital tools to source supplies',
  },
  {
    slug: 'customers-vocal-for-local-finds-survey',
    title: 'Customers vocal for local, finds survey',
    date: '2020-08-14',
    dateLabel: 'August 14, 2020',
    source: 'The Times of India',
    summary: 'Reporting on shoppers who continued choosing regional brands for everyday goods, even after larger brands returned to shelves.',
    image: localCustomers,
    imageAlt: 'Local grocery products on a neighborhood store shelf',
  },
  {
    slug: 'how-retail-tech-startup-snapbizz-scaled-its-business-and-clocked-rs-7-cr-revenue-amidst-covid-19-pandemic',
    title: 'How retail tech startup SnapBizz scaled its business amidst the COVID-19 pandemic',
    date: '2020-08-14',
    dateLabel: 'August 14, 2020',
    source: 'YourStory',
    summary: 'A profile of SnapBizz’s growth and the day-to-day challenges faced by neighbourhood retailers during the pandemic.',
    image: snapbizzGrowth,
    imageAlt: 'SnapBizz founder Prem Kumar in an interview',
  },
  {
    slug: 'kirana-stores-the-new-heroes-of-indian-economy-during-covid-19',
    title: 'Kirana Stores: The new heroes of Indian economy during COVID-19',
    date: '2020-08-14',
    dateLabel: 'August 14, 2020',
    source: 'Progressive Grocer',
    summary: 'A look at how local grocery stores adapted as e-commerce and new delivery options raised expectations for neighborhood retail.',
    image: kiranaHeroes,
    imageAlt: 'Neighborhood grocery store serving local customers',
  },
  {
    slug: 'how-tech-start-ups-fmcg-majors-are-helping-kirana-stores-go-digital',
    title: 'How tech start-ups, FMCG majors are helping kirana stores go digital',
    date: '2020-07-27',
    dateLabel: 'July 27, 2020',
    source: 'Business Today',
    summary: 'Coverage of efforts to help neighborhood stores build an online presence as more consumers shop digitally.',
    image: kiranaDigital,
    imageAlt: 'A kirana shop exploring digital ordering and customer service',
  },
  {
    slug: 'in-covid-19-world-digital-distribution-platforms-become-strong-alternative-for-fmcg-majors',
    title: 'In COVID-19 world, digital distribution platforms become strong alternative for FMCG majors',
    date: '2020-07-16',
    dateLabel: 'July 16, 2020',
    source: 'Business Today',
    summary: 'How disrupted supply chains pushed consumer-goods companies to consider digital-first distribution and new routes to market.',
    image: digitalDistribution,
    imageAlt: 'Digital distribution and supply network illustration',
  },
] as const