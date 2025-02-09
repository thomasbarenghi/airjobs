import { Input, Button } from '@/components'
import { type SubmitHandler, useForm } from 'react-hook-form'
import Endpoints from '@/utils/constants/endpoints.const'
import { putRequest } from '@/services/apiRequests.service'
import { toast } from 'sonner'
import { passwordPattern } from '@/utils/constants/pattern.const'
import { IUser } from '@/types/user'
import { SecurityForm } from '@/types/forms'
import { useRouter } from 'next/navigation'

interface UserTabProps {
  loggedUser: IUser
}

const SecurityTab = ({ loggedUser }: UserTabProps) => {
  const router = useRouter()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<SecurityForm>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<SecurityForm> = async (data) => {
    try {
      const { error } = await putRequest(Endpoints.EDIT_PASSWORD(loggedUser._id), data, false)

      if (error) {
        toast.error('Verify that your old password is correct')
        console.error('Error SecurityTab:', error)
        return
      }

      toast.success('Your password has been updated')
      router.push('/account')
    } catch (error) {
      console.error('Error SecurityTab catch:', error)
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <form className='flex w-full flex-col items-center gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='password'
          name='oldPassword'
          label='Old Password'
          placeholder='Old Password'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: passwordPattern.value,
                message: passwordPattern.message
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.oldPassword?.message?.toString()}
        />
        <Input
          type='password'
          name='newPassword'
          label='New Password'
          placeholder='New Password'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: passwordPattern.value,
                message: passwordPattern.message
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.newPassword?.message?.toString()}
        />
        <Button title='Save' type='submit' isLoading={isSubmitting} fullWidth className='mt-4' />
      </form>
    </div>
  )
}

export default SecurityTab
