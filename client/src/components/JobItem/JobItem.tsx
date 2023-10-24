import Image from 'next/image'
import type { JobInterface } from '@/interfaces/job.interface'
import Link from 'next/link'
import Routes from '@/utils/constants/routes.const'
import { formatTimeAgo } from '@/utils/functions/formatTimeAgo'
import { JobChips, TextElement } from '@/components'

interface JobItemProps {
  job: JobInterface
}

const JobItem = ({ job }: JobItemProps) => (
  <Link href={Routes.INDIVIDUAL_JOB(job?._id)}>
    <div className='flex flex-col lg:flex-row w-full py-5 gap-5 px-5 lg:px-10 justify-between items-center cursor-pointer rounded-[30px] border border-violet-100'>
      <div className='flex gap-4 w-full lg:w-[40%] xl:w-[50%] 2xl:w-[60%] '>
        <Image
          src={job?.owner?.company?.logo}
          alt={job?.owner?.company?.name}
          width={50}
          height={50}
          className='object-cover rounded-lg aspect-square'
        />
        <div className='flex flex-col justify-center '>
          <TextElement
            as='p'
            type='base'
            className='!font-semibold leading-[20px] '
          >
            {job.title}
          </TextElement>
          <TextElement
            as='p'
            type='small'
            className='!font-light !text-neutral-600'
          >
            {job?.owner?.company?.name}
          </TextElement>
        </div>
      </div>
      <div className='flex flex-grow lg:w-auto flex-col gap-4 md:flex-row w-full  justify-between'>
        <JobChips job={job} />
        <div className='flex gap-10 md:justify-end justify-between items-center'>
          <TextElement as='p' type='small' className='!font-semibold'>
            {job.country}
          </TextElement>
          <TextElement
            as='p'
            type='small'
            className='!font-light text-neutral-600'
          >
            {formatTimeAgo(job.createdAt)}
          </TextElement>
        </div>
      </div>
    </div>
  </Link>
)

export default JobItem
