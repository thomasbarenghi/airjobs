const ApplicantItemPlaceholder = () => (
  <div className='flex flex-col gap-4  w-full py-5 px-5 lg:px-10  lg:justify-between lg:items-center cursor-pointer rounded-[30px] border border-violet-100'>
    <div className='flex flex-col md:flex-row gap-4 w-full'>
      <div className='flex gap-4 lg:w-[40%] xl:w-[45%] 2xl:w-[50%] '>
        <div className='aspect-square  h-[50px] w-[50px] rounded-lg bg-gray-100' />
        <div className='flex flex-col justify-center gap-1'>
          <div className='h-[15px] w-[150px] rounded-full bg-gray-100' />
          <div className='h-[15px] w-[80px] rounded-full bg-gray-100' />
        </div>
      </div>
      <div className='flex-grow flex gap-5 md:justify-end items-center'>
        <div className='h-[15px] w-[80px] rounded-full hidden lg:block bg-gray-100' />
        <div className='flex flex-wrap gap-2'>
          <div className='w-[130px] h-[45px] rounded-full bg-gray-100' />
          <div className='w-[130px] h-[45px] rounded-full bg-gray-100' />
        </div>
      </div>
    </div>
    <div className='h-[15px] w-[80px] rounded-full lg:hidden bg-gray-100' />
  </div>
)

export default ApplicantItemPlaceholder
