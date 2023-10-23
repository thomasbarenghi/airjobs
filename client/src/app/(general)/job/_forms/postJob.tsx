import { postRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import Routes from '@/utils/constants/routes.const'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { toast } from 'sonner'
import type { JobForm } from './jobForm.interface'

export const postJob = async (formData: JobForm, router: AppRouterInstance) => {
  const { error } = await postRequest(Endpoints.CREATE_JOB, formData, false)

  if (error) {
    toast.error("Couldn't create job")
    throw Error()
  }

  router.push(Routes.ACCOUNT)
  toast.success('Job created successfully')
}
