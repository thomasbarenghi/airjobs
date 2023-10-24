'use client'
import { Button, Input, SimpleSelect } from '@/components'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import type { RegisterForm } from '../form.interface'
import type { RoleEnum } from '@/interfaces/user.interface'
import { convertArrayToValueLabelArray } from '@/utils/functions/formatToSelect'
import { postRequest } from '@/services/apiRequests.service'
import { toast } from 'sonner'
import Routes from '@/utils/constants/routes.const'
import Endpoints from '@/utils/constants/endpoints.const'
import { validateAdult } from '@/utils/functions/validateAdult'

const roleData = convertArrayToValueLabelArray(['company', 'aspirant'])

const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    control
  } = useForm<RegisterForm>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const formData = {
        ...data,
        birthday: new Date(data.birthday).toISOString()
      }

      const { error } = await postRequest(Endpoints.REGISTER, formData, false)
      if (error) {
        toast.error("Couldn't create your account, try again later")
        console.error(error)
        throw new Error()
      }

      toast.success('Your account has been created')
      console.log(data)
      router.push(Routes.SINGIN)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form
        className='w-full flex flex-col h-auto items-center gap-2  '
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        <Input
          type='text'
          name='firstName'
          label='Firstname'
          placeholder='Your firstname'
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
          label='Birthday'
          placeholder='Your birthday'
          hookForm={{
            register,
            validations: {
              validate: (value: string) => {
                const adult = validateAdult(new Date(value))
                if (!adult) return 'You must be an adult'
                return true
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.birthday?.message?.toString()}
        />
        <Input
          type='text'
          name='username'
          label='Username'
          placeholder='Your Username'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Must contain only letters and numbers'
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.username?.message?.toString()}
        />
        <Input
          type='email'
          name='email'
          label='Email'
          placeholder='Email'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Muat be a valid email'
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.email?.message?.toString()}
        />
        <Controller
          name='role'
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' }
          }}
          render={({ field }: any) => (
            <SimpleSelect
              name='role'
              field={field}
              label='Select your role'
              setSelected={(selected) => {
                setValue('role', selected as RoleEnum)
              }}
              names={roleData}
              placeholder='Select an option'
              errorMessage={errors?.role?.message?.toString()}
            />
          )}
        />
        <Input
          type='password'
          name='password'
          label='Password'
          placeholder='Password'
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
          errorMessage={errors?.password?.message?.toString()}
        />
        <Button
          type='submit'
          fullWidth
          isLoading={isSubmitting}
          spinnerPlacement='start'
          className='mt-2'
        >
          Register
        </Button>
      </form>
    </>
  )
}

export default LoginForm
