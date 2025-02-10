import Motion from './_components/Motion'
import FormSection from './_components/FormSection'
import Manager from './manager'
import type { Metadata } from 'next'
import { getUser } from '@/services/user.service'
import { auth } from '@/auth'
import { TextElement } from '@/components'

export const metadata: Metadata = {
  title: 'Company Onboarding | Airjobs'
}

const OnboardingCompany = async () => {
  const session = await auth()
  const { data: loggedUser } = await getUser(session?.user?.email as string)

  return (
    <Motion>
      <Manager />
      <article className='mt-[100px] flex w-full flex-col items-center gap-5 pb-20 pt-4'>
        <section className='section-reduced flex flex-col gap-5'>
          <div className='flex flex-col gap-1'>
            <TextElement as='h1' type='t2' className='!font-light'>
              Hey, welcome to <b className='!font-semibold text-primary'>airjobs</b>, we're glad to have you here!
            </TextElement>
            <TextElement as='p' type='base' className='!font-light'>
              Let's complete your company profile
            </TextElement>
          </div>
        </section>
        <FormSection user={loggedUser} />
      </article>
    </Motion>
  )
}

export default OnboardingCompany
