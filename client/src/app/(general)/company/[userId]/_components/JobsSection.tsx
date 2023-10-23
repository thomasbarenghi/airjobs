'use client'
import { JobsFlex, TextElement } from '@/components'
import type { UserInterface } from '@/interfaces/user.interface'
import Endpoints from '@/utils/constants/endpoints.const'
import useSWR from 'swr'

interface JobsSectionProps {
  userId: string
}

const JobsSection = ({ userId }: JobsSectionProps) => {
  const { data: currentCompany } = useSWR<UserInterface>(
    Endpoints.USER_BY_ID(userId)
  )

  return (
    <section className='w-[85%] 2xl:container flex flex-col gap-10 section-padding-x-1'>
      <div className='flex flex-col gap-5 w-full'>
        <div>
          <TextElement as='h2' type='t3' className='!font-semibold'>
            {currentCompany?.company?.name} Jobs
          </TextElement>
          <TextElement as='p' type='base' className='!font-light'>
            You can apply to any of the jobs listed below.
          </TextElement>
        </div>
        <JobsFlex jobs={currentCompany?.jobs?.created ?? []} />
      </div>
    </section>
  )
}

export default JobsSection
