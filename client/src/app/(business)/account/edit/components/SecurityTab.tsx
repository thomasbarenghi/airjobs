'use client'
import { Input, Button } from '@/components'
import { type SubmitHandler, useForm } from 'react-hook-form'
import Endpoints from '@/utils/constants/endpoints.const'
import { putRequest } from '@/services/apiRequests.service'
import { toast } from 'sonner'
import type { UserInterface } from '@/interfaces/user.interface'

interface UserTabProps {
  loggedUser: UserInterface
}

const SecurityTab = ({ loggedUser }: UserTabProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<any>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const { error } = await putRequest(
        Endpoints.EDIT_PASSWORD(loggedUser._id),
        data
      )
      if (error) {
        toast.error('Verify that your old password is correct')
        throw Error()
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
              required: { value: true, message: 'Este campo es requerido' }
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
              required: { value: true, message: 'Este campo es requerido' }
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
