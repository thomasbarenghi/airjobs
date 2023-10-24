'use client'
import type { ApplicantsEnum, JobInterface } from '@/interfaces/job.interface'
import { ApplicantItem } from '@/components'
import type { KeyedMutator } from 'swr'
import Placeholder from './Placeholder'
import Skeleton from './Skeleton'

interface JobsFlexProps {
  applicants: ApplicantsEnum[]
  job: JobInterface | any
  mutate: KeyedMutator<JobInterface>
  isLoading: boolean
}

const ApplicantsFlex = ({ applicants, mutate, job, isLoading }: JobsFlexProps) => (
  <div className='flex flex-col w-full  gap-5'>
    {isLoading && <Skeleton />}
    {!isLoading && (applicants?.length < 1 || applicants === undefined) ? (
      <Placeholder />
    ) : (
      applicants?.map((applicant) => (
        <ApplicantItem
          key={applicant.user._id}
          applicant={applicant}
          mutate={mutate}
          job={job}
        />
      ))
    )}
  </div>
)

export default ApplicantsFlex
