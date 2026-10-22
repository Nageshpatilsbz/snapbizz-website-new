import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { industryOptions, solutionOptions } from '../../data/content'
import type { ContactFormValues } from '../../types'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const initialValues: ContactFormValues = {
  fullName: '',
  businessEmail: '',
  companyName: '',
  phoneNumber: '',
  industry: '',
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
    'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-300 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20'

  return (
    <section id="contact" className="bg-surface-soft py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          align="left"
          eyebrow="Contact"
          title="Tell Us About Your Business"
          description="Share a few details about your requirements and our team will get back to you to discuss the right solution."
          className="max-w-md"
        />

        <motion.form
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-9"
        >
          <div className="grid gap-5 sm:grid-cols-2">
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
              <select
                id="industry"
                name="industry"
                className={inputClasses}
                value={values.industry}
                onChange={(event) => updateField('industry', event.target.value)}
                aria-invalid={Boolean(errors.industry)}
              >
                <option value="">Select your industry</option>
                {industryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Solution of Interest" error={errors.solutionOfInterest} htmlFor="solutionOfInterest">
              <select
                id="solutionOfInterest"
                name="solutionOfInterest"
                className={inputClasses}
                value={values.solutionOfInterest}
                onChange={(event) => updateField('solutionOfInterest', event.target.value)}
                aria-invalid={Boolean(errors.solutionOfInterest)}
              >
                <option value="">Select a solution</option>
                {solutionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Brief Description of Requirements" error={errors.requirements} htmlFor="requirements">
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                className={inputClasses}
                value={values.requirements}
                onChange={(event) => updateField('requirements', event.target.value)}
                aria-invalid={Boolean(errors.requirements)}
              />
            </Field>
          </div>

          <div className="mt-5 flex items-start gap-3">
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
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-blue-dark disabled:opacity-70 sm:w-auto"
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
      <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-wide text-ink-700">
        {label}
      </label>
      {children}
      {error ? <span className="text-xs text-brand-red">{error}</span> : null}
    </div>
  )
}
