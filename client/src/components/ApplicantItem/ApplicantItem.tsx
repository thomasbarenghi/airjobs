import Image from 'next/image'
import type { ApplicantsEnum, JobInterface } from '@/interfaces/job.interface'
import { formatTimeAgo } from '@/utils/functions/formatTimeAgo'
import { Button, TextElement } from '@/components'
import ModalStatus from './ModalStatus'
import type { KeyedMutator } from 'swr'

interface JobItemProps {
  applicant: ApplicantsEnum
  job: JobInterface
  mutate: KeyedMutator<any>
}

const ApplicantItem = ({ applicant, job, mutate }: JobItemProps) => (
  <div className='flex flex-col gap-4  w-full py-5 px-5 lg:px-10  lg:justify-between lg:items-center cursor-pointer rounded-[30px] border border-violet-100'>
    <div className='flex flex-col md:flex-row gap-4 w-full'>
      <div className='flex gap-4 lg:w-[40%] xl:w-[45%] 2xl:w-[50%] '>
        <Image
          src={applicant?.user?.profileImage}
          alt={applicant?.user?.email}
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
            {applicant?.user?.firstName} {applicant?.user?.lastName}
          </TextElement>
          <TextElement
            as='p'
            type='small'
            className='!font-light !text-neutral-600'
          >
            {applicant?.user?.email}
          </TextElement>
        </div>
      </div>
      <div className='flex-grow flex gap-5 md:justify-end items-center'>
        <TextElement
          as='p'
          type='small'
          className='!font-light text-neutral-600 hidden lg:block'
        >
          Applied {formatTimeAgo(applicant.createdAt)}
        </TextElement>
        <div className='flex flex-wrap gap-2'>
          <Button
            title='View Resume'
            href={applicant?.resume?.replace('.pdf', '.png')}
            target='_blank'
          />
          <ModalStatus job={job} applicant={applicant} mutate={mutate} />
        </div>
      </div>
    </div>
    <TextElement
      as='p'
      type='small'
      className='!font-light text-neutral-600 lg:hidden'
    >
      Applied {formatTimeAgo(applicant.createdAt)}
    </TextElement>
  </div>
)

export default ApplicantItem
