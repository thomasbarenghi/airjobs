import FormSection from '../_forms/FormSection'
import type { Metadata } from 'next'
import { getUser } from '@/services/user.service'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'Create Job | Airjobs'
}

const CreateJob = async () => {
  const session = await auth()
  const { data: loggedUser } = await getUser(session?.user?.email as string)

  return (
    <article className='mt-[100px] flex w-full flex-col items-center gap-10 pb-20 pt-4'>
      <FormSection mode='create' loggedUser={loggedUser} />
    </article>
  )
}

export default CreateJob
