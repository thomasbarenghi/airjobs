/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { Button, Input } from '@/components'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import type { LoginFormValues } from '../form.interface'
import Routes from '@/utils/constants/routes.const'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

const LoginForm = () => {
  const [visibility] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<LoginFormValues>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (res?.error) {
        console.error(res.error)
        return toast.error('Check your credentials, something went wrong')
      }

      router.push(Routes.HOME)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      className='w-full flex flex-col items-center gap-2'
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
    >
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

      <Input
        type={visibility ? 'text' : 'password'}
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
        Login
      </Button>
    </form>
  )
}

export default LoginForm
