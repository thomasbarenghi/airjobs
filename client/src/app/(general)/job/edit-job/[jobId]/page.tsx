import { getUser } from '@/services/user.service'
import FormSection from '../../_forms/FormSection'
import type { Metadata } from 'next'
import { getJob } from '@/services/job.service'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'Edit Job | Airjobs'
}

const EditJob = async ({ params }: { params: Promise<{ jobId: string }> }) => {
  const session = await auth()
  const { data: job } = await getJob((await params).jobId)
  const { data: loggedUser } = await getUser(session?.user?.email as string)

  return (
    <article className='mt-[100px] flex w-full flex-col items-center gap-10 pb-10 pt-4'>
      <FormSection mode='edit' job={job} loggedUser={loggedUser} />
    </article>
  )
}

export default EditJob
