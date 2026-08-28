import type { Metadata } from 'next'
import { Merriweather, Space_Grotesk } from 'next/font/google'
import '@/styles/globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-merriweather',
})

export const metadata: Metadata = {
  title: 'BASE Studio — Sistemas de marca y desarrollo web',
  description: 'Diseñamos los sistemas visuales que sostienen una marca cuando empieza a crecer.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} ${merriweather.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  )
}
