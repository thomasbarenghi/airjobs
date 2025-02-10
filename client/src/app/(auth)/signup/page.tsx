import { TextElement } from '@/components'
import Link from 'next/link'
import Routes from '@/utils/constants/routes.const'
import RegisterForm from './_components/RegisterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | Airjobs'
}

const SignUp = () => (
  <div className='flex h-full w-full flex-col justify-between'>
    <div className='flex h-full flex-col justify-center gap-5'>
      <div>
        <TextElement type='t2' as='h1' className='text-center !font-light'>
          Welcome to <b className='font-semibold'>airjobs</b>
        </TextElement>
        <TextElement type='base' as='p' className='text-center'>
          Complete the form to create your account
        </TextElement>
      </div>
      <div className='overflow-y-auto'>
        <RegisterForm />
      </div>
      <p className='w-full pt-6 text-center font-light'>
        Already have an account?{' '}
        <Link href={Routes.SINGIN} className='font-medium text-primary'>
          Sign in
        </Link>
      </p>
    </div>
  </div>
)

export default SignUp
