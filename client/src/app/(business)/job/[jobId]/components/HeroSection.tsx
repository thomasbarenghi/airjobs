'use client'
import { Button, JobChips, TextElement } from '@/components'
import type { ApplicantsEnum } from '@/interfaces/job.interface'
import Endpoints from '@/utils/constants/endpoints.const'
import { useDisclosure } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import useSWR from 'swr'
import ModalApply from './ModalApply'
import ModalUnapply from './ModalUnapply'

interface Props {
  jobId: string
}

const HeroSection = ({ jobId }: Props) => {
  const { data, mutate } = useSWR(Endpoints.INDIVIDUAL_JOB(jobId))
  const { data: session } = useSession()
  const { data: loggedUser } = useSWR(
    Endpoints.USER_BY_EMAIL(session?.user?.email ?? '')
  )
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: isOpenUnapply,
    onOpen: onOpenUnapply,
    onOpenChange: onOpenChangeUnapply
  } = useDisclosure()

  const hasApplied = data?.applicants?.some(
    (job: ApplicantsEnum) => job?.user?._id === loggedUser?._id
  )

  console.log('hasApplied', hasApplied, data?.applicants)

  return (
    <>
      <section className='w-[85%] 2xl:container flex flex-col gap-10 section-padding-x-1'>
        <div className='w-full flex justify-between '>
          <div className='flex items-center gap-5 flex-grow'>
            <Image
              width={80}
              height={80}
              src={data?.owner?.company?.logo ?? '/image/userPlaceholder.png'}
              alt="Company's logo"
              className='object-cover rounded-lg aspect-square'
            />
            <div className='flex flex-col justify-center '>
              <TextElement
                as='p'
                type='t3'
                className='!font-semibold leading-[24px] '
              >
                {data?.title}
              </TextElement>
              <TextElement as='p' type='base' className='!font-light'>
                {data?.owner?.company?.name}
              </TextElement>
            </div>
          </div>
          <div className='flex justify-between items-center gap-10'>
            <JobChips job={data} />
            {loggedUser?.role === 'aspirant' && (
              <Button
                onPress={hasApplied ? onOpenUnapply : onOpen}
                title={hasApplied ? 'Unapply' : 'Apply Now'}
                color={hasApplied ? 'danger' : 'primary'}
              />
            )}
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <TextElement
            as='p'
            type='base'
            className='!font-light leading-[165%] text-gray-900'
          >
            {data?.description}
          </TextElement>
          <TextElement
            as='p'
            type='base'
            className='!font-semibold text-gray-900'
          >
            Salary: {data?.currency}
            {data?.salary}
          </TextElement>
        </div>
      </section>
      <ModalApply
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        job={data}
        loggedUser={loggedUser ?? {}}
        mutate={mutate}
      />
      <ModalUnapply
        isOpen={isOpenUnapply}
        onOpenChange={onOpenChangeUnapply}
        job={data}
        loggedUser={loggedUser ?? {}}
        mutate={mutate}
      />
    </>
  )
}

export default HeroSection
