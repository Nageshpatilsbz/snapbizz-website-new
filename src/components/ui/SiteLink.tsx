import type { ComponentProps } from 'react'
import { siteHref } from '../../lib/urls'

export function SiteLink({ href = '', ...props }: ComponentProps<'a'>) {
  return <a {...props} href={siteHref(href)} />
}
