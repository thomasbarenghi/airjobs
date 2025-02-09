import { JobItemPlaceholder, TextElement } from '@/components'

const Placeholder = ({ isError }: { isError: boolean }) => (
  <div className='flex w-full flex-col gap-5'>
    {!isError && (
      <div className='flex h-full min-h-[120px] w-full flex-col items-center justify-center gap-1 border-[2px] border-dashed border-slate-200 p-3 lg:p-10'>
        <TextElement type='subtitle' as='h2' className='w-full text-center !text-base !font-semibold md:!text-lg'>
          There are no jobs here yet
        </TextElement>
        <TextElement type='base' as='p' className='text-center !text-sm md:!text-base'>
          Keep looking, there are many jobs waiting for you
        </TextElement>
      </div>
    )}
    <JobItemPlaceholder />
    <JobItemPlaceholder />
    <JobItemPlaceholder />
  </div>
)

export default Placeholder
