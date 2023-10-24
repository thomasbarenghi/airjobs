import { TextElement } from '@/components'

interface AuthBaseProps {
  children: React.ReactNode
}

const Base = ({ children }: AuthBaseProps) => (
  <section className='flex flex-col items-center justify-center bg-violet-100'>
    <div className=' section-padding-x-1 z-10 grid min-h-screen w-full grid-cols-1 2xl:container lg:grid-cols-[auto_450px] lg:pr-0 2xl:pl-0'>
      <div className='hidden items-end justify-start lg:flex'>
        <TextElement
          type='t2'
          as='p'
          className=' py-10 !font-light text-primary'
        >
          Your dreamed <b className='font-semibold'>job</b> is waiting for you,{' '}
          <br /> search it now in <b className='font-semibold'>airjobs.</b>
        </TextElement>
      </div>
      <div className='lg:max-h-[100vh] rounded-[20px] lg:rounded-none overflow-hidden mb-[80px] mt-[95px] flex w-full flex-col items-center justify-center bg-white px-[40px] py-10 lg:mb-0  lg:mt-0 lg:w-auto  '>
        <div className='h-full w-full '>{children}</div>
      </div>
    </div>
  </section>
)

export default Base
