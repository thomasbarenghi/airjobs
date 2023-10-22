import { putRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import Routes from '@/utils/constants/routes.const'
import { toast } from 'sonner'

export const editJob = async (formData: any, router: any, jobId: string) => {
  const { error } = await putRequest(Endpoints.EDIT_JOB(jobId), formData)

  if (error) {
    toast.error("Couldn't edit job")
    throw Error()
  }

  toast.success('Job edited successfully')
  router.push(Routes.INDIVIDUAL_JOB(jobId))
}
