import HeroSection from './_components/HeroSection'
import JobsSection from './_components/JobsSection'

const Account = ({ params }: { params: { jobId: string } }) => (
  <>
    <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
      <HeroSection jobId={params.jobId} />
      <section className='w-[85%] 2xl:container flex flex-col gap-10 section-padding-x-1'>
        <hr />
      </section>
      <JobsSection />
    </article>
  </>
)

export default Account
