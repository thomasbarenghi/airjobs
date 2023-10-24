import { Skeleton } from '@nextui-org/react'

const HeroSkeleton = () => (
  <section className='xl:w-[85%] w-full 2xl:container flex flex-col gap-10 section-padding-x-1'>
    <div className='w-full flex justify-between '>
      <div className='flex items-center gap-5 flex-grow'>
        <Skeleton className='rounded-lg w-[80px] h-[80px] aspect-square ' />
        <div className='flex flex-col justify-center gap-1'>
          <Skeleton className='rounded-full h-[20px] w-[150px]' />
          <Skeleton className='rounded-full h-[15px] w-[80px]' />
        </div>
      </div>
    </div>
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <Skeleton className='rounded-full h-[15px] w-[100%]' />
        <Skeleton className='rounded-full h-[15px] w-[80%]' />
        <Skeleton className='rounded-full h-[15px] w-[90%]' />
        <Skeleton className='rounded-full h-[15px] w-[60%]' />
      </div>
      <div className='flex flex-col gap-1'>
        <Skeleton className='rounded-full h-[15px] w-[150px]' />
        <Skeleton className='rounded-full h-[15px] w-[100px]' />
        <Skeleton className='rounded-full h-[15px] w-[250px]' />
        <Skeleton className='rounded-full h-[15px] w-[120px]' />
      </div>
    </div>
  </section>
)

export default HeroSkeleton
