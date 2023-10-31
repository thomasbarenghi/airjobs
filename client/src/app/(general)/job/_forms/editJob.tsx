import { putRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import Routes from '@/utils/constants/routes.const'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { toast } from 'sonner'
import type { JobForm } from './jobForm.interface'

export const editJob = async (formData: JobForm, router: AppRouterInstance, jobId: string) => {
  const { error } = await putRequest(
    Endpoints.EDIT_JOB(jobId),
    JSON.stringify(formData),
    false
  )

  if (error) {
    toast.error("Couldn't edit job")
    console.error('Error editJob:', error)
    return
  }

  router.push(Routes.INDIVIDUAL_JOB(jobId))
  toast.success('Job edited successfully')
}
