import { TextElement } from '@/components'
import type { UserInterface } from '@/interfaces/user.interface'
import Image from 'next/image'
import HeroPlaceholder from './HeroPlaceholder'

interface Props {
  user: UserInterface
  isError: boolean
}

const HeroSection = ({ user, isError }: Props) => {
  if (isError) {
    return <HeroPlaceholder />
  }

  return (
    <section className='section-reduced flex flex-col gap-8'>
      <div className='flex w-full justify-between '>
        <div className='flex flex-grow items-center gap-5'>
          <Image
            width={80}
            height={80}
            src={user?.company?.logo ?? '/image/placeholder.png'}
            alt="Logo's image"
            className='aspect-square rounded-lg object-cover'
          />
          <div className='flex flex-col justify-center gap-1 '>
            <TextElement as='p' type='t3' className='!font-semibold leading-[24px] '>
              {user?.company?.name}
            </TextElement>
            <TextElement as='p' type='base' className='!font-light'>
              {user?.company?.email}
            </TextElement>
          </div>
        </div>
      </div>
      {user?.role === 'company' && (
        <div className='flex flex-col gap-5'>
          <TextElement as='p' type='base' className='!font-light leading-[165%] text-gray-900'>
            {user?.company?.description}
          </TextElement>
          <div className='flex flex-col gap-1'>
            <TextElement as='p' type='base' className='!font-light text-gray-900'>
              Company website: <b className='font-semibold'>{user?.company?.website}</b>
            </TextElement>
            <TextElement as='p' type='base' className='!font-light text-gray-900'>
              Company email: <b className='font-semibold'>{user?.company?.email}</b>
            </TextElement>
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroSection
