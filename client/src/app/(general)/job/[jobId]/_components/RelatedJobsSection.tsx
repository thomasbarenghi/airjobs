import { JobsFlex, TextElement } from '@/components'
import type { JobInterface } from '@/interfaces/job.interface'
import { getRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'

interface Props {
  job: JobInterface
  error: boolean
}

const RelatedJobsSection = async ({ job, error }: Props) => {
  const { data } = await getRequest(
    Endpoints.ALL_JOBS + `?country=${job?.country}`,
    {}
  )

  return (
    <section className='section-reduced flex flex-col gap-5'>
      {error ? (
        <div className='h-[20px] w-[150px] rounded-full bg-gray-100' />
      ) : (
        <TextElement as='h2' type='t3' className='!font-light'>
          Another <b className='!font-semibold'>jobs in {job?.country}</b>
        </TextElement>
      )}
      <div className='w-full'>
        <JobsFlex
          jobs={
           Array.isArray(data) ? data?.filter((item: JobInterface) => item._id !== job._id) : []
          }
          isLoading={false}
          isError={error}
        />
      </div>
    </section>
  )
}

export default RelatedJobsSection
