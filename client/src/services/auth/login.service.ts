import Endpoints from '@/utils/constants/endpoints.const'
import { serverUrl } from '@/utils/constants/env.const'

export const loginUser = async (email: string, password: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!email || !password) {
      return {
        login: undefined,
        error: { status: 400, message: 'no email or password was passed' }
      }
    }

    const res = await fetch(serverUrl + Endpoints.LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json()
    console.error(data, email, password)
    return {
      data,
      error: data.error
    }
  } catch (error) {
    console.error('Error loginUser catch:', error)
    return {
      data: undefined,
      error: { status: 500, message: 'internal server error' }
    }
  }
}
