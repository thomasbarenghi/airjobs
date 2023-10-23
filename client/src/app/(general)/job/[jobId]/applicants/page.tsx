import { TextElement } from '@/components'
import ApplicantsSection from './_components/ApplicantsSection'

const Applicants = ({ params }: { params: { jobId: string } }) => (
  <article className='flex flex-col gap-6 items-center w-full mt-[100px] pt-4 pb-10 '>
    <section className='w-[85%] 2xl:container flex flex-col gap-2 section-padding-x-1'>
      <TextElement as='h1' type='t2' className='!font-light'>
        View <b className='!font-semibold'>applicants</b>
      </TextElement>
    </section>
    <ApplicantsSection jobId={params.jobId} />
  </article>
)

export default Applicants
