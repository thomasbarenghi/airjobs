'use client'
import { Button, Input, Textarea } from '@/components'
import Endpoints from '@/utils/constants/endpoints.const'
import { type SubmitHandler, useForm } from 'react-hook-form'
import useSWR from 'swr'

import { postRequest } from '@/services/apiRequests.service'
import Routes from '@/utils/constants/routes.const'
import { toast } from 'sonner'
import {
  companyDescriptionPattern,
  companyNamePattern,
  emailPattern,
  websitePattern
} from '@/utils/constants/pattern.const'
import { CompanyForm } from '@/types/forms'
import { IUser } from '@/types/user'

interface Props {
  user: IUser
}

const FormSection = ({ user }: Props) => {
  const { data: loggedUser, mutate } = useSWR(Endpoints.USER_BY_EMAIL(user?.email ?? ''), {
    fallbackData: user,
    revalidateIfStale: false
  })

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<CompanyForm>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<CompanyForm> = async (data) => {
    try {
      const formData = {
        ...data,
        logo: data.logo[0]
      }

      const { error } = await postRequest(Endpoints.ADD_COMPANY(loggedUser._id), formData, true)

      if (error) {
        console.error('Error FormSection:', error)
        toast.error('Could not create company')
        return
      }
      await mutate()
      toast.success('Company created successfully')
      setTimeout(() => {
        window.location.href = Routes.HOME
      }, 500)
    } catch (error) {
      console.error('Error FormSection catch:', error)
    }
  }

  return (
    <section className='section-reduced flex flex-col gap-5'>
      <form className='flex w-full flex-col items-center gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          name='name'
          label='Name'
          placeholder='Your company name'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: companyNamePattern.value,
                message: companyNamePattern.message
              },
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
              pattern: {
                value: companyDescriptionPattern.value,
                message: companyDescriptionPattern.message
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
              pattern: {
                value: websitePattern.value,
                message: websitePattern.message
              },
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
                value: emailPattern.value,
                message: emailPattern.message
              },
              required: { value: true, message: 'This field is required' }
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
        <Button title='Save' type='submit' isLoading={isSubmitting} fullWidth className='mt-4' />
      </form>
    </section>
  )
}

export default FormSection
