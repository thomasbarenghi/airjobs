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
  const { data: loggedUser } = await getUser(
    session?.user?.email as string
  )

  return (
    <Motion>
      <Manager />
      <article className='flex flex-col gap-5 items-center w-full mt-[100px] pt-4 pb-20 '>
        <HeroSection />
        <FormSection user={loggedUser} />
      </article>
    </Motion>
  )
}

export default OnboardingCompany
