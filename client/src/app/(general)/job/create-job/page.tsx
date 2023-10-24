import FormSection from '../_forms/FormSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Job | Airjobs',
  themeColor: '#0F03C1'
}

const CreateJob = () => (
  <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-20 '>
    <FormSection mode='create' />
  </article>
)

export default CreateJob
