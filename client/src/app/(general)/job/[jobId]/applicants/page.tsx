import { TextElement } from '@/components'
import ApplicantsSection from './_components/ApplicantsSection'
import type { Metadata } from 'next'
import { getJob } from '@/services/job/getJob.service'

export const metadata: Metadata = {
  title: 'Applicants | Airjobs',
  themeColor: '#0F03C1'
}

const Applicants = async ({ params }: { params: { jobId: string } }) => {
  const { data } = await getJob(params.jobId)
  return (
    <article className='flex flex-col gap-6 items-center w-full mt-[100px] pt-4 pb-10 '>
      <section className='flex flex-col gap-2 section-reduced'>
        <TextElement as='h1' type='t2' className='!font-light'>
          View <b className='!font-semibold'>applicants</b>
        </TextElement>
      </section>
      <ApplicantsSection job={data} />
    </article>
  )
}

export default Applicants
