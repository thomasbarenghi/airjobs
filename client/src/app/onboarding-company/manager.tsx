import { getUser } from '@/services/user/getUser.service'
import { authOptions } from '@/utils/authOptions'
import Routes from '@/utils/constants/routes.const'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Manager = async () => {
  const session = await getServerSession(authOptions)
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
