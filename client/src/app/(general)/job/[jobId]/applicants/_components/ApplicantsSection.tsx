'use client'
import { ApplicantsFlex } from '@/components'
import type { JobInterface } from '@/interfaces/job.interface'
import Endpoints from '@/utils/constants/endpoints.const'
import useSWR from 'swr'

interface JobsSectionProps {
  jobId: string
}

const ApplicantsSection = ({ jobId }: JobsSectionProps) => {
  const { data: currentJob, mutate, isLoading } = useSWR<JobInterface>(
    Endpoints.INDIVIDUAL_JOB(jobId)
  )

  return (
    <section className='flex flex-col gap-10 section-reduced'>
      <ApplicantsFlex
        applicants={currentJob?.applicants ?? []}
        mutate={mutate}
        job={currentJob}
        isLoading={isLoading}
      />
    </section>
  )
}

export default ApplicantsSection
