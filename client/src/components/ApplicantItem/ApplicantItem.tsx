import Image from 'next/image'
import type { ApplicantsEnum, JobInterface } from '@/interfaces/job.interface'
import { formatTimeAgo } from '@/utils/functions/formatTimeAgo'
import { Button, TextElement } from '@/components'
import { useDisclosure } from '@nextui-org/react'
import type { KeyedMutator } from 'swr'
import ModalStatus from './ModalStatus'

interface JobItemProps {
  applicant: ApplicantsEnum
  job: JobInterface
  mutate: KeyedMutator<JobInterface>
}

const ApplicantItem = ({ applicant, mutate, job }: JobItemProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className='flex w-full py-5 px-10 justify-between items-center cursor-pointer rounded-[30px] border border-violet-100'>
      <div className='flex gap-4 lg:w-[40%] xl:w-[45%] 2xl:w-[60%] '>
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

      <div className='flex-grow flex gap-5 justify-end items-center'>
        <TextElement
          as='p'
          type='small'
          className='!font-light text-neutral-600'
        >
          Applied {formatTimeAgo(applicant.createdAt)}
        </TextElement>
        <div className='flex gap-2'>
          <Button
            title='View Resume'
            href={applicant?.resume?.replace('.pdf', '.png')}
            target='_blank'
          />
          <Button title='Change Status' variant='flat' onPress={onOpen} />
        </div>
      </div>
      <ModalStatus
        job={job}
        mutate={mutate}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        applicant={applicant}
      />
    </div>
  )
}

export default ApplicantItem
