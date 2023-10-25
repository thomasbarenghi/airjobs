import { serverUrl } from '@/utils/constants/env.const'

export const fetcher = async (url: string) => {
  try {
    return await fetch(`${serverUrl}${url}`).then(async (res) => await res.json())
  } catch (error) {
    console.error('Fetcher Service: ', error)
  }
}
