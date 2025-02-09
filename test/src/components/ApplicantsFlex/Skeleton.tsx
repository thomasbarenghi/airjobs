import { ApplicantItemSkeleton } from '@/components'

const Skeleton = () => (
  <div className='flex w-full flex-col  gap-5'>
    <ApplicantItemSkeleton />
    <ApplicantItemSkeleton />
    <ApplicantItemSkeleton />
    <ApplicantItemSkeleton />
  </div>
)

export default Skeleton
