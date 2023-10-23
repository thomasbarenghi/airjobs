import { serverUrl } from '@/utils/constants/env.const'
import axios from 'axios'

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
  console.log('putRequest', withFiles)
  const response = await axios.put(`${serverUrl}${url}`, data, {
    headers: {
      ...headers,
      'Content-Type': !withFiles ? 'application/json' : 'multipart/form-data'
    }
  })

  console.log('putRequest', response)
  return {
    data: response.data,
    error: response.status !== 200 && response.status !== 201,
    success: response.status === 200
  }
}

export const postRequest = async (
  url: string,
  data: object = {},
  withFiles: boolean,
  headers?: object
): Promise<Response> => {
  const response = await axios.post(`${serverUrl}${url}`, data, {
    headers: {
      ...headers,
      'Content-Type': !withFiles ? 'application/json' : 'multipart/form-data'
    }
  })

  return {
    data: response.data,
    error: response.status !== 200 && response.status !== 201,
    success: response.status === (200 || 201)
  }
}

export const deleteRequest = async (
  url: string,
  headers: object = {}
): Promise<Response> => {
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
}

export const getRequest = async (
  url: string,
  headers: object = {}
): Promise<Response> => {
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
}

export const patchRequest = async (
  url: string,
  data: object,
  headers: object = {}
): Promise<Response> => {
  const response = await fetch(`${serverUrl}${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(data)
  })

  return {
    data: await response.json(),
    error: !response.ok,
    success: response.ok
  }
}
