import type { ApplicantsEnum, JobInterface } from '@/interfaces/job.interface'
import { ApplicantItem } from '@/components'
import Placeholder from './Placeholder'
import Skeleton from './Skeleton'
import type { KeyedMutator } from 'swr'

interface JobsFlexProps {
  applicants: ApplicantsEnum[]
  job: JobInterface
  isLoading: boolean
  mutate: KeyedMutator<any>
}

const ApplicantsFlex = ({ applicants, job, isLoading, mutate }: JobsFlexProps) => (
  <div className='flex flex-col w-full  gap-5'>
    {isLoading && <Skeleton />}
    {!isLoading && (applicants?.length < 1 || applicants === undefined) ? (
      <Placeholder />
    ) : (
      applicants?.map((applicant) => (
        <ApplicantItem
          key={applicant.user._id}
          applicant={applicant}
          job={job}
          mutate={mutate}
        />
      ))
    )}
  </div>
)

export default ApplicantsFlex
