import { Input, Button } from '@/components'
import { type SubmitHandler, useForm } from 'react-hook-form'
import Endpoints from '@/utils/constants/endpoints.const'
import { putRequest } from '@/services/apiRequests.service'
import { toast } from 'sonner'
import type { UserInterface } from '@/interfaces/user.interface'
import type { SecurityForm } from '@/interfaces/forms.interface'
import { passwordPattern } from '@/utils/constants/pattern.const'

interface UserTabProps {
  loggedUser: UserInterface
}

const SecurityTab = ({ loggedUser }: UserTabProps) => {
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
    } catch (error) {
      console.error('Error SecurityTab catch:', error)
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <form className='flex w-full flex-col items-center gap-2' onSubmit={handleSubmit(onSubmit)}>
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
