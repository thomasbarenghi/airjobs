import JobsSection from './_components/Jobs'
import HeroSection from './_components/Hero'
import type { Metadata } from 'next'
import { getUser } from '@/services/user/getUser.service'

export const metadata: Metadata = {
  title: 'Company | Airjobs',
  themeColor: '#0F03C1'
}

const Company = async ({ params }: { params: { userId: string } }) => {
  const { data: user, error } = await getUser(params.userId)

  return (
    <article className='mt-[100px] flex w-full flex-col items-center gap-10 pb-10 pt-4 '>
      <HeroSection user={user} isError={error} />
      <section className=' section-reduced flex flex-col gap-10'>
        <hr />
      </section>
      <JobsSection user={user} isError={error} />
    </article>
  )
}

export default Company
