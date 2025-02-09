const HeroPlaceholder = ({ isCompany }: { isCompany: boolean }) => (
  <section className='section-reduced flex flex-col gap-8'>
    <div className='flex w-full flex-col justify-between gap-5 md:flex-row'>
      <div className='flex flex-grow flex-col items-center gap-5 md:flex-row'>
        <div className='aspect-square h-[80px] w-[80px] rounded-full bg-gray-100' />
        <div className='flex flex-col items-center justify-center gap-1 md:items-start'>
          <div className='h-[20px] w-[150px] rounded-full bg-gray-100' />
          <div className='h-[15px] w-[80px] rounded-full bg-gray-100' />
        </div>
      </div>
    </div>
    {isCompany && (
      <div className='flex flex-col gap-1'>
        <div className='h-[15px] w-[100%] rounded-full bg-gray-100' />
        <div className='h-[15px] w-[80%] rounded-full bg-gray-100' />
        <div className='h-[15px] w-[90%] rounded-full bg-gray-100' />
        <div className='h-[15px] w-[60%] rounded-full bg-gray-100' />
      </div>
    )}
  </section>
)

export default HeroPlaceholder
