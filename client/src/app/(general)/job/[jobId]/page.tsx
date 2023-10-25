import HeroSection from './_components/HeroSection'
import RelatedJobsSection from './_components/RelatedJobsSection'
import type { Metadata } from 'next'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { getJob } from '@/services/job/getJob.service'
import { getUser } from '@/services/user/getUser.service'

export const metadata: Metadata = {
  title: 'Job | Airjobs',
  themeColor: '#0F03C1'
}

const IndividualJob = async ({ params }: { params: { jobId: string } }) => {
  const session = await getServerSession(authOptions)
  const { data: job, error } = await getJob(params.jobId)
  const { data: loggedUser } = await getUser(session?.user?.email as string)

  return (
    <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
      <HeroSection job={job} loggedUser={loggedUser} isError={error} />
      <section className='section-reduced'>
        <hr className='w-full' />
      </section>
      <RelatedJobsSection job={job} error={error} />
    </article>
  )
}

export default IndividualJob
