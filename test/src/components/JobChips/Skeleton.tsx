import { Skeleton } from "@heroui/react"

const JobChipsSkeleton = () => (
  <div className='flex gap-2'>
    <Skeleton className='h-[25px] w-[60px] rounded-full ' />
    <Skeleton className='h-[25px] w-[60px] rounded-full ' />
    <Skeleton className='h-[25px] w-[60px] rounded-full ' />
  </div>
)

export default JobChipsSkeleton
