import DecorativeMark from '@/components/ui/DecorativeMark'
import type { ParticleId } from '@/lib/particles'

type Mark = {
  id: ParticleId
  left: string
  top: string
  width: string
  drift?: 'a' | 'b' | 'c'
}

/**
 * Figma `banner_01` (1920 × 1079). Every mark below is the measured ink bounding box of the
 * corresponding node in the 1:1 export, converted to percentages of the frame — which is why the
 * section carries the frame's own aspect ratio. Twenty-three marks, deliberately irregular: this
 * is the "chaos" half of the pair that `OrderSection` answers, so the positions are transcribed
 * rather than generated.
 */
const MARKS: Mark[] = [
  // The big grain blob is clipped by the top-left corner in the comp, so it starts off-canvas.
  { id: '02', left: '-5.50%', top: '-9.00%', width: '20.00%', drift: 'a' },
  { id: '11', left: '28.33%', top: '5.19%', width: '10.00%', drift: 'b' },
  { id: '07', left: '52.92%', top: '5.19%', width: '5.62%', drift: 'c' },
  { id: '10', left: '81.25%', top: '15.94%', width: '3.54%' },
  { id: '04', left: '59.17%', top: '17.42%', width: '2.92%' },
  { id: '09', left: '24.58%', top: '19.65%', width: '4.17%' },
  { id: '05', left: '90.21%', top: '24.47%', width: '2.29%' },
  { id: '06', left: '62.71%', top: '27.80%', width: '8.75%', drift: 'a' },
  { id: '01', left: '76.88%', top: '29.66%', width: '10.42%', drift: 'c' },
  { id: '01', left: '31.46%', top: '36.33%', width: '3.54%' },
  { id: '10', left: '12.08%', top: '37.44%', width: '5.42%' },
  { id: '11', left: '82.08%', top: '47.08%', width: '16.88%', drift: 'b' },
  { id: '11', left: '4.17%', top: '53.75%', width: '8.33%', drift: 'c' },
  { id: '07', left: '63.12%', top: '56.35%', width: '6.04%' },
  { id: '09', left: '75.00%', top: '56.72%', width: '3.96%' },
  { id: '04', left: '16.04%', top: '58.94%', width: '1.88%' },
  { id: '08', left: '31.67%', top: '63.39%', width: '1.67%' },
  { id: '01', left: '53.75%', top: '65.62%', width: '6.04%', drift: 'a' },
  { id: '12', left: '85.83%', top: '68.58%', width: '13.96%', drift: 'b' },
  { id: '09', left: '15.21%', top: '72.66%', width: '8.96%' },
  { id: '04', left: '63.96%', top: '72.66%', width: '1.67%' },
  { id: '10', left: '44.38%', top: '77.11%', width: '4.58%' },
  { id: '06', left: '35.62%', top: '90.45%', width: '2.92%', drift: 'c' },
]

export default function ChaosSection() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-bg py-28 md:aspect-[1920/1079] md:py-0">
      {MARKS.map((mark, i) => (
        <DecorativeMark
          key={`${mark.id}-${i}`}
          id={mark.id}
          width={mark.width}
          top={mark.top}
          left={mark.left}
          tone="ink"
          driftVariant={mark.drift}
        />
      ))}
      {/* The comp breaks this line explicitly, so the two halves are blocks rather than a
          max-width that would re-wrap differently at every step of the type scale. */}
      <p className="page-inset relative z-10 text-center font-serif text-[24px] leading-[1.31] text-ink-text md:text-[30px] lg:text-[34px] xl:text-[38px] 2xl:text-[42px] 3xl:text-[48px]">
        <span className="md:block">Esto es lo que se siente</span>{' '}
        <span className="md:block">por dentro.</span>
      </p>
    </section>
  )
}
