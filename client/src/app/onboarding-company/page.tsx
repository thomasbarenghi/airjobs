import Motion from './_components/Motion'
import FormSection from './_components/FormSection'
import HeroSection from './_components/HeroSection'
import Manager from './manager'
import type { Metadata } from 'next'
import { getUser } from '@/services/user/getUser.service'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Company Onboarding | Airjobs',
  themeColor: '#0F03C1'
}

const OnboardingCompany = async () => {
  const session = await getServerSession(authOptions)
  const { data: loggedUser } = await getUser(session?.user?.email as string)

  return (
    <Motion>
      <Manager />
      <article className='mt-[100px] flex w-full flex-col items-center gap-5 pb-20 pt-4 '>
        <HeroSection />
        <FormSection user={loggedUser} />
      </article>
    </Motion>
  )
}

export default OnboardingCompany
