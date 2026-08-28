import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * `public/brand/wordmark.png` is a derived asset, not a hand-drawn one. The source lockup
 * `assets/logo/Logo_final.jpg` is a 6000 × 6000 flat JPG — the mark sits on an opaque cream field
 * with ~84% empty margin, so rendering it directly either shrinks the mark to nothing or paints a
 * visible cream box on the white hero panel. The derived PNG is that file cropped to the measured
 * glyph box (x 900…5160, y 2580…3360) with alpha taken from inverted luminance, so it is pure
 * black on transparent and can be tinted for dark grounds. Regenerate with:
 *
 *   ffmpeg -y -i assets/logo/Logo_final.jpg -filter_complex \
 *     "[0:v]crop=4260:780:900:2580,split=2[c][m];[c]format=rgba,lutrgb=r=0:g=0:b=0[black];\
 *      [m]format=gray,negate[alpha];[black][alpha]alphamerge[out]" \
 *     -map "[out]" public/brand/wordmark.png
 */
const SRC_WIDTH = 4260
const SRC_HEIGHT = 780

type Props = {
  /** `ink` renders the mark in cream, for use on a dark ground. */
  tone?: 'light' | 'ink'
  priority?: boolean
  /** Sizing lives here so callers can step the width across breakpoints. */
  className?: string
}

export default function Wordmark({ tone = 'light', priority, className }: Props) {
  return (
    <Image
      src="/brand/wordmark.png"
      alt="BASE studio."
      width={SRC_WIDTH}
      height={SRC_HEIGHT}
      priority={priority}
      className={cn('h-auto w-[150px] object-contain', tone === 'ink' && 'invert', className)}
    />
  )
}
