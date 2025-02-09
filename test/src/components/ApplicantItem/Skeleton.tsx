import { Skeleton } from "@heroui/react"

const ApplicantItemSkeleton = () => (
  <div className='flex w-full cursor-pointer  flex-col gap-4 rounded-[30px] border  border-violet-100 px-5 py-5 lg:items-center lg:justify-between lg:px-10'>
    <div className='flex w-full flex-col gap-4 md:flex-row'>
      <div className='flex gap-4 lg:w-[40%] xl:w-[45%] 2xl:w-[50%] '>
        <Skeleton className='aspect-square  h-[50px] w-[50px] rounded-lg' />
        <div className='flex flex-col justify-center gap-1'>
          <Skeleton className='h-[15px] w-[150px] rounded-full' />
          <Skeleton className='h-[15px] w-[80px] rounded-full' />
        </div>
      </div>
      <div className='flex flex-grow items-center gap-5 md:justify-end'>
        <Skeleton className='hidden h-[15px] w-[80px] rounded-full lg:block' />
        <div className='flex flex-wrap gap-2'>
          <Skeleton className='h-[45px] w-[130px] rounded-full' />
          <Skeleton className='h-[45px] w-[130px] rounded-full' />
        </div>
      </div>
    </div>
    <Skeleton className='h-[15px] w-[80px] rounded-full lg:hidden' />
  </div>
)

export default ApplicantItemSkeleton
