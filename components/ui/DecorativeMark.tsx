import { cn } from '@/lib/utils'
import { PARTICLES, type ParticleId } from '@/lib/particles'

export type MarkTone = 'ink' | 'bg'

/**
 * Written out in full rather than interpolated: Tailwind scans source text literally, so a
 * template-built `animate-drift-${v}` class never reaches the generated CSS.
 */
const DRIFT_CLASS = {
  a: 'animate-drift-a',
  b: 'animate-drift-b',
  c: 'animate-drift-c',
} as const

type Props = {
  id: ParticleId
  /**
   * Rendered width as a CSS length. The scatter sections pass percentages of their own box, which
   * is why those sections carry a fixed `aspect-ratio` — it makes the comp's coordinates hold at
   * every viewport width instead of only at 1920.
   */
  width: string
  top: string
  left: string
  rotate?: number
  tone?: MarkTone
  driftVariant?: keyof typeof DRIFT_CLASS
  className?: string
}

/**
 * Renders a brand mark as a CSS mask rather than an `<img>` so the same asset can be recolored per
 * section — `ink` on the light chaos/order sections, `bg` if one is ever placed on an `--ink`
 * ground. Inline `style` is the documented exception here: mask URL, position and size are all
 * per-instance values that would otherwise mean an arbitrary Tailwind class per mark. Height comes
 * from `aspect-ratio` so the mark keeps its own proportions at any width — the marks are brand
 * assets and must never be stretched.
 */
export default function DecorativeMark({
  id,
  width,
  top,
  left,
  rotate = 0,
  tone = 'ink',
  driftVariant,
  className,
}: Props) {
  const { src, ratio } = PARTICLES[id]

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn(
        'absolute',
        tone === 'ink' ? 'bg-ink' : 'bg-bg',
        driftVariant && DRIFT_CLASS[driftVariant],
        className,
      )}
      style={
        {
          '--mark-src': `url(${src})`,
          width,
          aspectRatio: ratio,
          top,
          left,
          transform: rotate ? `rotate(${rotate}deg)` : undefined,
          maskImage: 'var(--mark-src)',
          WebkitMaskImage: 'var(--mark-src)',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        } as React.CSSProperties
      }
    />
  )
}
