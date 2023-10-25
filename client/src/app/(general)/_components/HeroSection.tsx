import { TextElement } from '@/components'
import Search from './Search'

const HeroSection = () => (
  <section className='bg-indigo-50 min-h-[300px] flex items-end justify-center w-full section-padding-x-1 pt-[100px] pb-10 '>
    <div className='flex flex-col gap-5 flex-grow 2xl:container'>
      <TextElement as='h1' type='t1' className='!font-light'>
        Find <b className='font-semibold'>your dream job</b> here.
      </TextElement>
      <Search />
    </div>
  </section>
)

export default HeroSection
