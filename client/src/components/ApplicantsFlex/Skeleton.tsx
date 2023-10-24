import { ApplicantItemSkeleton } from '@/components'

const Skeleton = () => (
  <div className='flex flex-col w-full  gap-5'>
    <ApplicantItemSkeleton />
    <ApplicantItemSkeleton />
    <ApplicantItemSkeleton />
    <ApplicantItemSkeleton />
  </div>
)

export default Skeleton
