'use client'
import { Input, Button } from '@/components'
import { type SubmitHandler, useForm } from 'react-hook-form'
import Endpoints from '@/utils/constants/endpoints.const'
import { putRequest } from '@/services/apiRequests.service'
import { toast } from 'sonner'
import type { UserInterface } from '@/interfaces/user.interface'
import type { KeyedMutator } from 'swr'
import type { UserForm } from '@/interfaces/accountForm.interface'

interface UserTabProps {
  loggedUser: UserInterface
  mutate: KeyedMutator<string>
}

const UserTab = ({ loggedUser, mutate }: UserTabProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<UserForm>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<UserForm> = async (data) => {
    try {
      const formData: Record<string, string | File> = {
        ...data,
        birthday: new Date(data.birthday).toISOString(),
        profileImage: data.profileImage[0]
      }

      const form = new FormData()

      for (const key in formData) {
        form.append(key, formData[key])
      }

      const { error } = await putRequest(
        Endpoints.EDIT_USER(loggedUser._id),
        form,
        true
      )

      if (error) {
        toast.error("Couldn't update your info")
        throw new Error()
      }

      toast.success('Your info has been updated')
      mutate()
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
        <div className='w-full flex flex-col items-center gap-2'>
          <Input
            type='text'
            name='firstName'
            label='Firstname'
            placeholder='Your firstname'
            defaultValue={loggedUser.firstName}
            hookForm={{
              register,
              validations: {
                required: { value: true, message: 'This field is required' }
              }
            }}
            errorMessage={errors?.firstName?.message?.toString()}
          />
          <Input
            type='text'
            name='lastName'
            label='Lastname'
            defaultValue={loggedUser.lastName}
            placeholder='Your lastname'
            hookForm={{
              register,
              validations: {
                required: { value: true, message: 'This field is required' }
              }
            }}
            errorMessage={errors?.lastName?.message?.toString()}
          />
          <Input
            type='date'
            name='birthday'
            defaultValue={
              loggedUser?.birthday &&
              new Date(loggedUser.birthday)?.toISOString()?.substr(0, 10)
            }
            label='Birthday'
            placeholder='Your birthday'
            hookForm={{
              register,
              validations: {
                required: { value: true, message: 'This field is required' }
              }
            }}
            errorMessage={errors?.birthday?.message?.toString()}
          />
          <Input
            type='text'
            name='username'
            defaultValue={loggedUser.username}
            label='Username'
            placeholder='Your Username'
            hookForm={{
              register,
              validations: {
                required: { value: true, message: 'This field is required' }
              }
            }}
            errorMessage={errors?.username?.message?.toString()}
          />
          <Input
            type='email'
            name='email'
            label='Email'
            defaultValue={loggedUser.email}
            placeholder='Email'
            hookForm={{
              register,
              validations: {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Debe ser un email valido'
                },
                required: { value: true, message: 'Este campo es requerido' }
              }
            }}
            errorMessage={errors?.email?.message?.toString()}
          />
          <Input
            type='file'
            name='profileImage'
            label='Profile iamge'
            placeholder='Profile iamge'
            hookForm={{
              register,
              validations: {
                validate: (value: File[]) => {
                  console.log(value)
                  if (!value[0]) return true
                  if (!value[0]?.type?.includes('image')) {
                    return 'File type should be image'
                  }
                  if (value[0]?.size > 2097152) {
                    return 'File size should be less than 2MB'
                  }

                  return true
                },
                required: {
                  value: false,
                  message: 'This field is required'
                }
              }
            }}
            errorMessage={errors?.profileImage?.message?.toString()}
          />
        </div>
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

export default UserTab
