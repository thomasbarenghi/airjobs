'use client'
import type { ApplicantsEnum, JobInterface } from '@/interfaces/job.interface'
import { ApplicantItem } from '@/components'
import type { KeyedMutator } from 'swr'

interface JobsFlexProps {
  applicants: ApplicantsEnum[]
  job: JobInterface | any
  mutate: KeyedMutator<JobInterface>
}

const JobsFlex = ({ applicants, mutate, job }: JobsFlexProps) => (
  <div className='flex flex-col w-full  gap-5'>
    {applicants?.map((applicant) => (
      <ApplicantItem
        key={applicant.user._id}
        applicant={applicant}
        mutate={mutate}
        job={job}
      />
    ))}
  </div>
)

export default JobsFlex
