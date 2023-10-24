import { TextElement, Button } from '@/components'
import Routes from '@/utils/constants/routes.const'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Airjobs',
  themeColor: '#0F03C1'
}

const About = () => (
  <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-20 '>
    <section className='flex flex-col items-start gap-2 section-reduced'>
      <TextElement as='h1' type='t2' className='!font-light'>
        This page is under construction and{' '}
        <b className='font-semibold'>will be available soon.</b>
      </TextElement>
      <TextElement as='p' type='base'>
        The objective of this page is provide information about the project
      </TextElement>
      <Button title='Go home' href={Routes.HOME} className='!mt-2' />
    </section>
  </article>
)

export default About
