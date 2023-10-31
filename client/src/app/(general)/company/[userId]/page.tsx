import JobsSection from './_components/JobsSection'
import HeroSection from './_components/HeroSection'
import type { Metadata } from 'next'
import { getUser } from '@/services/user/getUser.service'

export const metadata: Metadata = {
  title: 'Company | Airjobs',
  themeColor: '#0F03C1'
}

const Company = async ({ params }: { params: { userId: string } }) => {
  const { data: user, error } = await getUser(params.userId)

  return (
    <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
      <HeroSection user={user} isError={error} />
      <section className=' flex flex-col gap-10 section-reduced'>
        <hr />
      </section>
      <JobsSection user={user} isError={error} />
    </article>
  )
}

export default Company
