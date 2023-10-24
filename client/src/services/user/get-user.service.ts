import Endpoints from '@/utils/constants/endpoints.const'
import { getRequest } from '../apiRequests.service'

export const getUserByEmail = async (email: string) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!email) {
    return {
      user: undefined,
      error: { status: 400, message: 'no email was passed' }
    }
  }

  const { data, error } = await getRequest(Endpoints.USER_BY_EMAIL(email))
  return { user: data, error }
}
