import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
