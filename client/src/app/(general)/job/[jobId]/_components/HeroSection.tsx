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
import ModalStatus from './ModalStatus'
import Routes from '@/utils/constants/routes.const'
import Link from 'next/link'

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
  const { isOpen: isOpenStatus, onOpenChange: onOpenChangeStatus } =
    useDisclosure()
  const {
    isOpen: isOpenUnapply,
    onOpen: onOpenUnapply,
    onOpenChange: onOpenChangeUnapply
  } = useDisclosure()

  const isOwner = data?.owner?._id === loggedUser?._id

  const hasApplied = data?.applicants?.some(
    (job: ApplicantsEnum) => job?.user?._id === loggedUser?._id
  )

  const applicantStatus = data?.applicants?.find(
    (applicant: ApplicantsEnum) => applicant.user._id === loggedUser?._id
  )?.status

  console.log('hasApplied', hasApplied, data?.applicants)

  return (
    <>
      <section className='w-[85%] 2xl:container flex flex-col gap-10 section-padding-x-1'>
        <div className='w-full flex justify-between '>
          <Link href={Routes.COMPANY(data?.owner?._id ?? '')}>
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
          </Link>
          <div className='flex justify-between items-center gap-10'>
            <JobChips job={data} />
            <div className='flex gap-2'>
              {loggedUser?.role === 'aspirant' &&
                applicantStatus !== 'Obtained' &&
                applicantStatus !== 'Rejected' &&
                new Date(data?.deadline).getTime() > new Date().getTime() && (
                  <Button
                    onPress={hasApplied ? onOpenUnapply : onOpen}
                    title={hasApplied ? 'Unapply' : 'Apply Now'}
                    color={hasApplied ? 'danger' : 'primary'}
                  />
              )}
              {hasApplied && (
                <Button
                  onPress={onOpenChangeStatus}
                  title='View status'
                  color='primary'
                />
              )}
              {loggedUser?.role === 'company' && isOwner && (
                <div className='flex gap-2'>
                  <Button
                    title='Edit Job'
                    color='primary'
                    href={Routes.EDIT_JOB(jobId)}
                  />
                  <Button
                    onPress={() => {}}
                    title='View Applicants'
                    color='primary'
                    variant='flat'
                    href={Routes.APPLICANTS(jobId)}
                  />
                </div>
              )}
            </div>
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
          <div className='flex flex-col gap-1'>
            <TextElement
              as='p'
              type='base'
              className='!font-light text-gray-900'
            >
              Salary:{' '}
              <b className='font-semibold'>
                {data?.currency}
                {data?.salary}
              </b>
            </TextElement>
            <TextElement
              as='p'
              type='base'
              className='!font-light text-gray-900'
            >
              You can apply until:{' '}
              <b className='font-semibold'>
                {new Date(data?.deadline).toLocaleDateString()}
              </b>
            </TextElement>
            <TextElement
              as='p'
              type='base'
              className='!font-light text-gray-900'
            >
              The maximum number of applicants is: {data?.maxApplicants}, and
              has {data?.applicants?.length} applicants
            </TextElement>
            <TextElement
              as='p'
              type='base'
              className='!font-light text-gray-900'
            >
              The country of the job is:{' '}
              <b className='font-semibold'>{data?.country}</b>
            </TextElement>
          </div>
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
      <ModalStatus
        applicantStatus={applicantStatus}
        isOpen={isOpenStatus}
        onOpenChange={onOpenChangeStatus}
        job={data}
        loggedUser={loggedUser ?? {}}
      />
    </>
  )
}

export default HeroSection
