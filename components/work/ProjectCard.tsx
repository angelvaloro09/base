import React from 'react'
import { cn } from '@/lib/utils'

export type Tone = 'ink' | 'accent' | 'cream'

type Props = {
  index: string
  title: string
  category: string
  tone: Tone
  className?: string
}

export default function ProjectCard({ index, title, category, tone, className }: Props) {
  // Styles for each tone
  const toneStyles = {
    ink: {
      bg: 'bg-[#EEE8DB]',
      block1: 'bg-ink',
      block2: 'bg-accent',
      block3: 'bg-[#C9C2B4]',
    },
    accent: {
      bg: 'bg-ink',
      block1: 'bg-accent',
      block2: 'bg-bg',
      block3: 'bg-[#3A352E]',
    },
    cream: {
      bg: 'bg-accent',
      block1: 'bg-ink',
      block2: 'bg-bg',
      block3: 'bg-[#B5672A]',
    },
  }[tone]

  return (
    <div className={cn('group flex cursor-pointer flex-col', className)}>
      {/* Thumbnail */}
      <div
        className={cn(
          'relative aspect-[4/3] w-full overflow-hidden transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-[1.02]',
          toneStyles.bg,
        )}
      >
        {/* Decorative Blocks Placeholder */}
        <div
          className={cn('absolute left-1/4 top-1/4 h-1/3 w-1/3 rounded-[2px]', toneStyles.block1)}
        />
        <div
          className={cn(
            'absolute right-1/4 top-1/3 aspect-square w-[15%] rounded-full',
            toneStyles.block2,
          )}
        />
        <div
          className={cn(
            'absolute bottom-1/4 left-1/3 h-[15%] w-1/2 rounded-[2px]',
            toneStyles.block3,
          )}
        />
      </div>

      {/* Meta */}
      <div className="mt-5 flex items-start justify-between border-t border-ink-15 pt-5">
        <div>
          <div className="text-[13px] font-semibold text-ink-55">{index}</div>
          <h3 className="mt-1 text-[22px] font-semibold text-ink transition-colors duration-300 group-hover:text-accent">
            {title}
          </h3>
        </div>
        <div className="max-w-[140px] pt-1 text-right text-[12px] uppercase tracking-[0.06em] text-ink-55">
          {category}
        </div>
      </div>
    </div>
  )
}
