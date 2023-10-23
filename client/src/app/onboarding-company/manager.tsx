import { getRequest } from '@/services/apiRequests.service'
import { authOptions } from '@/utils/authOptions'
import Endpoints from '@/utils/constants/endpoints.const'
import Routes from '@/utils/constants/routes.const'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Manager = async () => {
  const session = await getServerSession(authOptions)
  const { data: loggedUser } = await getRequest(
    Endpoints.USER_BY_EMAIL(session?.user?.email)
  )

  const handleVisility = () => {
    if (loggedUser?.company !== null) {
      redirect(Routes.ACCOUNT)
    }
  }

  handleVisility()
  return null
}

export default Manager
