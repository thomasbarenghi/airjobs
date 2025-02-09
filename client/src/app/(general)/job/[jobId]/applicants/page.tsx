import { TextElement } from '@/components'
import ApplicantsSection from './_components/Applicants'
import type { Metadata } from 'next'
import { getJob } from '@/services/job.service'

export const metadata: Metadata = {
  title: 'Applicants | Airjobs',
  themeColor: '#0F03C1'
}

const Applicants = async ({ params }: { params: Promise<{ jobId: string }> }) => {
  const { data } = await getJob((await params).jobId)
  return (
    <article className='mt-[100px] flex w-full flex-col items-center gap-6 pb-10 pt-4'>
      <section className='section-reduced flex flex-col gap-2'>
        <TextElement as='h1' type='t2' className='!font-light'>
          View <b className='!font-semibold'>applicants</b>
        </TextElement>
      </section>
      <ApplicantsSection job={data} />
    </article>
  )
}

export default Applicants
