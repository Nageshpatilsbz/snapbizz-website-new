import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { pageHref } from './lib/urls'

const root = document.getElementById('root')
if (!root) throw new Error('The application root element is missing.')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
const home = pageHref('')

if (navigation?.type === 'reload' && `${window.location.pathname}${window.location.search}${window.location.hash}` !== home) {
  window.location.replace(home)
} else if (document.documentElement.hasAttribute('data-prerendered')) {
  if (navigation?.type === 'reload') {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }
  hydrateRoot(root, app)
} else {
  if (navigation?.type === 'reload') {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }
  createRoot(root).render(app)
}
