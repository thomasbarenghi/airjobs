import { TextElement } from '@/components'
import Base from '../_components/Base'
import Link from 'next/link'
import Routes from '@/utils/constants/routes.const'
import RegisterForm from './_components/RegisterForm'

const SignUp = () => (
  <Base>
    <div className='w-full flex  flex-col justify-between h-full'>
      <div className='flex flex-col justify-center gap-5 h-full'>
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
        <p className='pt-6 w-full text-center font-light flex-grow'>
          Already have an account?{' '}
          <Link href={Routes.SINGIN} className='font-medium text-primary'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </Base>
)

export default SignUp
