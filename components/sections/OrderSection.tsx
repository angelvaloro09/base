import DecorativeMark from '@/components/ui/DecorativeMark'
import type { ParticleId } from '@/lib/particles'

/**
 * Figma `Frame 4` (1920 × 745). The same twelve marks as `ChaosSection`, on an even 5 / 2 / 5 grid
 * with the middle row opened so the statement sits inside it. Positions are the measured ink boxes
 * of the 1:1 export as percentages of the frame — the regularity is the point of the section, so
 * they are transcribed, not generated.
 */
const MARKS: { id: ParticleId; left: string; top: string; width: string }[] = [
  { id: '03', left: '9.58%', top: '15.03%', width: '4.17%' },
  { id: '04', left: '29.79%', top: '17.72%', width: '2.71%' },
  { id: '09', left: '48.33%', top: '16.64%', width: '3.75%' },
  { id: '06', left: '67.08%', top: '16.11%', width: '3.96%' },
  { id: '07', left: '86.25%', top: '15.57%', width: '4.38%' },
  { id: '01', left: '9.79%', top: '45.10%', width: '4.58%' },
  { id: '08', left: '87.50%', top: '46.71%', width: '2.08%' },
  { id: '02', left: '9.38%', top: '70.34%', width: '5.42%' },
  { id: '12', left: '29.17%', top: '73.56%', width: '3.54%' },
  { id: '05', left: '48.33%', top: '72.48%', width: '3.54%' },
  { id: '11', left: '66.67%', top: '71.95%', width: '5.83%' },
  { id: '10', left: '86.67%', top: '71.41%', width: '3.75%' },
]

export default function OrderSection() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-bg py-24 md:aspect-[1920/745] md:py-0">
      {MARKS.map((mark) => (
        <DecorativeMark
          key={`${mark.id}-${mark.top}`}
          id={mark.id}
          width={mark.width}
          top={mark.top}
          left={mark.left}
          tone="ink"
        />
      ))}
      <p className="page-inset relative z-10 text-center font-serif text-[24px] leading-[1.35] text-ink-text md:text-[30px] lg:text-[34px] xl:text-[38px] 2xl:text-[42px] 3xl:text-[48px]">
        <span className="md:block">No es sobre estética; es sobre</span>{' '}
        <span className="md:block">
          <strong className="font-bold">sistemas</strong>.
        </span>
      </p>
    </section>
  )
}
