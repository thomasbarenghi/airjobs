import JobsSection from './_components/Jobs'
import HeroSection from './_components/Hero'
import type { Metadata } from 'next'
import { getUser } from '@/services/user.service'

export const metadata: Metadata = {
  title: 'Company | Airjobs'
}

const Company = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { data: user, error } = await getUser((await params).userId)

  return (
    <article className='mt-[100px] flex w-full flex-col items-center gap-10 pb-10 pt-4'>
      <HeroSection user={user} isError={error} />
      <section className='section-reduced flex flex-col gap-10'>
        <hr />
      </section>
      <JobsSection user={user} isError={error} />
    </article>
  )
}

export default Company
