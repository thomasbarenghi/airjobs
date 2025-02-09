import { serverUrl } from '@/utils/constants/env.const'
import axios, { AxiosResponse, AxiosError } from 'axios'

interface Response {
  data: any
  error: boolean
  success: boolean
}

/**
 * Handles the error by providing a unified structure for all requests.
 * @param error - The error object to be handled.
 * @returns A response object containing error details.
 */
const handleError = (error: AxiosError | any): Response => {
  console.error('Request error:', error)
  if (axios.isAxiosError(error)) {
    // Handling axios errors to extract useful information
    return {
      data: error.response?.data || error.message,
      error: true,
      success: false
    }
  }

  // Fallback for non-Axios errors
  return {
    data: error,
    error: true,
    success: false
  }
}

/**
 * Handles the success response from the Axios request.
 * @param response - The Axios response object.
 * @returns A response object containing the data from the Axios response.
 */
const handleResponse = (response: AxiosResponse): Response => ({
  data: response.data,
  error: false,
  success: true
})

/**
 * Makes a PUT request with the specified URL, data, and headers.
 * @param url - The URL endpoint.
 * @param data - The data to send in the request.
 * @param withFiles - Whether the request includes files (multipart).
 * @param headers - Optional headers for the request.
 * @returns A promise resolving to the response object.
 */
export const putRequest = async (
  url: string,
  data: any,
  withFiles: boolean,
  headers: object = {}
): Promise<Response> => {
  try {
    const response = await axios.put(`${serverUrl}${url}`, data, {
      headers: {
        ...headers,
        'Content-Type': withFiles ? 'multipart/form-data' : 'application/json'
      }
    })
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

/**
 * Makes a POST request with the specified URL, data, and headers.
 * @param url - The URL endpoint.
 * @param data - The data to send in the request.
 * @param withFiles - Whether the request includes files (multipart).
 * @param headers - Optional headers for the request.
 * @returns A promise resolving to the response object.
 */
export const postRequest = async (
  url: string,
  data: object = {},
  withFiles: boolean,
  headers: object = {}
): Promise<Response> => {
  try {
    const response = await axios.post(`${serverUrl}${url}`, data, {
      headers: {
        ...headers,
        'Content-Type': withFiles ? 'multipart/form-data' : 'application/json'
      }
    })
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

/**
 * Makes a DELETE request with the specified URL and headers.
 * @param url - The URL endpoint.
 * @param headers - Optional headers for the request.
 * @returns A promise resolving to the response object.
 */
export const deleteRequest = async (url: string, headers: object = {}): Promise<Response> => {
  try {
    const response = await fetch(`${serverUrl}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })
    const data = await response.json()
    return {
      data,
      error: !response.ok,
      success: response.ok
    }
  } catch (error) {
    return handleError(error)
  }
}

/**
 * Makes a GET request with the specified URL and headers.
 * @param url - The URL endpoint.
 * @param headers - Optional headers for the request.
 * @param next - Optional configuration for revalidation, cache, or tags.
 * @returns A promise resolving to the response object.
 */
export const getRequest = async (
  url: string,
  headers: object = {},
  next?: {
    revalidate?: false | 0 | number
    tags?: string[]
    cache?: 'force-cache' | 'no-store' | 'no-cache'
  }
): Promise<Response> => {
  try {
    const response = await fetch(`${serverUrl}${url}`, {
      next: {
        revalidate: next?.revalidate,
        tags: next?.tags
      },
      cache: next?.cache,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })
    const responsejson = await response.json()
    return {
      data: responsejson,
      error: !response.ok,
      success: response.ok
    }
  } catch (error) {
    return handleError(error)
  }
}
