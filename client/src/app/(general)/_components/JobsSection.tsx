'use client'
import { JobsFlex } from '@/components'
import Endpoints from '@/utils/constants/endpoints.const'
import useSWR from 'swr'

const JobsSection = () => {
  const { data } = useSWR(Endpoints.ALL_JOBS)
  return (
    <section className='flex justify-center'>
      <div className='2xl:container w-full py-10 section-padding-x-1'>
        <JobsFlex jobs={data ?? []} />
      </div>
    </section>
  )
}

export default JobsSection
