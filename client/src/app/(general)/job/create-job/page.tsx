import FormSection from '../_forms/FormSection'
import type { Metadata } from 'next'
import { getUser } from '@/services/user/getUser.service'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Create Job | Airjobs',
  themeColor: '#0F03C1'
}

const CreateJob = async () => {
  const session = await getServerSession(authOptions)
  const { data: loggedUser } = await getUser(session?.user?.email as string)

  return (
    <article className='mt-[100px] flex w-full flex-col items-center gap-10 pb-20 pt-4 '>
      <FormSection mode='create' loggedUser={loggedUser} />
    </article>
  )
}

export default CreateJob
