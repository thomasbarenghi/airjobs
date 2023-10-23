'use client'
import { ApplicantsFlex } from '@/components'
import type { JobInterface } from '@/interfaces/job.interface'
import Endpoints from '@/utils/constants/endpoints.const'
import useSWR from 'swr'

interface JobsSectionProps {
  jobId: string
}

const ApplicantsSection = ({ jobId }: JobsSectionProps) => {
  const { data: currentJob, mutate } = useSWR<JobInterface>(
    Endpoints.INDIVIDUAL_JOB(jobId)
  )

  return (
    <section className='w-[85%] 2xl:container flex flex-col gap-10 section-padding-x-1'>
      <ApplicantsFlex
        applicants={currentJob?.applicants ?? []}
        mutate={mutate}
        job={currentJob}
      />
    </section>
  )
}

export default ApplicantsSection
