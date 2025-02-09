import { Header, TextElement } from '@/components'

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header layout='simple' />
    <main>
      <section className='flex flex-col items-center justify-center bg-violet-100'>
        <div className='section-padding-x-1 z-10 grid min-h-screen w-full grid-cols-1 2xl:container lg:grid-cols-[auto_450px] lg:pr-0 2xl:pl-0'>
          <div className='hidden items-end justify-start lg:flex'>
            <TextElement type='t2' as='p' className='py-10 !font-light text-primary'>
              Your dreamed <b className='font-semibold'>job</b> is waiting for you, <br /> search it now in{' '}
              <b className='font-semibold'>airjobs.</b>
            </TextElement>
          </div>
          <div className='mb-[80px] mt-[95px] flex w-full flex-col items-center justify-center overflow-hidden rounded-[20px] bg-white px-[40px] py-10 lg:mb-0 lg:mt-0 lg:max-h-[100vh] lg:w-auto lg:rounded-none'>
            <div className='h-full w-full'>{children}</div>
          </div>
        </div>
      </section>
    </main>
  </>
)

export default AuthLayout
