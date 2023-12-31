import HeroSection from './_components/Hero'
import RelatedJobsSection from './_components/RelatedJobs'
import type { Metadata } from 'next'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { getJob } from '@/services/job/getJob.service'
import { getUser } from '@/services/user/getUser.service'
import { getRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'

export const metadata: Metadata = {
  title: 'Job | Airjobs',
  themeColor: '#0F03C1'
}

const IndividualJob = async ({ params }: { params: { jobId: string } }) => {
  const session = await getServerSession(authOptions)
  const { data: job, error } = await getJob(params.jobId)
  const { data: relatedJobs } = await getRequest(Endpoints.ALL_JOBS + `?country=${job?.country}`, {})
  const { data: loggedUser } = await getUser(session?.user?.email as string)
  return (
    <article className='mt-[100px] flex w-full flex-col items-center gap-10 pb-10 pt-4 '>
      <HeroSection job={job} loggedUser={loggedUser} isError={error} />
      <section className='section-reduced'>
        <hr className='w-full' />
      </section>
      <RelatedJobsSection relatedJobs={relatedJobs} error={error} job={job} />
    </article>
  )
}

export default IndividualJob
