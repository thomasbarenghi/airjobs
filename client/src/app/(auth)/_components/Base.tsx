import { TextElement } from '@/components'

interface AuthBaseProps {
  children: React.ReactNode
}

const Base = ({ children }: AuthBaseProps) => (
  <section className='flex flex-col items-center justify-center  '>
    <div className=' section-padding-x-1 z-10 grid min-h-screen w-full grid-cols-1 2xl:container lg:grid-cols-[auto_400px] lg:pr-0 2xl:pl-0'>
      <div className='hidden items-end justify-start lg:flex'>
        <TextElement type='t2' as='p' className=' py-10 !font-light text-primary'>
          Your dreamed <b className='font-semibold'>job</b> is waiting for you, <br />{' '}
          search it now in <b className='font-semibold'>airjobs.</b>
        </TextElement>
      </div>
      <div className='max-h-[100vh] overflow-hidden mb-[80px] mt-[80px] flex w-full flex-col items-center justify-center bg-white px-[40px] py-10 lg:mb-0  lg:mt-0 lg:w-auto  '>
        <div className='h-full w-full '>{children}</div>
      </div>
    </div>
    <div id='container' className=' absolute left-0 top-0 z-[0] h-screen w-screen overflow-hidden'>
      <div className='absolute left-0 top-0  h-screen w-screen bg-violet-100' />
    </div>
  </section>
)

export default Base
