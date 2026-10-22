import termsText from '../../data/termsAndConditions.txt?raw'

const paragraphs = termsText.trim().split(/\r?\n\s*\r?\n/)
const clauseHeadings = [
  'Limited License.',
  'Privacy Policy.',
  'Restrictions.',
  'Ownership.',
  'Termination.',
  'Refunds / Cancellation.',
  'No Support.',
  'Limitation of Liability.',
  'Export.',
  'U.S. Government End Users.',
  'Miscellaneous.',
  'SnapBizz Privacy Policy',
  '1. Data we collect',
  '2. Cross-Border Transfer',
  '3. Uses of Information',
  '4. Data Sharing',
  '5.Opt Out',
  '6. Accessing and Changing Your Account Information',
  '7. Security',
  '8. Contact Us',
  'Effective Date:',
]

export function TermsAndConditions() {
  return (
    <article aria-label="Software agreement and mobile service privacy terms" className="space-y-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
      {paragraphs.map((paragraph, index) => {
        const heading = clauseHeadings.find((title) => paragraph.startsWith(title))
        return (
          <p key={index} className={`whitespace-pre-wrap break-words leading-relaxed ${index === 0 ? 'font-semibold text-ink-700' : ''}`}>
            {heading ? <><strong className="font-semibold text-ink-700">{heading}</strong>{paragraph.slice(heading.length)}</> : paragraph}
          </p>
        )
      })}
    </article>
  )
}
