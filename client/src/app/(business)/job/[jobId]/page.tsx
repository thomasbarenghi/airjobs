import HeroSection from './components/HeroSection'
import RelatedJobsSection from './components/RelatedJobsSection'

const IndividualJob = ({ params }: { params: { jobId: string } }) => (
  <>
    <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-8 pb-10 '>
      <HeroSection jobId={params.jobId} />
      <section className='w-[85%] 2xl:container flex flex-col gap-10 section-padding-x-1'>
        <hr />
      </section>
      <RelatedJobsSection jobId={params.jobId} />
    </article>
  </>
)

export default IndividualJob
