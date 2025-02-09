import Endpoints from '@/utils/constants/endpoints.const'
import { getRequest } from './apiRequests.service'

/**
 * Fetches a job by its ID.
 * @param jobId - The ID of the job to fetch.
 * @returns The job data and any error encountered.
 */
export const getJob = async (jobId: string) => await getRequest(Endpoints.INDIVIDUAL_JOB(jobId))
