'use client'
import { TextElement } from '@/components'
import type { UserInterface } from '@/interfaces/user.interface'
import Endpoints from '@/utils/constants/endpoints.const'
import Image from 'next/image'
import useSWR from 'swr'

interface Props {
  userId: string
}

const HeroSection = ({ userId }: Props) => {
  const { data: currentCompany } = useSWR<UserInterface>(
    Endpoints.USER_BY_ID(userId ?? '')
  )

  return (
    <section className='flex flex-col gap-8 section-reduced'>
      <div className='w-full flex justify-between '>
        <div className='flex items-center gap-5 flex-grow'>
          <Image
            width={80}
            height={80}
            src={currentCompany?.company?.logo ?? '/image/placeholder.png'}
            alt="Logo's image"
            onError={(e) => {
              e.currentTarget.src = '/image/placeholder.png'
            }}
            className='object-cover rounded-lg aspect-square'
          />
          <div className='flex flex-col gap-1 justify-center '>
            <TextElement
              as='p'
              type='t3'
              className='!font-semibold leading-[24px] '
            >
              {currentCompany?.company?.name}
            </TextElement>
            <TextElement as='p' type='base' className='!font-light'>
              {currentCompany?.company?.email}
            </TextElement>
          </div>
        </div>
      </div>
      {currentCompany?.role === 'company' && (
        <div className='flex flex-col gap-5'>
          <TextElement
            as='p'
            type='base'
            className='!font-light leading-[165%] text-gray-900'
          >
            {currentCompany?.company?.description}
          </TextElement>
          <div className='flex flex-col gap-1'>
            <TextElement
              as='p'
              type='base'
              className='!font-light text-gray-900'
            >
              Company website:{' '}
              <b className='font-semibold'>{currentCompany?.company?.website}</b>
            </TextElement>
            <TextElement
              as='p'
              type='base'
              className='!font-light text-gray-900'
            >
              Company email:{' '}
              <b className='font-semibold'>{currentCompany?.company?.email}</b>
            </TextElement>
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroSection
