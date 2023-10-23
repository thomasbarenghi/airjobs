'use client'
import { Button, Input, Textarea } from '@/components'
import Endpoints from '@/utils/constants/endpoints.const'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'
import useSWR from 'swr'
import type { CompanyForm } from '@/interfaces/accountForm.interface'
import { postRequest } from '@/services/apiRequests.service'
import Routes from '@/utils/constants/routes.const'
import { toast } from 'sonner'

const FormSection = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { data: loggedUser, mutate } = useSWR(
    Endpoints.USER_BY_EMAIL(session?.user?.email ?? '')
  )

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<CompanyForm>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<CompanyForm> = async (data) => {
    try {
      console.log('data', data)
      const formData = {
        ...data,
        logo: data.logo[0]
      }

      const { error } = await postRequest(
        Endpoints.ADD_COMPANY(loggedUser._id),
        formData,
        false
      )

      if (error) {
        console.error(error)
        toast.error('Could not create company')
        return
      }
      await mutate()
      router.push(Routes.ACCOUNT)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className='w-[85%] 2xl:container flex flex-col gap-5 section-padding-x-1'>
      <form
        className='w-full flex flex-col items-center gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type='text'
          name='name'
          label='Name'
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
        <Input
          type='file'
          name='logo'
          label='Logo'
          placeholder='Logo'
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
          errorMessage={errors?.logo?.message?.toString()}
        />
        <Button
          title='Save'
          type='submit'
          isLoading={isSubmitting}
          fullWidth
          className='mt-4'
        />
      </form>
    </section>
  )
}

export default FormSection
