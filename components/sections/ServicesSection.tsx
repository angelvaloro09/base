import Image from 'next/image'
import Link from 'next/link'

const PACKAGES = [
  {
    src: '/illustrations/01_auditoria.png',
    alt: 'Una mano señalando un informe con una gráfica',
    title: 'Auditoría',
    description: 'Un diagnóstico a fondo antes de comprometerte a un rediseño completo.',
  },
  {
    src: '/illustrations/02_sistema_visual.png',
    alt: 'Tres piezas de rompecabezas encajando entre sí',
    title: 'Identidad Visual',
    description: 'El sistema completo — el corazón de BASE aplicado a tu marca.',
  },
  {
    src: '/illustrations/03_implementacion.png',
    alt: 'Un enchufe a punto de conectarse a una toma de corriente',
    title: 'Implementación',
    description: 'Todo el Paquete 2, llevado a producción completa y sistematizada.',
  },
]

/**
 * Figma `Frame 5` (1920 × 1356). Measured on the 1:1 export: full-bleed `#F7A74F`; heading centred,
 * Merriweather bold 48px on a 62px line; three `#F7F5F0` cards 538 × 795 at x106 / x691 / x1275
 * with a 47px gutter, so the card inset and gutter below are the comp's own percentages. Inside a
 * card: illustration 354 wide starting 92 down, title cap-top at 527, description at 585, and the
 * `Ver más...` link pinned to the bottom-right 72 above the card edge.
 */
export default function ServicesSection() {
  return (
    <section id="servicios" className="w-full bg-accent py-20 lg:py-0 lg:pb-[7.92%] lg:pt-[6.25%]">
      <h2 className="page-inset text-center font-serif text-[24px] font-bold leading-[1.29] text-ink-text md:text-[26px] lg:text-[30px] xl:text-[34px] 2xl:text-[40px] 3xl:text-[48px]">
        <span className="md:block">Tres formas de construir</span>{' '}
        <span className="md:block">sobre una base sólida.</span>
      </h2>

      <ul className="page-inset mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-[8.96%] lg:gap-[2.45%] lg:px-[5.52%]">
        {PACKAGES.map((pkg) => (
          <li
            key={pkg.title}
            className="flex flex-col bg-bg px-[9%] pb-[13.4%] pt-[12.1%] lg:aspect-[538/795]"
          >
            <Image
              src={pkg.src}
              alt={pkg.alt}
              width={1899}
              height={1533}
              className="h-auto w-[91%] self-center object-contain"
            />
            <h3 className="mt-[9.7%] font-serif text-[20px] font-bold leading-none text-ink-text md:text-[22px] lg:text-[24px] xl:text-[27px] 2xl:text-[32px] 3xl:text-[40px]">
              {pkg.title}
            </h3>
            <p className="mt-[4%] text-[16px] leading-[1.17] text-ink-text md:text-[17px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[30px]">
              {pkg.description}
            </p>
            <Link
              href="#contacto"
              className="mt-auto self-end pt-8 text-[15px] text-ink-text underline underline-offset-4 transition-colors hover:text-btn lg:text-[16px] xl:text-[17px] 2xl:text-[20px] 3xl:text-[24px]"
            >
              Ver más...
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
