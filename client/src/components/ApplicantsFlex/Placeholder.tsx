import { ApplicantItemPlaceholder, TextElement } from '@/components'

const Placeholder = () => (
  <div className='flex flex-col w-full  gap-5'>
    <div className='flex min-h-[120px] w-full flex-col items-center justify-center gap-1 border-[2px] border-dashed border-slate-200 p-3 h-full lg:p-10'>
      <TextElement
        type='subtitle'
        as='h2'
        className='w-full text-center !font-semibold !text-base md:!text-lg'
      >
        There are no applicants here yet
      </TextElement>
      <TextElement
        type='base'
        as='p'
        className='text-center !text-sm md:!text-base'
      >
        Keep looking, there are many jobs waiting for you
      </TextElement>
    </div>
    <ApplicantItemPlaceholder />
    <ApplicantItemPlaceholder />
    <ApplicantItemPlaceholder />
  </div>
)

export default Placeholder
