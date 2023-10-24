'use client'
import { Button, TextElement } from '@/components'
import type { UserInterface } from '@/interfaces/user.interface'
import Endpoints from '@/utils/constants/endpoints.const'
import Routes from '@/utils/constants/routes.const'
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
    <section className='flex flex-col gap-8 section-reduced'>
      <div className='w-full flex flex-col md:flex-row gap-5 justify-between '>
        <div className='flex flex-col md:flex-row items-center gap-5 flex-grow'>
          <Image
            width={85}
            height={85}
            src={loggedUser?.profileImage ?? '/image/placeholder.png'}
            alt="Profile's image"
            onError={(e) => {
              e.currentTarget.src = '/image/placeholder.png'
            }}
            className='object-cover rounded-full aspect-square'
          />
          <div className='flex flex-col gap-1 justify-center '>
            <TextElement
              as='p'
              type='t3'
              className='!font-semibold text-center leading-[24px] '
            >
              {loggedUser?.firstName} {loggedUser?.lastName}{' '}
              <span className='text-primary'>
                {loggedUser?.role === 'company' &&
                  `(${loggedUser?.company?.name})`}{' '}
              </span>
            </TextElement>
            <TextElement
              as='p'
              type='base'
              className='!font-light text-center md:text-start break-all'
            >
              {loggedUser?.email}
            </TextElement>
          </div>
        </div>
        <div className='flex  items-center justify-center gap-2'>
          <Button title='Edit Account' href={Routes.EDIT_ACCOUNT} />
          {loggedUser?.role === 'company' && (
            <Button title='Add Job' variant='flat' href={Routes.ADD_JOB} />
          )}
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
          <div className='flex flex-col gap-1'>
            <TextElement
              as='p'
              type='base'
              className='!font-light text-gray-900'
            >
              Your company's website is:{' '}
              <b className='font-semibold'>{loggedUser?.company?.website}</b>
            </TextElement>
            <TextElement
              as='p'
              type='base'
              className='!font-light text-gray-900'
            >
              Your company's email is:{' '}
              <b className='font-semibold break-all'>
                {loggedUser?.company?.email}
              </b>
            </TextElement>
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroSection