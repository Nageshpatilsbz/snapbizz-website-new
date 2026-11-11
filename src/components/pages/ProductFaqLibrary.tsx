import { useEffect, useState } from 'react'
import { productFaqs } from '../../data/productFaqs'

type ProductFaqId = (typeof productFaqs)[number]['id']

export function ProductFaqLibrary() {
  const [activeProductId, setActiveProductId] = useState<ProductFaqId>('turbo')
  const [searchQuery, setSearchQuery] = useState('')
  const product = productFaqs.find(({ id }) => id === activeProductId) ?? productFaqs[0]
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const visibleFaqs = product.faqs.filter(({ question, answer }) =>
    `${question} ${answer}`.toLowerCase().includes(normalizedQuery),
  )

  useEffect(() => {
    const requestedProduct = new URLSearchParams(window.location.search).get('product')
    if (productFaqs.some(({ id }) => id === requestedProduct)) {
      setActiveProductId(requestedProduct as ProductFaqId)
    }
  }, [])

  return (
    <section aria-labelledby="product-faq-title" className="mt-10 border-t border-line pt-8">
      <h2 id="product-faq-title" className="text-2xl font-semibold text-ink">Product FAQs</h2>
      <p className="mt-2 text-sm leading-6 text-ink-500">Answers for SnapBizz products and ordering apps.</p>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Product FAQs">
        {productFaqs.map(({ id, name }) => (
          <button
            key={id}
            id={`faq-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={activeProductId === id}
            aria-controls={`faq-panel-${id}`}
            onClick={() => {
              setActiveProductId(id)
              setSearchQuery('')
            }}
            className={`min-h-10 rounded-lg border px-4 text-sm font-semibold transition-colors ${activeProductId === id ? 'border-brand-blue/25 bg-brand-blue-light text-brand-blue-dark' : 'border-transparent text-ink-500 hover:bg-surface-soft hover:text-ink'}`}
          >
            {name}
          </button>
        ))}
      </div>

      <label className="mt-5 block text-sm font-medium text-ink-700" htmlFor="product-faq-search">Search questions and answers</label>
      <input
        id="product-faq-search"
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder={`Search ${product.name} FAQs`}
        className="mt-2 min-h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-300 focus:border-brand-blue focus:outline-none"
      />

      <div id={`faq-panel-${product.id}`} role="tabpanel" aria-labelledby={`faq-tab-${product.id}`} className="mt-5 border-t border-line">
        {visibleFaqs.length ? visibleFaqs.map(({ question, answer }) => (
          <details key={question} className="border-b border-line py-4">
            <summary className="cursor-pointer text-sm font-semibold leading-6 text-ink marker:text-brand-blue">{question}</summary>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-ink-500">{answer}</p>
          </details>
        )) : (
          <p className="py-6 text-sm text-ink-500">No matching questions. Try a different search.</p>
        )}
      </div>
    </section>
  )
}