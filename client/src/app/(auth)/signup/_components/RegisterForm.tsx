'use client'
import { Button, Input } from '@/components'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import type { RegisterForm } from '../form.interface'

const LoginForm = () => {
  const [visibility] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<RegisterForm>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      console.log(data)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
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
                message: 'Debe ser un email valido'
              },
              required: { value: true, message: 'Este campo es requerido' }
            }
          }}
          errorMessage={errors?.email?.message?.toString()}
        />

        <Input
          type={visibility ? 'text' : 'password'}
          name='password'
          label='Contraseña'
          placeholder='Contraseña'
          hookForm={{
            register,
            validations: {
              required: { value: true, message: 'Este campo es requerido' }
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
          Iniciar sesion
        </Button>
      </form>
    </>
  )
}

export default LoginForm
