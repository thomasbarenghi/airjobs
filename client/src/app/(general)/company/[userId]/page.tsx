import JobsSection from './_components/JobsSection'
import HeroSection from './_components/HeroSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Company | Airjobs',
  themeColor: '#0F03C1'
}

const Company = ({ params }: { params: { userId: string } }) => (
  <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
    <HeroSection userId={params.userId} />
    <section className=' flex flex-col gap-10 section-reduced'>
      <hr />
    </section>
    <JobsSection userId={params.userId} />
  </article>
)

export default Company
