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
    <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-20 '>
      <FormSection mode='create' loggedUser={loggedUser} />
    </article>
  )
}

export default CreateJob
