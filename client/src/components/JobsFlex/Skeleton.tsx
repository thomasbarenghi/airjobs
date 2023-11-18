import { JobItemSkeleton } from '@/components'

const Skeleton = () => (
  <div className='flex w-full flex-col  gap-5'>
    <JobItemSkeleton />
    <JobItemSkeleton />
    <JobItemSkeleton />
    <JobItemSkeleton />
  </div>
)

export default Skeleton
