'use server'
import { revalidatePath } from 'next/cache'
import { putRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'

interface SubmitProps {
  id: string
  formData: any
}

const editAction = async (props: SubmitProps) => {
  await putRequest(Endpoints.EDIT_JOB(props.id), JSON.stringify(props.formData), false)
  revalidatePath('/(general)/job/[jobId]/page', 'page')
}

export default editAction
