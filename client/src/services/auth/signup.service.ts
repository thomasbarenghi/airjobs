import Endpoints from '@/utils/constants/endpoints.const'
import { postRequest } from '../apiRequests.service'

export const signupUser = async (values: any) => {
  const body = { ...values, birthday: values.birthday.toISOString() }

  const { data, error } = await postRequest(Endpoints.REGISTER, body, false)
  return { data, error }
}
