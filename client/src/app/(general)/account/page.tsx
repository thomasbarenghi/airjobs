import { getServerSession } from 'next-auth'
import HeroSection from './_components/Hero'
import JobsSection from './_components/Jobs'
import type { Metadata } from 'next'
import { authOptions } from '@/utils/authOptions'
import { getUser } from '@/services/user/getUser.service'

export const metadata: Metadata = {
  title: 'Account | Airjobs',
  themeColor: '#0F03C1'
}

const Account = async () => {
  const session = await getServerSession(authOptions)
  const { data: loggedUser, error } = await getUser(session?.user?.email as string)

  return (
    <article className='mt-[100px] flex w-full flex-col items-center gap-10 pb-20 pt-4 '>
      <HeroSection loggedUser={loggedUser} isError={error} />
      <section className='section-reduced flex flex-col gap-10'>
        <hr />
      </section>
      <JobsSection loggedUser={loggedUser} isError={error} />
    </article>
  )
}

export default Account
