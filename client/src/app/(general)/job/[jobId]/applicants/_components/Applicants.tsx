'use client'
import { ApplicantsFlex } from '@/components'
import { IJob } from '@/types/job'
import Endpoints from '@/utils/constants/endpoints.const'
import useSWR from 'swr'

interface JobsSectionProps {
  job: IJob
}

const ApplicantsSection = ({ job }: JobsSectionProps) => {
  const { data, mutate } = useSWR(Endpoints.INDIVIDUAL_JOB(job._id), {
    fallbackData: job,
    revalidateIfStale: false
  })

  return (
    <section className='section-reduced flex flex-col gap-10'>
      <ApplicantsFlex applicants={data?.applicants} job={data} isLoading={false} mutate={mutate} />
    </section>
  )
}

export default ApplicantsSection
