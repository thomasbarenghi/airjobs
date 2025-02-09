import { auth } from '@/auth'
import { getUser } from '@/services/user.service'
import Routes from '@/utils/constants/routes.const'
import { redirect } from 'next/navigation'

const Manager = async () => {
  const session = await auth()
  const { data: loggedUser } = await getUser(session?.user?.email as string)

  const handleVisility = () => {
    if (loggedUser?.company !== null && loggedUser?.role === 'company') {
      redirect(Routes.ACCOUNT)
    }
  }

  handleVisility()
  return null
}

export default Manager
