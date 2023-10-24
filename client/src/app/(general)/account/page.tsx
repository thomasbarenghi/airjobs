import HeroSection from './_components/HeroSection'
import JobsSection from './_components/JobsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account | Airjobs',
  themeColor: '#0F03C1'
}

const Account = ({ params }: { params: { jobId: string } }) => (
  <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-20 '>
    <HeroSection jobId={params.jobId} />
    <section className='flex flex-col gap-10 section-reduced'>
      <hr />
    </section>
    <JobsSection />
  </article>
)

export default Account
