import JobsSection from './_components/JobsSection'
import HeroSection from './_components/HeroSection'

const Company = ({ params }: { params: { userId: string } }) => (
  <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
    <HeroSection userId={params.userId} />
    <section className='w-[85%] 2xl:container flex flex-col gap-10 section-padding-x-1'>
      <hr />
    </section>
    <JobsSection userId={params.userId} />
  </article>
)

export default Company
