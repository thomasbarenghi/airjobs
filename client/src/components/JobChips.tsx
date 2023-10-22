'use client'
import type { JobInterface } from '@/interfaces/job.interface'
import { Chip } from '@nextui-org/react'

const Chips = ({ job }: { job: JobInterface }) => (
  <div className='flex gap-2'>
    <Chip className='bg-violet-200 text-secondary'>{job?.type}</Chip>
    <Chip className='bg-violet-200 text-secondary'>{job?.location}</Chip>
    <Chip className='bg-violet-200 text-secondary'> {job?.seniority}</Chip>
  </div>
)

export default Chips
