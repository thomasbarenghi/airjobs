import { TextElement } from '@/components'
import TabsSection from './_components/Tabs'
import type { Metadata } from 'next'
import { getUser } from '@/services/user.service'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'Edit Account | Airjobs'
}

const EditAccount = async () => {
  const session = await auth()
  const { data: loggedUser } = await getUser(session?.user?.email as string)
  return (
    <article className='mt-[100px] flex w-full flex-col items-center gap-10 pb-10 pt-4'>
      <section className='section-reduced flex flex-col gap-2'>
        <TextElement as='h1' type='t2' className='!font-light'>
          Edit <b className='!font-semibold'>account</b>
        </TextElement>
        <TabsSection user={loggedUser} />
      </section>
    </article>
  )
}

export default EditAccount
