/* eslint-disable @typescript-eslint/no-explicit-any */
type ApiResponse<T> = {
  data: T | null
  error: string | null
}

export const fetchData = async <T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`)
    }

    const data: T = await response.json()
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { data: null, error: (error as Error).message }
  }
}

export const postData = async <T>(
  endpoint: string,
  body: Record<string, any>,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      ...options
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`)
    }

    const data: T = await response.json()
    return { data, error: null }
  } catch (error) {
    console.error('Error posting data:', error)
    return { data: null, error: (error as Error).message }
  }
}
