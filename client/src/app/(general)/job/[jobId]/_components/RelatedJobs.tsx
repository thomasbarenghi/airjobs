import { JobsFlex, TextElement } from '@/components'
import type { JobInterface } from '@/interfaces/job.interface'

interface Props {
  job: JobInterface
  relatedJobs: JobInterface[]
  error: boolean
}

const RelatedJobsSection = ({ relatedJobs, error, job }: Props) => (
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
        jobs={Array?.isArray(relatedJobs) ? relatedJobs?.filter((item: JobInterface) => item._id !== job._id) : []}
        isLoading={false}
        isError={error}
      />
    </div>
  </section>
)

export default RelatedJobsSection
