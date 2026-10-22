import { motion } from 'framer-motion'
import { AlertCircle, Building2, CheckCircle2, Clock, Headset, Layers, Loader2, Send, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { industryOptions, solutionOptions } from '../../data/content'
import type { ContactFormValues } from '../../types'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Select } from '../ui/Select'

const initialValues: ContactFormValues = {
  fullName: '',
  businessEmail: '',
  companyName: '',
  phoneNumber: '',
  industry: '',
  customReason: '',
  solutionOfInterest: '',
  requirements: '',
  consent: false,
}

type Errors = Partial<Record<keyof ContactFormValues, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[0-9+()\-\s]{7,15}$/

function validate(values: ContactFormValues): Errors {
  const errors: Errors = {}
  if (!values.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!values.businessEmail.trim()) {
    errors.businessEmail = 'Business email is required.'
  } else if (!emailPattern.test(values.businessEmail)) {
    errors.businessEmail = 'Enter a valid email address.'
  }
  if (!values.companyName.trim()) errors.companyName = 'Company name is required.'
  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.'
  } else if (!phonePattern.test(values.phoneNumber)) {
    errors.phoneNumber = 'Enter a valid phone number.'
  }
  if (!values.industry) errors.industry = 'Please select your industry.'
  if (values.industry === 'Custom' && !values.customReason.trim()) {
    errors.customReason = 'Please describe your industry or reason for contacting us.'
  }
  if (!values.solutionOfInterest) errors.solutionOfInterest = 'Please select a solution.'
  if (!values.requirements.trim()) errors.requirements = 'Please share a brief description.'
  if (!values.consent) errors.consent = 'Please accept the privacy consent to continue.'
  return errors
}

/**
 * NOTE: No backend/email service is configured yet. Replace this function with a real
 * API call (e.g. `fetch('/api/enquiries', { method: 'POST', body: JSON.stringify(values) })`)
 * once an enquiry-handling endpoint is available.
 */
async function submitEnquiry(values: ContactFormValues): Promise<void> {
  console.info('Business enquiry captured (no backend configured yet):', values)
  await new Promise((resolve) => setTimeout(resolve, 600))
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const updateField = <K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) => {
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setStatus('submitting')
    try {
      await submitEnquiry(values)
      setStatus('success')
      setValues(initialValues)
    } catch {
      setStatus('error')
    }
  }

  const inputClasses =
    'w-full rounded-xl border border-line bg-surface-soft px-4 py-2.5 text-sm text-ink transition placeholder:text-ink-300 hover:border-brand-blue/50 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-blue/15'

  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-br from-brand-blue-light via-white to-[#e6f6ee] py-20"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-blue/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl" aria-hidden="true" />
      <Container className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Tell Us About Your Business"
            description="Share a few details about your requirements and our team will get back to you to discuss the right solution."
            className="max-w-md"
          />
          <ul className="mt-8 flex flex-col gap-4">
            {[
              { icon: Clock, text: 'Quick response from our team' },
              { icon: ShieldCheck, text: 'Your details stay private' },
              { icon: Headset, text: 'Free demo & guided onboarding' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm font-medium text-ink-700">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-blue shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <motion.form
          noValidate
          onSubmit={handleSubmit}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-white bg-white/90 p-6 shadow-[0_30px_70px_-30px_rgba(42,99,204,0.45)] backdrop-blur sm:p-8"
        >
          <div className="-mx-6 -mt-6 mb-6 h-1.5 bg-linear-to-r from-brand-green via-brand-blue via-40% to-brand-yellow sm:-mx-8 sm:-mt-8" aria-hidden="true" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" error={errors.fullName} htmlFor="fullName">
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                className={inputClasses}
                value={values.fullName}
                onChange={(event) => updateField('fullName', event.target.value)}
                aria-invalid={Boolean(errors.fullName)}
              />
            </Field>

            <Field label="Business Email" error={errors.businessEmail} htmlFor="businessEmail">
              <input
                id="businessEmail"
                name="businessEmail"
                type="email"
                autoComplete="email"
                className={inputClasses}
                value={values.businessEmail}
                onChange={(event) => updateField('businessEmail', event.target.value)}
                aria-invalid={Boolean(errors.businessEmail)}
              />
            </Field>

            <Field label="Company Name" error={errors.companyName} htmlFor="companyName">
              <input
                id="companyName"
                name="companyName"
                type="text"
                autoComplete="organization"
                className={inputClasses}
                value={values.companyName}
                onChange={(event) => updateField('companyName', event.target.value)}
                aria-invalid={Boolean(errors.companyName)}
              />
            </Field>

            <Field label="Phone Number" error={errors.phoneNumber} htmlFor="phoneNumber">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                className={inputClasses}
                value={values.phoneNumber}
                onChange={(event) => updateField('phoneNumber', event.target.value)}
                aria-invalid={Boolean(errors.phoneNumber)}
              />
            </Field>

            <Field label="Industry" error={errors.industry} htmlFor="industry">
              <Select
                id="industry"
                name="industry"
                icon={Building2}
                placeholder="Select your industry"
                options={industryOptions}
                value={values.industry}
                onChange={(value) => {
                  updateField('industry', value)
                  if (value !== 'Custom') updateField('customReason', '')
                  setErrors((previous) => ({ ...previous, industry: undefined, customReason: undefined }))
                }}
                invalid={Boolean(errors.industry)}
              />
            </Field>

            <Field label="Solution of Interest" error={errors.solutionOfInterest} htmlFor="solutionOfInterest">
              <Select
                id="solutionOfInterest"
                name="solutionOfInterest"
                icon={Layers}
                placeholder="Select a solution"
                options={solutionOptions}
                value={values.solutionOfInterest}
                onChange={(value) => {
                  updateField('solutionOfInterest', value)
                  setErrors((previous) => ({ ...previous, solutionOfInterest: undefined }))
                }}
                invalid={Boolean(errors.solutionOfInterest)}
              />
            </Field>
            {values.industry === 'Custom' ? (
              <div className="sm:col-span-2">
                <Field label="Custom Reason" error={errors.customReason} htmlFor="customReason">
                  <textarea
                    id="customReason"
                    name="customReason"
                    rows={2}
                    placeholder="Describe your industry, partnership, or reason for contacting us."
                    className={inputClasses}
                    value={values.customReason}
                    onChange={(event) => updateField('customReason', event.target.value)}
                    aria-invalid={Boolean(errors.customReason)}
                    aria-describedby={errors.customReason ? 'customReason-error' : undefined}
                    required
                  />
                </Field>
              </div>
            ) : null}
          </div>

          <div className="mt-4">
            <Field label="Brief Description of Requirements" error={errors.requirements} htmlFor="requirements">
              <textarea
                id="requirements"
                name="requirements"
                rows={3}
                className={inputClasses}
                value={values.requirements}
                onChange={(event) => updateField('requirements', event.target.value)}
                aria-invalid={Boolean(errors.requirements)}
              />
            </Field>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 rounded border-line text-brand-blue focus:ring-brand-blue/30"
              checked={values.consent}
              onChange={(event) => updateField('consent', event.target.checked)}
              aria-invalid={Boolean(errors.consent)}
            />
            <label htmlFor="consent" className="text-xs leading-relaxed text-ink-500">
              I agree to be contacted about my enquiry and understand my information will be used in
              accordance with SnapBizz&rsquo;s privacy practices.
            </label>
          </div>
          {errors.consent ? <p className="mt-1.5 text-xs text-brand-red">{errors.consent}</p> : null}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-70"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send Enquiry <Send className="h-4 w-4" />
              </>
            )}
          </button>

          {status === 'success' ? (
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-green" role="status">
              <CheckCircle2 className="h-4 w-4" /> Thank you! Your enquiry has been recorded locally &mdash; our
              team will connect with you shortly once our enquiry handling is live.
            </p>
          ) : null}

          {status === 'error' ? (
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-red" role="alert">
              <AlertCircle className="h-4 w-4" /> Something went wrong. Please try again in a moment.
            </p>
          ) : null}
        </motion.form>
      </Container>
    </section>
  )
}

interface FieldProps {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}

function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label id={`${htmlFor}-label`} htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-wide text-ink-700">
        {label}
      </label>
      {children}
      {error ? <span id={`${htmlFor}-error`} className="text-xs text-brand-red">{error}</span> : null}
    </div>
  )
}
