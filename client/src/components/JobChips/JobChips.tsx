'use client'
import type { JobInterface } from '@/interfaces/job.interface'
import { Chip } from '@nextui-org/react'
import JobChipsPlaceholder from './Placeholder'
import JobChipsSkeleton from './Skeleton'

interface Props {
  job?: JobInterface
  isLoading?: boolean
  isPlaceholder?: boolean
}

const Chips = ({ job, isLoading = false, isPlaceholder = false }: Props) => (
  <>
    {isLoading && <JobChipsSkeleton />}
    {isPlaceholder && <JobChipsPlaceholder />}
    {!isLoading && !isPlaceholder && (
      <div className='flex flex-wrap gap-2 lg:flex-nowrap'>
        <Chip className='bg-violet-200 text-secondary'>{job?.type}</Chip>
        <Chip className='bg-violet-200 text-secondary'>{job?.location}</Chip>
        <Chip className='bg-violet-200 text-secondary'> {job?.seniority}</Chip>
      </div>
    )}
  </>
)

export default Chips
