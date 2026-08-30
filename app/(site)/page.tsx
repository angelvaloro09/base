import Hero from '@/components/sections/Hero'
import ProblemSection from '@/components/sections/ProblemSection'
import ChaosSection from '@/components/sections/ChaosSection'
import DarkBand from '@/components/sections/DarkBand'
import SolutionSection from '@/components/sections/SolutionSection'
import OrderSection from '@/components/sections/OrderSection'
import ServicesSection from '@/components/sections/ServicesSection'
import CaseStudiesSection from '@/components/sections/CaseStudiesSection'
import FadeInSection from '@/components/sections/FadeInSection'
import IntroLoader from '@/components/ui/IntroLoader'

export default function Page() {
  return (
    <>
      <IntroLoader />
      <Hero />
      <FadeInSection>
        <ProblemSection />
      </FadeInSection>
      <ChaosSection />
      <DarkBand />
      <FadeInSection>
        <SolutionSection />
      </FadeInSection>
      <OrderSection />
      <FadeInSection>
        <ServicesSection />
      </FadeInSection>
      <FadeInSection>
        <CaseStudiesSection />
      </FadeInSection>
    </>
  )
}
