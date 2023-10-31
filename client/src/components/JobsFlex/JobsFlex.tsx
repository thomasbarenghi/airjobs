import type { JobInterface } from '@/interfaces/job.interface'
import { JobItem } from '@/components'
import Placeholder from './Placeholder'
import Skeleton from './Skeleton'

interface JobsFlexProps {
  jobs: JobInterface[]
  isLoading: boolean
  isError: boolean
}

const JobsFlex = ({ jobs, isLoading, isError }: JobsFlexProps) => (
  <div className='flex flex-col w-full  gap-5'>
    {isLoading && <Skeleton />}
    {(!isLoading && (jobs?.length < 1 || jobs === undefined)) || isError ? (
      <Placeholder isError={isError} />
    ) : (
      Array.isArray(jobs) &&
      jobs?.map((job: JobInterface, index: number) => (
        <JobItem key={job._id} job={job} />
      ))
    )}
  </div>
)

export default JobsFlex
