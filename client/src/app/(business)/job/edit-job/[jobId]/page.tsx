import FormSection from '../../FormSection/FormSection'

const EditJob = ({ params }: { params: { jobId: string } }) => (
  <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
    <FormSection mode='edit' jobId={params.jobId} />
  </article>
)

export default EditJob
