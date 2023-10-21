import Image from 'next/image'
import { TextElement } from '..'
import type { JobInterface } from '@/interfaces/job.interface'

interface JobItemProps {
  job: JobInterface
}

const JobItem = ({ job }: JobItemProps) => (
  <div className='flex w-full'>
    <div className='flex gap-2'>
      <Image
        src={job.company.logo}
        alt={job.company.name}
        width={45}
        height={45}
      />
      <div className='flex flex-col'>
        <TextElement as='p' type='base' className='!font-semibold'>
          {job.title}
        </TextElement>
        <TextElement
          as='p'
          type='base'
          className='!font-light !text-neutral-600'
        >
          {job.company.name}
        </TextElement>
      </div>
    </div>
  </div>
)

export default JobItem
