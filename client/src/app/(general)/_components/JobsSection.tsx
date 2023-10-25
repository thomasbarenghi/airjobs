import { JobsFlex } from '@/components'
import { getRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import { buildQueryString } from '@/utils/functions/buildQueryString.utils'
import { revalidateTag } from 'next/cache'

interface JobsSectionProps {
  searchParams: Record<string, string>
}

const JobsSection = async ({ searchParams: query }: JobsSectionProps) => {
  const { data, error } = await getRequest(
    Endpoints.ALL_JOBS + buildQueryString(query) ?? '',
    {},
    { tags: ['jobs-filtered'], cache: 'force-cache' }
  )
  revalidateTag('jobs-filtered')

  return (
    <section className='flex justify-center section-padding-x-1'>
      <div className='2xl:container w-full py-10'>
        <JobsFlex jobs={data ?? []} isLoading={false} isError={error} />
      </div>
    </section>
  )
}

export default JobsSection
