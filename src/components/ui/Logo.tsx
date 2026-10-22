import logoMark from '../../assets/logo-mark-transparent.png'

interface LogoProps {
  className?: string
  variant?: 'dark' | 'light'
}

export function Logo({ className = '', variant = 'dark' }: LogoProps) {
  if (variant === 'light') {
    return (
      <div className={`inline-flex items-center rounded-lg bg-white px-3 py-1.5 ${className}`}>
        <img src={logoMark} alt="SnapBizz" className="h-7 w-auto" />
      </div>
    )
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img src={logoMark} alt="SnapBizz" className="h-8 w-auto" />
    </div>
  )
}
