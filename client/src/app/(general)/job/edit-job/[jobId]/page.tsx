import { getUser } from '@/services/user/getUser.service'
import FormSection from '../../_forms/FormSection'
import type { Metadata } from 'next'
import { getJob } from '@/services/job/getJob.service'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

export const metadata: Metadata = {
  title: 'Edit Job | Airjobs',
  themeColor: '#0F03C1'
}

const EditJob = async ({ params }: { params: { jobId: string } }) => {
  const session = await getServerSession(authOptions)
  const { data: job } = await getJob(params.jobId)
  const { data: loggedUser } = await getUser(session?.user?.email as string)

  return (
    <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
      <FormSection mode='edit' job={job} loggedUser={loggedUser} />
    </article>
  )
}

export default EditJob
