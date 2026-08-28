import Image from 'next/image'
import Button from '@/components/ui/Button'

/**
 * Figma `Solucióin` (1920 × 1292). Every number below was measured off the 1:1 export of that node,
 * not read from the layer panel — the panel's values are the unscaled text styles and the frame
 * renders them larger. Measured at 1920: h2 cap-height 39 → 50px, principle labels cap-height 28 →
 * 36px, body 34px, all filled #000. Label column right-aligns at x496, the rule sits at x549 (3 ×
 * 38), descriptions start at x700, rows repeat every 125px.
 */
const PRINCIPLES = [
  { label: 'CONSISTENCIA', text: 'la marca se ve como una sola cosa en cualquier canal.' },
  { label: 'ESCALABILIDAD', text: 'el sistema crece con el negocio, no se rompe con él.' },
  { label: 'AUTONOMÍA', text: 'el equipo aplica la marca sin depender de nosotros.' },
]

export default function SolutionSection() {
  return (
    <section className="w-full bg-bg py-20 3xl:pb-[70px] 3xl:pt-[98px]">
      <div className="page-inset mx-auto max-w-site">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[48%_52%] lg:gap-0 3xl:grid-cols-[52%_48%]">
          <Image
            src="/illustrations/order_01.png"
            alt="Las marcas decorativas de BASE ordenadas dentro de una retícula dibujada a mano"
            width={1618}
            height={1681}
            className="h-auto w-full max-w-[420px] object-contain lg:ml-[5.8%] lg:w-[78%] lg:max-w-none"
          />

          <div>
            <h2 className="max-w-[680px] font-serif text-[28px] font-bold uppercase leading-[1.21] text-ink-text md:text-[34px] lg:text-[36px] xl:text-[42px] 2xl:text-[44px] 3xl:text-[50px]">
              Y es por eso que existimos nosotros.
            </h2>
            <p className="mt-8 max-w-[620px] text-[17px] leading-[1.29] text-ink-text md:mt-10 md:text-[20px] lg:text-[22px] xl:text-[26px] 2xl:text-[28px] 3xl:mt-[80px] 3xl:text-[34px]">
              En BASE construimos el sistema que ordena esa marca antes de que crezca más: reglas
              claras, piezas que se sostienen entre sí, un criterio que cualquiera en el equipo
              puede seguir sin tener que preguntar.
            </p>
          </div>
        </div>

        <dl className="mt-16 flex flex-col gap-y-8 lg:gap-y-14 2xl:mt-[100px] 2xl:gap-y-[60px] 3xl:mt-[120px] 3xl:gap-y-[80px]">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.label}
              className="flex flex-col gap-2 md:grid md:grid-cols-[28%_12%_1fr] md:items-center md:gap-0 lg:grid-cols-[21.9%_12.4%_1fr]"
            >
              <dt className="font-serif text-[18px] font-bold uppercase leading-[1.1] text-ink-text md:text-right md:text-[20px] lg:text-[24px] xl:text-[26px] 2xl:text-[30px] 3xl:text-[36px]">
                {principle.label}
              </dt>
              {/* The vertical rule between label and description — a 3 × 38 mark in the comp. */}
              <div aria-hidden="true" role="presentation" className="hidden md:block md:pl-[26%]">
                <div className="h-6 w-[2px] bg-ink-text lg:h-7 xl:h-8 3xl:h-[38px] 3xl:w-[3px]" />
              </div>
              <dd className="text-[17px] leading-[1.2] text-ink-text md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[28px] 3xl:text-[34px]">
                {principle.text}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 flex justify-center 2xl:mt-[110px] 3xl:mt-[130px]">
          <Button
            variant="primary"
            href="#contacto"
            className="px-6 py-3.5 text-[15px] font-bold leading-none md:px-7 md:py-4 md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:px-8 2xl:text-[28px] 3xl:text-[34px]"
          >
            Empecemos con un diagnóstico de marca
          </Button>
        </div>
      </div>
    </section>
  )
}
