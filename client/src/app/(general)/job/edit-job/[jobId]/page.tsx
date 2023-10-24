import FormSection from '../../_forms/FormSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Job | Airjobs',
  themeColor: '#0F03C1'
}

const EditJob = ({ params }: { params: { jobId: string } }) => (
  <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
    <FormSection mode='edit' jobId={params.jobId} />
  </article>
)

export default EditJob
