import Image from 'next/image'
import Link from 'next/link'
import Routes from '@/utils/constants/routes.const'
import { formatTimeAgo } from '@/utils/functions/formatTimeAgo'
import { JobChips, TextElement } from '@/components'
import { IJob } from '@/types/job'

interface JobItemProps {
  job: IJob
}

const JobItem = ({ job }: JobItemProps) => (
  <Link href={Routes.INDIVIDUAL_JOB(job?._id)}>
    <div className='flex w-full cursor-pointer flex-col items-center justify-between gap-5 rounded-[30px] border border-violet-100 px-5 py-5 lg:flex-row lg:px-10'>
      <div className='flex w-full gap-4 lg:w-[40%] xl:w-[50%] 2xl:w-[60%]'>
        <Image
          src={job?.owner?.company?.logo}
          alt={job?.owner?.company?.name}
          width={50}
          height={50}
          className='aspect-square h-[50px] w-[50px] rounded-lg object-cover'
        />
        <div className='flex flex-col justify-center'>
          <TextElement as='p' type='base' className='!font-semibold leading-[20px]'>
            {job.title}
          </TextElement>
          <TextElement as='p' type='small' className='!font-light !text-neutral-600'>
            {job?.owner?.company?.name}
          </TextElement>
        </div>
      </div>
      <div className='flex w-full flex-grow flex-col justify-between gap-4 md:flex-row lg:w-auto'>
        <JobChips job={job} />
        <div className='flex items-center justify-between gap-10 md:justify-end'>
          <TextElement as='p' type='small' className='!font-semibold'>
            {job.country}
          </TextElement>
          <TextElement as='p' type='small' className='!font-light text-neutral-600'>
            {formatTimeAgo(job.createdAt)}
          </TextElement>
        </div>
      </div>
    </div>
  </Link>
)

export default JobItem
