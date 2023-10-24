'use client'
import { Input, Button } from '@/components'
import { type SubmitHandler, useForm } from 'react-hook-form'
import Endpoints from '@/utils/constants/endpoints.const'
import { putRequest } from '@/services/apiRequests.service'
import { toast } from 'sonner'
import type { UserInterface } from '@/interfaces/user.interface'
import type { SecurityForm } from '@/interfaces/accountForm.interface'

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
      const { error } = await putRequest(
        Endpoints.EDIT_PASSWORD(loggedUser._id),
        data,
        false
      )

      if (error) {
        toast.error('Verify that your old password is correct')
        throw new Error('Old password verification failed')
      }

      toast.success('Your password has been updated')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <form
        className='w-full flex flex-col items-center gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type='password'
          name='oldPassword'
          label='Old Password'
          placeholder='Old Password'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  'Must contain at least 8 characters, one uppercase, one lowercase and one number'
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
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  'Must contain at least 8 characters, one uppercase, one lowercase and one number'
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.newPassword?.message?.toString()}
        />
        <Button
          title='Save'
          type='submit'
          isLoading={isSubmitting}
          fullWidth
          className='mt-4'
        />
      </form>
    </div>
  )
}

export default SecurityTab