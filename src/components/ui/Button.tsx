import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverted'

interface ButtonBaseProps {
  variant?: Variant
  children: ReactNode
  icon?: ReactNode
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary:
    'btn-shine group bg-linear-to-r from-brand-blue via-brand-blue-dark to-[#0a7a6a] text-white shadow-soft hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg hover:shadow-brand-blue/40 active:translate-y-0',
  secondary:
    'bg-white text-ink border border-line hover:border-brand-blue hover:text-brand-blue',
  ghost: 'text-ink-700 hover:text-brand-blue',
  inverted: 'border border-white/20 text-white hover:border-white',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none'

type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string
  target?: string
  rel?: string
  onClick?: () => void
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, icon, className = '' } = props
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if ('href' in props && props.href) {
    const { href, target, rel, onClick } = props
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        {children}
        {icon && <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1">{icon}</span>}
      </a>
    )
  }

  const { href: _href, variant: _variant, icon: _icon, className: _className, children: _children, ...buttonProps } =
    props as ButtonAsButtonProps
  return (
    <button className={classes} {...buttonProps}>
      {children}
      {icon}
    </button>
  )
}
