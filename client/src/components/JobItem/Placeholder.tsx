import { JobChips } from '@/components'

const JobItemPlaceholder = () => (
  <div className='flex flex-col lg:flex-row w-full py-5 gap-5 px-5 lg:px-10 justify-between items-center cursor-pointer rounded-[30px] border border-violet-100'>
    <div className='flex gap-4 w-full lg:w-[40%] xl:w-[50%] 2xl:w-[60%] '>
      <div className='aspect-square  h-[50px] w-[50px] rounded-lg bg-gray-100' />
      <div className='flex flex-col gap-1 justify-center '>
        <div className='h-[15px] w-[120px] rounded-full bg-gray-100' />
        <div className='h-[15px] w-[80px] rounded-full bg-gray-100' />
      </div>
    </div>
    <div className='flex flex-grow lg:w-auto flex-col gap-4 md:flex-row w-full  justify-between'>
      <JobChips isPlaceholder />
      <div className='flex gap-10 md:justify-end justify-between items-center'>
        <div className='h-[15px] w-[100px] rounded-full bg-gray-100' />
        <div className='h-[15px] w-[80px] rounded-full bg-gray-100' />
      </div>
    </div>
  </div>
)

export default JobItemPlaceholder
