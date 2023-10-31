import { getServerSession } from 'next-auth'
import HeroSection from './_components/HeroSection'
import JobsSection from './_components/JobsSection'
import type { Metadata } from 'next'
import { authOptions } from '@/utils/authOptions'
import { getUser } from '@/services/user/getUser.service'

export const metadata: Metadata = {
  title: 'Account | Airjobs',
  themeColor: '#0F03C1'
}

const Account = async () => {
  const session = await getServerSession(authOptions)
  const { data: loggedUser, error } = await getUser(
    session?.user?.email as string
  )

  return (
    <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-20 '>
      <HeroSection loggedUser={loggedUser} isError={error} />
      <section className='flex flex-col gap-10 section-reduced'>
        <hr />
      </section>
      <JobsSection loggedUser={loggedUser} isError={error} />
    </article>
  )
}

export default Account
