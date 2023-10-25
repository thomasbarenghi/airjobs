const HeroPlaceholder = ({ isCompany }: { isCompany: boolean }) => (
  <section className='flex flex-col gap-8 section-reduced'>
    <div className='w-full flex flex-col md:flex-row gap-5 justify-between '>
      <div className='flex flex-col md:flex-row items-center gap-5 flex-grow'>
        <div className='rounded-full w-[80px] h-[80px] aspect-square bg-gray-100' />
        <div className='flex flex-col justify-center items-center md:items-start gap-1'>
          <div className='rounded-full h-[20px] w-[150px] bg-gray-100' />
          <div className='rounded-full h-[15px] w-[80px] bg-gray-100' />
        </div>
      </div>
    </div>
    {isCompany && (
      <div className='flex flex-col gap-1'>
        <div className='rounded-full h-[15px] w-[100%] bg-gray-100' />
        <div className='rounded-full h-[15px] w-[80%] bg-gray-100' />
        <div className='rounded-full h-[15px] w-[90%] bg-gray-100' />
        <div className='rounded-full h-[15px] w-[60%] bg-gray-100' />
      </div>
    )}
  </section>
)

export default HeroPlaceholder
