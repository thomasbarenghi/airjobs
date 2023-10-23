import { TextElement } from '@/components'
import Base from '../_components/Base'
import Link from 'next/link'
import Routes from '@/utils/constants/routes.const'
import LoginForm from './_components/LoginForm'

const SignIn = () => (
  <Base>
    <div className='flex h-full  flex-col justify-between'>
      <div className='flex h-full flex-col justify-center gap-5'>
        <div>
          <TextElement type='t2' as='h1' className='text-center'>
            Hey, welcome <b>back</b>
          </TextElement>
          <TextElement type='base' as='p' className='text-center'>
            Enter your credentials
          </TextElement>
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
      <p className='mt-6 w-full text-center font-light'>
        Don&apos;t have an account?{' '}
        <Link href={Routes.SINGUP} className='font-medium text-primary'>
          Sign up
        </Link>
      </p>
    </div>
  </Base>
)

export default SignIn
