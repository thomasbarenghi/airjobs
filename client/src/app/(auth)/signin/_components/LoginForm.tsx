'use client'
import { Button, Input } from '@/components'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'
import Routes from '@/utils/constants/routes.const'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { emailPattern, passwordPattern } from '@/utils/constants/pattern.const'

export interface LoginFormValues {
  email: string
  password: string
}

const LoginForm = () => {
  const router = useRouter()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<LoginFormValues>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (!res || res?.error) {
      console.error(res?.error)
      return toast.error('Check your credentials, something went wrong')
    }

    router.push(Routes.HOME)
  }

  return (
    <form className='flex w-full flex-col items-center gap-4' onSubmit={handleSubmit(onSubmit)}>
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
        Login
      </Button>
    </form>
  )
}

export default LoginForm
