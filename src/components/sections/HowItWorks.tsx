import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Headphones, Lightbulb, Rocket } from 'lucide-react'
import { useRef, useState } from 'react'
import { processSteps } from '../../data/content'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

function ProcessIllustration({ step }: { step: string }) {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" fill="none" aria-hidden="true">
      <ellipse cx="160" cy="158" rx="116" ry="8" fill="#dce5f1" opacity="0.6" />
      {step === '01' ? (
        <>
          <circle cx="160" cy="82" r="70" fill="#e8f0fe" />
          <rect x="173" y="21" width="101" height="73" rx="16" fill="white" stroke="#ceddf7" strokeWidth="2" />
          <path d="m188 93-9 14 28-14" fill="white" stroke="#ceddf7" strokeWidth="2" strokeLinejoin="round" />
          <g className="process-idea">
            <circle cx="224" cy="56" r="23" fill="#fff6dc" />
            <Lightbulb x="208" y="40" width="32" height="32" stroke="#d99400" strokeWidth="1.7" />
          </g>
          <circle className="process-thought-dot" cx="147" cy="54" r="3" fill="#4285f4" />
          <circle className="process-thought-dot" cx="158" cy="45" r="4" fill="#4285f4" style={{ animationDelay: '0.2s' }} />
          <circle className="process-thought-dot" cx="170" cy="37" r="5" fill="#4285f4" style={{ animationDelay: '0.4s' }} />
          <path d="M80 145v-28a30 30 0 0 1 60 0v28" fill="#4285f4" />
          <rect x="102" y="78" width="16" height="21" rx="7" fill="#e9b18d" />
          <circle cx="110" cy="64" r="23" fill="#f3c7a9" />
          <path d="M87 64c-6-28 38-40 47-9-10 3-20 0-25-10-3 12-12 18-22 19" fill="#253653" />
          <path d="M112 66h2m10 0h2" stroke="#253653" strokeWidth="3" strokeLinecap="round" />
          <path d="m123 75-5 3" stroke="#b36f50" strokeWidth="2" strokeLinecap="round" />
          <path d="m132 114 13-20-11-16" stroke="#f3c7a9" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="56" y="143" width="202" height="7" rx="3.5" fill="#aebed6" />
          <path d="M72 150v10m170-10v10" stroke="#aebed6" strokeWidth="5" strokeLinecap="round" />
          <rect x="158" y="105" width="72" height="39" rx="5" fill="#dbe7fb" stroke="#9eb9e6" strokeWidth="2" />
          <path d="M152 143h84" stroke="#7f9dc9" strokeWidth="4" strokeLinecap="round" />
          <circle cx="194" cy="124" r="5" fill="#4285f4" />
        </>
      ) : step === '02' ? (
        <>
          <circle cx="160" cy="82" r="70" fill="#fff6dc" />
          <rect x="64" y="25" width="192" height="123" rx="12" fill="white" stroke="#d7e0ec" strokeWidth="2" />
          <path d="M76 25h168a12 12 0 0 1 12 12v11H64V37a12 12 0 0 1 12-12" fill="#253653" />
          <circle cx="78" cy="37" r="3" fill="#db4437" />
          <circle cx="89" cy="37" r="3" fill="#f4b400" />
          <circle cx="100" cy="37" r="3" fill="#0f9d58" />
          <rect x="77" y="60" width="36" height="73" rx="5" fill="#f1f5fb" />
          <path d="M85 72h20M85 83h15M85 94h18" stroke="#bdcbdc" strokeWidth="3" strokeLinecap="round" />
          <path d="M130 73h105M130 97h105M130 121h105" stroke="#e3e7ee" strokeWidth="5" strokeLinecap="round" />
          <path d="M130 73h35M130 97h74M130 121h52" stroke="#f4b400" strokeWidth="5" strokeLinecap="round" />
          <circle className="process-slider" cx="165" cy="73" r="7" fill="white" stroke="#d99400" strokeWidth="3" />
          <circle className="process-slider process-slider-reverse" cx="204" cy="97" r="7" fill="white" stroke="#4285f4" strokeWidth="3" />
          <circle className="process-slider" cx="182" cy="121" r="7" fill="white" stroke="#0f9d58" strokeWidth="3" style={{ animationDelay: '0.35s' }} />
          <g className="process-config-check">
            <rect x="225" y="108" width="49" height="41" rx="12" fill="#0f9d58" />
            <Check x="236" y="116" width="27" height="27" stroke="white" strokeWidth="3" />
          </g>
          <rect x="46" y="87" width="28" height="28" rx="8" fill="#4285f4" />
          <path d="M54 96h12m-12 5h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="160" cy="82" r="70" fill="#e3f6ec" />
          <rect x="61" y="61" width="159" height="91" rx="10" fill="#253653" />
          <rect x="68" y="68" width="145" height="72" rx="5" fill="white" />
          <rect x="78" y="78" width="25" height="51" rx="3" fill="#e8f0fe" />
          <path d="M84 87h13M84 96h10M84 105h12" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" />
          <path d="M117 88h51M117 98h37" stroke="#bdcbdc" strokeWidth="3" strokeLinecap="round" />
          <rect x="117" y="110" width="20" height="18" rx="3" fill="#e3f6ec" />
          <rect x="143" y="110" width="20" height="18" rx="3" fill="#e8f0fe" />
          <path d="M54 152h173" stroke="#aebed6" strokeWidth="6" strokeLinecap="round" />
          <g className="process-rocket">
            <circle cx="231" cy="49" r="29" fill="white" stroke="#bce4ce" strokeWidth="2" />
            <Rocket x="213" y="31" width="36" height="36" stroke="#0f9d58" strokeWidth="1.7" fill="#e3f6ec" />
          </g>
          <g className="process-deploy-check">
            <circle cx="186" cy="104" r="15" fill="#0f9d58" />
            <Check x="176" y="94" width="20" height="20" stroke="white" strokeWidth="3" />
          </g>
          <circle className="process-support-ring" cx="249" cy="130" r="25" stroke="#0f9d58" strokeWidth="2" />
          <circle cx="249" cy="130" r="22" fill="white" stroke="#bce4ce" strokeWidth="2" />
          <Headphones x="235" y="116" width="28" height="28" stroke="#0f9d58" strokeWidth="1.8" />
          <path d="m244 152 4 7 5-7" fill="#bce4ce" />
        </>
      )}
    </svg>
  )
}

export function HowItWorks() {
  const storyRef = useRef<HTMLOListElement>(null)
  const isInView = useInView(storyRef, { amount: 0.2 })
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const playing = isInView && !reducedMotion

  return (
    <section id="how-it-works" className="bg-surface-soft py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="How It Works"
          title="A Straightforward Path to Deployment"
          description="A general engagement process we follow with every partner &mdash; tailored to your workflow, not a fixed script."
        />

        <ol ref={storyRef} data-playing={playing} className="process-story grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <motion.li
              key={step.step}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative h-full"
              data-active={activeIndex === index}
            >
              <div className={`flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-5 transition-[border-color,box-shadow] duration-500 sm:p-6 ${
                activeIndex === index
                  ? 'border-brand-blue/40 shadow-[0_16px_40px_-20px_rgba(66,133,244,0.45)] ring-1 ring-brand-blue/10'
                  : 'border-line shadow-sm'
              }`}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={activeIndex === index}
                    aria-label={`Show step ${step.step}: ${step.title}`}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      activeIndex === index ? 'bg-brand-blue text-white' : 'bg-surface-soft text-ink-500 hover:bg-brand-blue-light'
                    }`}
                  >
                    <span className="tabular-nums">{step.step}</span>
                    <span>{index === 0 ? 'Discover' : index === 1 ? 'Configure' : 'Launch & support'}</span>
                  </button>
                  <span className={`h-1.5 w-1.5 rounded-full ${activeIndex === index ? 'bg-brand-green' : 'bg-line'}`} aria-hidden="true" />
                </div>
                <div className="mb-5 flex h-40 items-center justify-center rounded-2xl bg-surface-soft/70 lg:h-44">
                  <ProcessIllustration step={step.step} />
                </div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">{step.title}</h3>
                <p className="mb-5 mt-2 flex-1 text-sm leading-relaxed text-ink-500">{step.description}</p>
                <div className="h-1 overflow-hidden rounded-full bg-surface-muted" aria-hidden="true">
                  <span
                    key={activeIndex}
                    className={`process-stage-progress block h-full origin-left rounded-full bg-brand-blue ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    onAnimationEnd={() => {
                      if (playing && activeIndex === index) {
                        setActiveIndex((current) => (current + 1) % processSteps.length)
                      }
                    }}
                  />
                </div>
              </div>
              {index < processSteps.length - 1 ? (
                <span className="absolute -right-5 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-brand-blue shadow-sm md:flex" aria-hidden="true">
                  <ArrowRight className="h-4 w-4" />
                </span>
              ) : null}
            </motion.li>
          ))}
        </ol>
        <p className="-mt-7 text-sm text-ink-500">From your first idea to everyday operations.</p>
      </Container>
    </section>
  )
}
