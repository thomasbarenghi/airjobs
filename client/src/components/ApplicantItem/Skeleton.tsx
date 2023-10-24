import { Skeleton } from '@nextui-org/react'

const ApplicantItemSkeleton = () => (
  <div className='flex flex-col gap-4  w-full py-5 px-5 lg:px-10  lg:justify-between lg:items-center cursor-pointer rounded-[30px] border border-violet-100'>
    <div className='flex flex-col md:flex-row gap-4 w-full'>
      <div className='flex gap-4 lg:w-[40%] xl:w-[45%] 2xl:w-[50%] '>
        <Skeleton className='aspect-square  h-[50px] w-[50px] rounded-lg' />
        <div className='flex flex-col justify-center gap-1'>
          <Skeleton className='h-[15px] w-[150px] rounded-full' />
          <Skeleton className='h-[15px] w-[80px] rounded-full' />
        </div>
      </div>
      <div className='flex-grow flex gap-5 md:justify-end items-center'>
        <Skeleton className='h-[15px] w-[80px] rounded-full hidden lg:block' />
        <div className='flex flex-wrap gap-2'>
          <Skeleton className='w-[130px] h-[45px] rounded-full' />
          <Skeleton className='w-[130px] h-[45px] rounded-full' />
        </div>
      </div>
    </div>
    <Skeleton className='h-[15px] w-[80px] rounded-full lg:hidden' />
  </div>
)

export default ApplicantItemSkeleton
