import { TextElement } from '@/components'
import TabsSection from './_components/TabsSection'
import type { Metadata } from 'next'
import { getUser } from '@/services/user/getUser.service'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Edit Account | Airjobs',
  themeColor: '#0F03C1'
}

const EditAccount = async () => {
  const session = await getServerSession(authOptions)
  const { data: loggedUser } = await getUser(
    session?.user?.email as string
  )

  return (
    <article className='flex flex-col gap-10 items-center w-full mt-[100px] pt-4 pb-10 '>
      <section className='flex flex-col gap-2 section-reduced'>
        <TextElement as='h1' type='t2' className='!font-light'>
          Edit <b className='!font-semibold'>account</b>
        </TextElement>
        <TabsSection user={loggedUser} />
      </section>
    </article>
  )
}

export default EditAccount
