import { Skeleton } from '@heroui/react'

const HeroSkeleton = () => (
  <section className='section-reduced flex flex-col gap-10'>
    <div className='flex w-full justify-between'>
      <div className='flex flex-grow items-center gap-5'>
        <Skeleton className='aspect-square h-[80px] w-[80px] rounded-lg' />
        <div className='flex flex-col justify-center gap-1'>
          <Skeleton className='h-[20px] w-[150px] rounded-full' />
          <Skeleton className='h-[15px] w-[80px] rounded-full' />
        </div>
      </div>
    </div>
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <Skeleton className='h-[15px] w-[100%] rounded-full' />
        <Skeleton className='h-[15px] w-[80%] rounded-full' />
        <Skeleton className='h-[15px] w-[90%] rounded-full' />
        <Skeleton className='h-[15px] w-[60%] rounded-full' />
      </div>
      <div className='flex flex-col gap-1'>
        <Skeleton className='h-[15px] w-[150px] rounded-full' />
        <Skeleton className='h-[15px] w-[100px] rounded-full' />
        <Skeleton className='h-[15px] w-[250px] rounded-full' />
        <Skeleton className='h-[15px] w-[120px] rounded-full' />
      </div>
    </div>
  </section>
)

export default HeroSkeleton
