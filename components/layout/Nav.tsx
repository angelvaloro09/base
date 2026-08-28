import Link from 'next/link'
import Wordmark from '@/components/ui/Wordmark'

/**
 * Figma `Inicio` is a two-panel split — white left, cream right — and the nav sits on top of it
 * with no bar, border or background of its own. The header therefore repeats the same split so the
 * two read as one surface; `SPLIT` is shared with `Hero` so the seam lines up. Measured on the 1:1
 * export: the seam is at x917 of 1920, the wordmark is 205 × 34 at x135/y59, and the links are
 * 22px Space Grotesk with their right edge at x1850. The export renders the left panel black; the
 * panel is white by design (confirmed 2026-08-27), which is also why the black lockup reads on it.
 */
export const SPLIT = '47.76%'

const links = [
  { name: 'Nuestra historia', href: '#nuestra-historia' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Casos de estudio', href: '#casos-de-estudio' },
  { name: 'Contacto', href: '#contacto' },
]

export default function Nav() {
  return (
    <header className="relative w-full bg-surface">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden bg-bg md:block"
        style={{ width: `calc(100% - ${SPLIT})` }}
      />
      <div className="page-inset relative mx-auto flex max-w-site flex-wrap items-center justify-between gap-6 py-6 md:h-[100px] md:py-0 xl:h-[120px] xl:pr-[70px] 2xl:h-[135px] 3xl:h-[151px]">
        <Link href="/" className="shrink-0">
          <Wordmark
            priority
            className="w-[120px] md:w-[140px] xl:w-[160px] 2xl:w-[180px] 3xl:w-[205px]"
          />
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="flex flex-wrap items-center gap-4 text-[14px] md:gap-8 md:text-[15px] lg:gap-10 lg:text-[16px] xl:gap-14 xl:text-[18px] 2xl:gap-[80px] 2xl:text-[19px] 3xl:gap-[100px] 3xl:text-[22px]">
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-ink transition-colors hover:text-accent">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
