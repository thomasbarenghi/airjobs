import { postRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import Routes from '@/utils/constants/routes.const'
import { toast } from 'sonner'

export const postJob = async (formData: any, router: any) => {
  const { error } = await postRequest(Endpoints.CREATE_JOB, formData)

  if (error) {
    toast.error("Couldn't create job")
    throw Error()
  }

  router.push(Routes.ACCOUNT)
  toast.success('Job created successfully')
}
