import { TextElement } from '@/components'
import TabsSection from './_components/TabsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Account | Airjobs',
  themeColor: '#0F03C1'
}

const EditAccount = () => (
  <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
    <section className='flex flex-col gap-2 section-reduced'>
      <TextElement as='h1' type='t2' className='!font-light'>
        Edit <b className='!font-semibold'>account</b>
      </TextElement>
      <TabsSection />
    </section>
  </article>
)

export default EditAccount
