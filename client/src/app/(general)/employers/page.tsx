import { TextElement, Button } from '@/components'
import Routes from '@/utils/constants/routes.const'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Employers | Airjobs',
  themeColor: '#0F03C1'
}

const Employers = () => (
  <article className='mt-[100px] flex w-full flex-col items-center gap-10 pb-20 pt-4 '>
    <section className='section-reduced flex flex-col items-start gap-2'>
      <TextElement as='h1' type='t2' className='!font-light'>
        This page is under construction and <b className='font-semibold'>will be available soon.</b>
      </TextElement>
      <TextElement as='p' type='base'>
        The objective of this page is provide a list of employers that are hiring.
      </TextElement>
      <Button title='Go home' href={Routes.HOME} className='!mt-2' />
    </section>
  </article>
)

export default Employers
