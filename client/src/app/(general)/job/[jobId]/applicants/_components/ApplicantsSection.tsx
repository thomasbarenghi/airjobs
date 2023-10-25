'use client'
import { ApplicantsFlex } from '@/components'
import type { JobInterface } from '@/interfaces/job.interface'
import Endpoints from '@/utils/constants/endpoints.const'
import useSWR from 'swr'

interface JobsSectionProps {
  job: JobInterface
}

const ApplicantsSection = ({ job }: JobsSectionProps) => {
  const { data, mutate } = useSWR(Endpoints.INDIVIDUAL_JOB(job._id), {
    fallbackData: job, revalidateIfStale: false
  })

  return (
    <section className='flex flex-col gap-10 section-reduced'>
      <ApplicantsFlex
        applicants={data?.applicants}
        job={data}
        isLoading={false}
        mutate={mutate}
      />
    </section>
  )
}

export default ApplicantsSection
