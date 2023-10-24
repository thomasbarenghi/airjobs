import { serverUrl } from '@/utils/constants/env.const'
import axios, { type AxiosResponse } from 'axios'

interface Response {
  data: any
  error: boolean
  success: boolean
}

export const putRequest = async (
  url: string,
  data: any,
  withFiles: boolean,
  headers?: object
): Promise<Response> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${serverUrl}${url}`,
      data,
      {
        headers: {
          ...headers,
          'Content-Type': !withFiles
            ? 'application/json'
            : 'multipart/form-data'
        }
      }
    )

    return {
      data: response.data,
      error: false,
      success: true
    }
  } catch (error) {
    return {
      data: error,
      error: true,
      success: false
    }
  }
}

export const postRequest = async (
  url: string,
  data: object = {},
  withFiles: boolean,
  headers?: object
): Promise<Response> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${serverUrl}${url}`,
      data,
      {
        headers: {
          ...headers,
          'Content-Type': !withFiles
            ? 'application/json'
            : 'multipart/form-data'
        }
      }
    )

    return {
      data: response.data,
      error: false,
      success: true
    }
  } catch (error) {
    return {
      data: error,
      error: true,
      success: false
    }
  }
}

export const deleteRequest = async (
  url: string,
  headers: object = {}
): Promise<Response> => {
  try {
    const response = await fetch(`${serverUrl}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })

    return {
      data: await response.json(),
      error: !response.ok,
      success: response.ok
    }
  } catch (error) {
    console.log(error)
    return {
      data: error,
      error: true,
      success: false
    }
  }
}

export const getRequest = async (
  url: string,
  headers: object = {}
): Promise<Response> => {
  try {
    const response = await fetch(`${serverUrl}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })

    return {
      data: await response.json(),
      error: !response.ok,
      success: response.ok
    }
  } catch (error) {
    console.log(error)
    return {
      data: error,
      error: true,
      success: false
    }
  }
}
