import Motion from './_components/Motion'
import FormSection from './_components/FormSection'
import HeroSection from './_components/HeroSection'
import Manager from './manager'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Company Onboarding | Airjobs',
  themeColor: '#0F03C1'
}

const OnboardingCompany = () => (
  <Motion>
    <Manager />
    <article className='flex flex-col gap-5 items-center w-full mt-[100px] pt-4 pb-20 '>
      <HeroSection />
      <FormSection />
    </article>
  </Motion>
)

export default OnboardingCompany
