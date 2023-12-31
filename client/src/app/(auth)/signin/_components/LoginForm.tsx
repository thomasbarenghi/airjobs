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
import { emailPattern, passwordPattern } from '@/utils/constants/pattern.const'

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
        console.error('Error signin:', res.error)
        return toast.error('Check your credentials, something went wrong')
      }

      router.push(Routes.HOME)
    } catch (error) {
      console.error('Error signin catch:', error)
    }
  }

  return (
    <form className='flex w-full flex-col items-center gap-2' onSubmit={handleSubmit(onSubmit)} ref={formRef}>
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
        type={visibility ? 'text' : 'password'}
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
