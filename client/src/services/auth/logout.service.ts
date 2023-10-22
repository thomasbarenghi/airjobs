import Endpoints from '@/utils/constants/endpoints.const'
import { getRequest } from '../apiRequests.service'

export const logoutUser = async (sessionId: string) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!sessionId) {
    return {
      logout: undefined,
      error: { status: 400, message: 'no sessionId was passed' }
    }
  }

  const { data, error } = await getRequest(Endpoints.LOGOUT, { sessionId })
  return { logout: data, error }
}
