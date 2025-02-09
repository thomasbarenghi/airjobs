import Endpoints from '@/utils/constants/endpoints.const'
import { getRequest } from './apiRequests.service'

/**
 * Fetches a user by their identifier (email or userId).
 * @param identifier - The user identifier (either userId or email).
 * @returns The user data and any error encountered.
 */
export const getUser = async (identifier: string) =>
  await getRequest(Endpoints.USER_BY_EMAIL(identifier), {}, { cache: 'no-cache' })
