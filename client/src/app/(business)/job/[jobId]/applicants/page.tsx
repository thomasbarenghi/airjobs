import { TextElement } from '@/components'

const Applicants = ({ params }: { params: { jobId: string } }) => (
  <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
    <section className='w-[85%] 2xl:container flex flex-col gap-2 section-padding-x-1'>
      <TextElement as='h1' type='t2' className='!font-light'>
        View <b className='!font-semibold'>applicants</b>
      </TextElement>
    </section>
  </article>
)

export default Applicants
