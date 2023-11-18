import { TextElement } from '@/components'
import Search from './Search'

const HeroSection = () => (
  <section className='section-padding-x-1 flex min-h-[300px] w-full items-end justify-center bg-indigo-50 pb-10 pt-[100px] '>
    <div className='flex flex-grow flex-col gap-5 2xl:container'>
      <TextElement as='h1' type='t1' className='!font-light'>
        Find <b className='font-semibold'>your dream job</b> here.
      </TextElement>
      <Search />
    </div>
  </section>
)

export default HeroSection
