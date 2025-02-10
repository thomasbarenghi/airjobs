import HeroSection from './_components/Hero'
import RelatedJobsSection from './_components/RelatedJobs'
import type { Metadata } from 'next'
import { getJob } from '@/services/job.service'
import { getUser } from '@/services/user.service'
import { getRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'Job | Airjobs'
}

const IndividualJob = async ({ params }: { params: Promise<{ jobId: string }> }) => {
  const session = await auth()
  const { data: job, error } = await getJob((await params).jobId)
  const { data: relatedJobs } = await getRequest(Endpoints.ALL_JOBS + `?country=${job?.country}`, {})
  const { data: loggedUser } = await getUser(session?.user?.email as string)
  return (
    <article className='mt-[100px] flex w-full flex-col items-center gap-10 pb-10 pt-4'>
      <HeroSection job={job} loggedUser={loggedUser} isError={error} />
      <section className='section-reduced'>
        <hr className='w-full' />
      </section>
      <RelatedJobsSection relatedJobs={relatedJobs} error={error} job={job} />
    </article>
  )
}

export default IndividualJob
