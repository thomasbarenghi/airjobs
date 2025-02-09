import { Skeleton } from '@heroui/react'
import { JobChips } from '@/components'

const JobItemSkeleton = () => (
  <div className='flex w-full cursor-pointer flex-col items-center justify-between gap-5 rounded-[30px] border border-violet-100 px-5 py-5 lg:flex-row lg:px-10'>
    <div className='flex w-full gap-4 lg:w-[40%] xl:w-[50%] 2xl:w-[60%]'>
      <Skeleton className='aspect-square h-[50px] w-[50px] rounded-lg' />
      <div className='flex flex-col justify-center gap-1'>
        <Skeleton className='h-[15px] w-[120px] rounded-full' />
        <Skeleton className='h-[15px] w-[80px] rounded-full' />
      </div>
    </div>
    <div className='flex w-full flex-grow flex-col justify-between gap-4 md:flex-row lg:w-auto'>
      <JobChips isLoading />
      <div className='flex items-center justify-between gap-10 md:justify-end'>
        <Skeleton className='h-[15px] w-[100px] rounded-full' />
        <Skeleton className='h-[15px] w-[80px] rounded-full' />
      </div>
    </div>
  </div>
)

export default JobItemSkeleton
