'use client'
import { Button, TextElement } from '@/components'
import type { UserInterface } from '@/interfaces/user.interface'
import Endpoints from '@/utils/constants/endpoints.const'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import useSWR from 'swr'

interface Props {
  jobId: string
}

const HeroSection = ({ jobId }: Props) => {
  const { data: session } = useSession()
  const { data: loggedUser } = useSWR<UserInterface>(
    Endpoints.USER_BY_EMAIL(session?.user?.email ?? '')
  )

  return (
    <section className='w-[85%] 2xl:container flex flex-col gap-10 section-padding-x-1'>
      <div className='w-full flex justify-between '>
        <div className='flex items-center gap-5 flex-grow'>
          <Image
            width={80}
            height={80}
            src={loggedUser?.profileImage ?? '/image/userPlaceholder.png'}
            alt="Profile's image"
            className='object-cover rounded-full aspect-square'
          />
          <div className='flex flex-col justify-center '>
            <TextElement
              as='p'
              type='t3'
              className='!font-semibold leading-[24px] '
            >
              {loggedUser?.firstName} {loggedUser?.lastName} {loggedUser?.role === 'company' && `(${loggedUser?.company?.name})`}
            </TextElement>
            <TextElement as='p' type='base' className='!font-light'>
              {loggedUser?.email}
            </TextElement>
          </div>
        </div>
        <div className='flex justify-between items-center gap-2'>
          <Button title='Edit Account' />
          {loggedUser?.role === 'company' && <Button title='Add Job' variant='flat' />}
        </div>
      </div>
      {loggedUser?.role === 'company' && (
        <div className='flex flex-col gap-5'>
          <TextElement
            as='p'
            type='base'
            className='!font-light leading-[165%] text-gray-900'
          >
            {loggedUser?.company?.description}
          </TextElement>
        </div>
      )}
    </section>
  )
}

export default HeroSection
