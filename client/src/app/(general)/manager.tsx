import { auth } from '@/auth'
import { getRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import Routes from '@/utils/constants/routes.const'
import { redirect } from 'next/navigation'

const Manager = async () => {
  const session = await auth()
  const { data: loggedUser } = await getRequest(Endpoints.USER_BY_EMAIL(session?.user?.email ?? ''))

  const handleVisility = () => {
    if (loggedUser?.company === null && loggedUser?.role === 'company') {
      redirect(Routes.ONBOARDING_COMPANY)
    }
  }

  handleVisility()
  return null
}

export default Manager
