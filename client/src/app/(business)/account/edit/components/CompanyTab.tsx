'use client'
import { Input, Button, Textarea } from '@/components'
import { type SubmitHandler, useForm } from 'react-hook-form'
import Endpoints from '@/utils/constants/endpoints.const'
import { putRequest } from '@/services/apiRequests.service'
import { toast } from 'sonner'
import type { UserInterface } from '@/interfaces/user.interface'

interface UserTabProps {
  loggedUser: UserInterface
}

const CompanyTab = ({ loggedUser }: UserTabProps) => {
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
        Endpoints.EDIT_COMPANY(loggedUser._id),
        data
      )
      if (error) {
        toast.error("Couldn't update your info")
        throw Error()
      }
      toast.success('Your info has been updated')
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
          type='text'
          name='name'
          label='Name'
          defaultValue={loggedUser.company.name}
          placeholder='Your company name'
          hookForm={{
            register,
            validations: {
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.name?.message?.toString()}
        />
        <Textarea
          name='description'
          defaultValue={loggedUser.company.description}
          rows={5}
          label='Company Description'
          placeholder='A brief description of the job'
          hookForm={{
            register,
            validations: {
              maxLength: {
                value: 500,
                message: 'This field cannot exceed 500 characters'
              },
              minLength: {
                value: 50,
                message: 'This field must be at least 50 characters'
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.description?.message?.toString()}
        />
        <Input
          type='text'
          name='website'
          label='Website'
          defaultValue={loggedUser.company.website}
          placeholder='Your website'
          hookForm={{
            register,
            validations: {
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.website?.message?.toString()}
        />
        <Input
          type='email'
          name='email'
          label='Email'
          defaultValue={loggedUser.company.email}
          placeholder='Your company email'
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

export default CompanyTab
