'use client'
import { Button, Input, SimpleSelect } from '@/components'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { convertArrayToValueLabelArray } from '@/utils/functions/formatToSelect'
import { postRequest } from '@/services/apiRequests.service'
import { toast } from 'sonner'
import Routes from '@/utils/constants/routes.const'
import Endpoints from '@/utils/constants/endpoints.const'
import { validateAdult } from '@/utils/functions/validateAdult'
import {
  emailPattern,
  firstNamePattern,
  lastNamePattern,
  passwordPattern,
  usernamePattern
} from '@/utils/constants/pattern.const'
import { RoleEnum } from '@/types/user'
import { UserForm } from '@/types/forms'

export interface RegisterForm extends UserForm {
  password: string
  role: RoleEnum
}

const roleData = convertArrayToValueLabelArray(['company', 'aspirant'])

const LoginForm = () => {
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
    const formData = {
      ...data,
      birthday: new Date(data.birthday).toISOString()
    }

    const { error } = await postRequest(Endpoints.REGISTER, formData, false)

    if (error) {
      console.error(error)
      return toast.error("Couldn't create your account, try again later")
    }

    toast.success('Your account has been created')
    router.push(Routes.SINGIN)
  }

  return (
    <form className='flex h-auto w-full flex-col items-center gap-4' onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        name='firstName'
        label='Firstname'
        placeholder='Your firstname'
        hookForm={{
          register,
          validations: {
            pattern: {
              value: firstNamePattern.value,
              message: firstNamePattern.message
            },
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
            pattern: {
              value: lastNamePattern.value,
              message: lastNamePattern.message
            },
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
              value: usernamePattern.value,
              message: usernamePattern.message
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
              value: emailPattern.value,
              message: emailPattern.message
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
              value: passwordPattern.value,
              message: passwordPattern.message
            },
            required: { value: true, message: 'This field is required' }
          }
        }}
        errorMessage={errors?.password?.message?.toString()}
      />
      <Button type='submit' fullWidth isLoading={isSubmitting} spinnerPlacement='start' className='mt-2'>
        Register
      </Button>
    </form>
  )
}

export default LoginForm
