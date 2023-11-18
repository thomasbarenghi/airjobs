import { deleteRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import Routes from '@/utils/constants/routes.const'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { toast } from 'sonner'

export const deleteJob = async (jobId: string, router: AppRouterInstance) => {
  const { error } = await deleteRequest(Endpoints.EDIT_JOB(jobId))

  if (error) {
    toast.error("Couldn't delete job")
    console.error('Error deleteJob:', error)
    return
  }

  toast.success('Job deleted successfully')
  router.push(Routes.ACCOUNT)
}
