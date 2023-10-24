'use client'
import { JobsFlex, TextElement } from '@/components'
import type { JobInterface } from '@/interfaces/job.interface'
import Endpoints from '@/utils/constants/endpoints.const'
import useSWR from 'swr'

interface Props {
  jobId: string
}

const RelatedJobsSection = ({ jobId }: Props) => {
  const { data, isLoading } = useSWR(Endpoints.INDIVIDUAL_JOB(jobId))
  const { data: relatedJobs } = useSWR(
    Endpoints.ALL_JOBS + `?country=${data?.country}`
  )

  return (
    <section className='section-reduced flex flex-col gap-5'>
      <TextElement as='h2' type='t3' className='!font-light'>
        Another <b className='!font-semibold'>jobs in {data?.country}</b>
      </TextElement>
      <div className='w-full'>
        <JobsFlex
          jobs={
            relatedJobs?.filter((job: JobInterface) => job._id !== jobId) ?? []
          }
          isLoading={isLoading}
        />
      </div>
    </section>
  )
}

export default RelatedJobsSection
