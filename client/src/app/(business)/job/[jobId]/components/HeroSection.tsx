'use client'
import { Button, JobChips, TextElement } from '@/components'
import Endpoints from '@/utils/constants/endpoints.const'
import Image from 'next/image'
import useSWR from 'swr'

interface Props {
  jobId: string
}

const HeroSection = ({ jobId }: Props) => {
  const { data, isLoading } = useSWR(Endpoints.INDIVIDUAL_JOB(jobId))
  if (isLoading) return <div>Loading...</div>

  return (
    <section className='w-[85%] 2xl:container flex flex-col gap-10 section-padding-x-1'>
      <div className='w-full flex justify-between '>
        <div className='flex items-center gap-5 flex-grow'>
          <Image
            width={80}
            height={80}
            src={data?.owner?.company?.logo}
            alt="Company's logo"
            className='object-cover rounded-lg aspect-square'
          />
          <div className='flex flex-col justify-center '>
            <TextElement
              as='p'
              type='t3'
              className='!font-semibold leading-[24px] '
            >
              {data.title}
            </TextElement>
            <TextElement
              as='p'
              type='base'
              className='!font-light !text-neutral-600'
            >
              {data?.owner?.company?.name}
            </TextElement>
          </div>
        </div>
        <div className='flex justify-between items-center gap-10'>
          <JobChips job={data} />
          <Button title='Apply Now' />
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <TextElement as='p' type='base' className='!font-light leading-[165%] text-gray-900'>
          {data.description}
        </TextElement>
        <TextElement as='p' type='base' className='!font-semibold text-gray-900'>
          Salary: {data.currency}{data.salary}
        </TextElement>
      </div>
    </section>
  )
}

export default HeroSection
