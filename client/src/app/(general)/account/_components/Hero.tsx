import { Button, TextElement } from '@/components'
import type { UserInterface } from '@/interfaces/user.interface'
import Routes from '@/utils/constants/routes.const'
import Image from 'next/image'
import HeroPlaceholder from './HeroPlaceholder'
import { revalidatePath } from 'next/cache'

interface Props {
  loggedUser: UserInterface
  isError: boolean
}

const HeroSection = ({ loggedUser, isError }: Props) => {
  if (isError) {
    return <HeroPlaceholder isCompany={loggedUser?.role === 'company'} />
  }
  revalidatePath('/account')
  return (
    <section className='section-reduced flex flex-col gap-8'>
      <div className='flex w-full flex-col justify-between gap-5 md:flex-row '>
        <div className='flex flex-grow flex-col items-center gap-5 md:flex-row'>
          <Image
            width={85}
            height={85}
            src={loggedUser?.profileImage ?? '/image/placeholder.png'}
            alt="Profile's image"
            className='aspect-square rounded-full object-cover'
          />
          <div className='flex flex-col justify-center gap-1 '>
            <TextElement as='p' type='t3' className='text-center !font-semibold leading-[24px] md:text-start '>
              {loggedUser?.firstName} {loggedUser?.lastName}{' '}
              <span className='text-primary'>
                {loggedUser?.role === 'company' && `(${loggedUser?.company?.name})`}{' '}
              </span>
            </TextElement>
            <TextElement as='p' type='base' className='break-all text-center !font-light md:text-start'>
              {loggedUser?.email}
            </TextElement>
          </div>
        </div>
        <div className='flex  items-center justify-center gap-2'>
          <Button title='Edit Account' href={Routes.EDIT_ACCOUNT} />
          {loggedUser?.role === 'company' && <Button title='Add Job' variant='flat' href={Routes.ADD_JOB} />}
        </div>
      </div>
      {loggedUser?.role === 'company' && (
        <div className='flex flex-col gap-5'>
          <TextElement as='p' type='base' className='!font-light leading-[165%] text-gray-900'>
            {loggedUser?.company?.description}
          </TextElement>
          <div className='flex flex-col gap-1'>
            <TextElement as='p' type='base' className='!font-light text-gray-900'>
              Your company's website is: <b className='font-semibold'>{loggedUser?.company?.website}</b>
            </TextElement>
            <TextElement as='p' type='base' className='!font-light text-gray-900'>
              Your company's email is: <b className='break-all font-semibold'>{loggedUser?.company?.email}</b>
            </TextElement>
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroSection
