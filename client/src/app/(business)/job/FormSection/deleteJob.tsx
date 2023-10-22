import { deleteRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import Routes from '@/utils/constants/routes.const'
import { toast } from 'sonner'

export const deleteJob = async (jobId: string, router: any) => {
  const { error } = await deleteRequest(Endpoints.EDIT_JOB(jobId))

  if (error) {
    toast.error("Couldn't delete job")
    throw Error()
  }

  toast.success('Job deleted successfully')
  router.push(Routes.ACCOUNT)
}
