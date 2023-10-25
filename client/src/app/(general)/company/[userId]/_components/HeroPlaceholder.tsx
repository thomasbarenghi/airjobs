const HeroPlaceholder = () => (
  <section className=' flex flex-col gap-10 section-reduced'>
    <div className='w-full flex justify-between '>
      <div className='flex items-center gap-5 flex-grow'>
        <div className='rounded-lg w-[80px] h-[80px] aspect-square bg-gray-100' />
        <div className='flex flex-col justify-center gap-1'>
          <div className='rounded-full h-[20px] w-[150px] bg-gray-100' />
          <div className='rounded-full h-[15px] w-[80px] bg-gray-100' />
        </div>
      </div>
    </div>
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <div className='rounded-full h-[15px] w-[100%] bg-gray-100' />
        <div className='rounded-full h-[15px] w-[80%] bg-gray-100' />
        <div className='rounded-full h-[15px] w-[90%] bg-gray-100' />
        <div className='rounded-full h-[15px] w-[60%] bg-gray-100' />
      </div>
      <div className='flex flex-col gap-1'>
        <div className='rounded-full h-[15px] w-[150px] bg-gray-100' />
        <div className='rounded-full h-[15px] w-[100px] bg-gray-100' />
        <div className='rounded-full h-[15px] w-[250px] bg-gray-100' />
        <div className='rounded-full h-[15px] w-[120px] bg-gray-100' />
      </div>
    </div>
  </section>
)

export default HeroPlaceholder
