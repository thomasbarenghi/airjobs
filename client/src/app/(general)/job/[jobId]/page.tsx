import HeroSection from './_components/HeroSection'
import RelatedJobsSection from './_components/RelatedJobsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Job | Airjobs',
  themeColor: '#0F03C1'
}

const IndividualJob = ({ params }: { params: { jobId: string } }) => (
  <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
    <HeroSection jobId={params.jobId} />
    <section className='section-reduced'>
      <hr className='w-full' />
    </section>
    <RelatedJobsSection jobId={params.jobId} />
  </article>
)

export default IndividualJob
