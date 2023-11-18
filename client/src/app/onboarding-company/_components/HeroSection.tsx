import { TextElement } from '@/components'

const HeroSection = () => (
  <section className='section-reduced flex flex-col gap-5'>
    <div className='flex flex-col gap-1'>
      <TextElement as='h1' type='t2' className='!font-light'>
        Hey, welcome to <b className='!font-semibold text-primary'>airjobs</b>, we're glad to have you here!
      </TextElement>
      <TextElement as='p' type='base' className='!font-light'>
        Let's complete your company profile
      </TextElement>
    </div>
  </section>
)

export default HeroSection
