import { JobItemSkeleton } from '@/components'

const Skeleton = () => (
  <div className='flex flex-col w-full  gap-5'>
    <JobItemSkeleton />
    <JobItemSkeleton />
    <JobItemSkeleton />
    <JobItemSkeleton />
  </div>
)

export default Skeleton
