'use client'
import { JobsFlex } from '@/components'
import Endpoints from '@/utils/constants/endpoints.const'
import { buildQueryString } from '@/utils/functions/buildQueryString.utils'
import useSWR from 'swr'

interface JobsSectionProps {
  query: Record<string, string>
}

const JobsSection = ({ query }: JobsSectionProps) => {
  const { data } = useSWR(Endpoints.ALL_JOBS + buildQueryString(query) ?? '')
  return (
    <section className='flex justify-center'>
      <div className='2xl:container w-full py-10 section-padding-x-1'>
        <JobsFlex jobs={data ?? []} />
      </div>
    </section>
  )
}

export default JobsSection
