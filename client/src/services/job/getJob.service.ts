import Endpoints from '@/utils/constants/endpoints.const'
import { getRequest } from '../apiRequests.service'

export const getJob = async (jobId: string) => {
  const { data, error } = await getRequest(Endpoints.INDIVIDUAL_JOB(jobId))

  return { data, error }
}
