import Link from 'next/link'
import Wordmark from '@/components/ui/Wordmark'

const SITEMAP = [
  { name: 'Nuestra historia', href: '#nuestra-historia' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Casos de estudio', href: '#casos-de-estudio' },
  { name: 'Contacto', href: '#contacto' },
]

const SOCIAL = [
  { name: 'Instagram', href: 'https://instagram.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com' },
  { name: 'Behance', href: 'https://behance.net' },
]

export default function Footer() {
  return (
    <footer id="contacto" className="w-full bg-ink pb-10 pt-24 text-cream-ink md:pt-32">
      <div className="page-inset mx-auto max-w-site">
        <div className="grid grid-cols-1 gap-14 border-b border-cream-ink/15 pb-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16 md:pb-20">
          <div>
            <Wordmark tone="ink" className="w-[140px] md:w-[170px]" />
            <p className="mt-8 max-w-[380px] font-serif text-[20px] leading-[1.4] text-cream-ink md:text-[24px]">
              No es sobre estética; es sobre sistemas.
            </p>
          </div>

          <nav aria-label="Mapa del sitio">
            <h2 className="text-[13px] uppercase tracking-[0.1em] text-cream-ink/55">Sitio</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {SITEMAP.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-cream-ink transition-colors hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] uppercase tracking-[0.1em] text-cream-ink/55">Contacto</h2>
            <a
              href="mailto:hola@basestudio.com"
              className="mt-5 inline-block text-[15px] text-cream-ink transition-colors hover:text-accent"
            >
              hola@basestudio.com
            </a>

            <h2 className="mt-10 text-[13px] uppercase tracking-[0.1em] text-cream-ink/55">
              Síguenos
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {SOCIAL.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[15px] text-cream-ink transition-colors hover:text-accent"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-7 text-[13px] text-cream-ink/55 md:flex-row md:items-center">
          <p>© 2026 BASE Studio. Todos los derechos reservados.</p>
          <p>Diseño de marca y desarrollo web</p>
        </div>
      </div>
    </footer>
  )
}
