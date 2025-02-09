'use client'
import { JobsFlex, TextElement } from '@/components'
import type { IUser } from '@/interfaces/user.interface'

interface JobsSectionProps {
  user: IUser
  isError: boolean
}

const JobsSection = ({ user, isError }: JobsSectionProps) => (
  <section className='section-reduced flex flex-col gap-10'>
    <div className='flex w-full flex-col gap-5'>
      <div>
        {isError ? (
          <div className='flex flex-col gap-1'>
            <div className='h-[20px] w-[150px] rounded-full bg-gray-100' />
            <div className='h-[15px] w-[200px] rounded-full bg-gray-100' />
          </div>
        ) : (
          <>
            <TextElement as='h2' type='t3' className='!font-semibold'>
              {user?.company?.name} Jobs
            </TextElement>
            <TextElement as='p' type='base' className='!font-light'>
              You can apply to any of the jobs listed below.
            </TextElement>
          </>
        )}
      </div>
      <JobsFlex jobs={user?.jobs?.created ?? []} isLoading={false} isError={isError} />
    </div>
  </section>
)

export default JobsSection
