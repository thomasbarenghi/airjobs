import Image from 'next/image'
import type { ApplicantsEnum, JobInterface } from '@/interfaces/job.interface'
import { formatTimeAgo } from '@/utils/functions/formatTimeAgo.utils'
import { Button, TextElement } from '@/components'
import ModalStatus from './ModalStatus'
import type { KeyedMutator } from 'swr'

interface JobItemProps {
  applicant: ApplicantsEnum
  job: JobInterface
  mutate: KeyedMutator<any>
}

const ApplicantItem = ({ applicant, job, mutate }: JobItemProps) => (
  <div className='flex w-full cursor-pointer  flex-col gap-4 rounded-[30px] border  border-violet-100 px-5 py-5 lg:items-center lg:justify-between lg:px-10'>
    <div className='flex w-full flex-col gap-4 md:flex-row'>
      <div className='flex gap-4 lg:w-[40%] xl:w-[45%] 2xl:w-[50%] '>
        <Image
          src={applicant?.user?.profileImage}
          alt={applicant?.user?.email}
          width={50}
          height={50}
          className='aspect-square rounded-lg object-cover'
        />
        <div className='flex flex-col justify-center '>
          <TextElement as='p' type='base' className='!font-semibold leading-[20px] '>
            {applicant?.user?.firstName} {applicant?.user?.lastName}
          </TextElement>
          <TextElement as='p' type='small' className='!font-light !text-neutral-600'>
            {applicant?.user?.email}
          </TextElement>
        </div>
      </div>
      <div className='flex flex-grow items-center gap-5 md:justify-end'>
        <TextElement as='p' type='small' className='hidden !font-light text-neutral-600 lg:block'>
          Applied {formatTimeAgo(applicant.createdAt)}
        </TextElement>
        <div className='flex flex-wrap gap-2'>
          <Button title='View Resume' href={applicant?.resume?.replace('.pdf', '.png')} target='_blank' />
          <ModalStatus job={job} applicant={applicant} mutate={mutate} />
        </div>
      </div>
    </div>
    <TextElement as='p' type='small' className='!font-light text-neutral-600 lg:hidden'>
      Applied {formatTimeAgo(applicant.createdAt)}
    </TextElement>
  </div>
)

export default ApplicantItem
