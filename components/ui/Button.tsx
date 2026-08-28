import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'inverted'

type BaseProps = {
  variant?: ButtonVariant
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never
  }

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string
  }

type Props = ButtonAsButton | ButtonAsLink

export default function Button({
  variant = 'primary',
  className,
  href,
  children,
  ...props
}: Props) {
  // Figma `Botón 01`: 183 × 53, padding 10, corner radius 0, sentence case.
  const baseStyles =
    'inline-block cursor-pointer text-center rounded-none text-[15px] font-medium px-6 py-3.5 transition-colors'

  const variants = {
    primary: 'bg-btn text-white border border-btn hover:bg-transparent hover:text-btn',
    outline: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-bg',
    inverted: 'bg-bg text-ink border border-bg hover:bg-transparent hover:text-bg',
  }

  const classes = cn(baseStyles, variants[variant], className)

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
