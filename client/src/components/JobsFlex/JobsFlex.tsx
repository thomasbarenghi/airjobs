import { JobItem } from '@/components'
import type { JobInterface } from '@/interfaces/job.interface'

interface JobsFlexProps {
  jobs: JobInterface[]
}

const JobsFlex = ({ jobs }: JobsFlexProps) => (
  <div className='flex w-full gap-5'>
    {jobs.map((job) => (
      <JobItem key={job._id} job={job} />
    ))}
  </div>
)

export default JobsFlex
