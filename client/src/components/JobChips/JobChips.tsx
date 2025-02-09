'use client'
import { Chip } from '@heroui/react'
import JobChipsPlaceholder from './Placeholder'
import JobChipsSkeleton from './Skeleton'
import { IJob } from '@/types/job'

interface Props {
  job?: IJob
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
