import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export default function PageWrapper({ children, className, as: Tag = 'div' }: Props) {
  return <Tag className={cn('mx-auto max-w-site', className)}>{children}</Tag>
}
