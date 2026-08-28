import Image from 'next/image'
import Button from '@/components/ui/Button'
import { SPLIT } from '@/components/layout/Nav'

/**
 * Figma `Inicio` (1920 × 1076), minus the 151px the header already occupies. Measured on the 1:1
 * exports: white panel 0–917, cream panel to 1920; h1 Merriweather 600 · 65px on a 91px line,
 * breaking after "detrás" and after "en"; lead 20px Space Grotesk on a 26px line; the `Comencemos`
 * button is 183 × 53 at x135/y926 (`Botón 01` exactly); the brick illustration is 441 × 430 at
 * x1214/y292.
 *
 * The first export of this node came back with the panel filled black and the headline hidden —
 * both were artefacts of that export, not the design. See PLAN.md §11.
 */
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface md:aspect-[1920/925]">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden bg-bg md:block"
        style={{ width: `calc(100% - ${SPLIT})` }}
      />

      <div
        className="relative mx-auto grid h-full max-w-site grid-cols-1 md:grid-cols-[var(--split)_1fr]"
        style={{ '--split': SPLIT } as React.CSSProperties}
      >
        <div className="flex flex-col px-6 pb-20 pt-16 md:px-0 md:pb-[10.7%] md:pl-[14.72%] md:pt-[8.2%]">
          <h1 className="max-w-[671px] font-serif text-[32px] font-semibold leading-[1.4] text-ink-text md:text-[28px] lg:text-[40px] xl:text-[46px] 2xl:text-[56px] 3xl:text-[65px]">
            La base sólida detrás de marcas en crecimiento.
          </h1>
          <p className="mt-6 max-w-[520px] text-[15px] leading-[1.3] text-ink-text md:mt-[2.5%] md:text-[14px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] 3xl:text-[20px]">
            Diseñamos los sistemas visuales que sostienen una marca cuando empieza a crecer — no
            solo cuando se ve bien en una presentación.
          </p>

          <div className="mt-12 md:mt-auto">
            <Button
              variant="primary"
              href="#contacto"
              className="px-6 py-3.5 text-[15px] font-medium leading-none md:px-4 md:text-[17px] lg:text-[18px] xl:text-[20px] 2xl:text-[21px] 3xl:px-3.5 3xl:py-3.5 3xl:text-[24px]"
            >
              Comencemos
            </Button>
          </div>
        </div>

        <div className="flex items-start justify-center bg-bg py-16 md:justify-start md:bg-transparent md:py-0">
          {/* CSS float rather than Framer Motion: the illustration needs no interactivity, and a
              motion component here forced the whole hero client-side and hydrated mismatched. */}
          <Image
            src="/illustrations/base.png"
            alt="Unas manos colocando ladrillos, la imagen de construir una marca pieza a pieza"
            width={1899}
            height={1533}
            priority
            className="h-auto w-[70%] max-w-[320px] animate-float object-contain motion-reduce:animate-none md:ml-[17.9%] md:mt-[10.4%] md:w-[64.7%] md:max-w-none"
          />
        </div>
      </div>
    </section>
  )
}
