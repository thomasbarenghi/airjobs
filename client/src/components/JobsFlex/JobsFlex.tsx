'use client'
import type { JobInterface } from '@/interfaces/job.interface'
import { JobItem } from '@/components'

interface JobsFlexProps {
  jobs: JobInterface[]
}

const JobsFlex = ({ jobs }: JobsFlexProps) => (
  <div className='flex flex-col w-full  gap-5'>
    {jobs?.map((job) => (
      <JobItem key={job._id} job={job} />
    ))}
  </div>
)

export default JobsFlex
