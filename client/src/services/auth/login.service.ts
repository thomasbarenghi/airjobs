import Endpoints from '@/utils/constants/endpoints.const'
import { postRequest } from '../apiRequests.service'

export const loginUser = async (email: string, password: string) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!email || !password) {
    return {
      login: undefined,
      error: { status: 400, message: 'no email or password were passed' }
    }
  }

  const res = await postRequest(Endpoints.LOGIN, {
    email,
    password
  })

  return {
    data: res.data,
    error: res.error
  }
}
