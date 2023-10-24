'use client'
import { JobChips, TextElement } from '@/components'
import type { ApplicantsEnum } from '@/interfaces/job.interface'
import Endpoints from '@/utils/constants/endpoints.const'
import { useDisclosure } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import useSWR from 'swr'
import Routes from '@/utils/constants/routes.const'
import Link from 'next/link'
import ModalContainer from './ModalContainer'
import ButtonsGroup from './ButtonsGroup'
import HeroSkeleton from './HeroSkeleton'

interface Props {
  jobId: string
}

const HeroSection = ({ jobId }: Props) => {
  const { data, mutate, isLoading } = useSWR(Endpoints.INDIVIDUAL_JOB(jobId))
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

  if (isLoading) return <HeroSkeleton />

  return (
    <>
      <section className=' flex flex-col gap-10 section-reduced'>
        <div className='w-full flex-col gap-5 lg:flex-row flex justify-between '>
          <div className='flex items-center gap-5 flex-grow'>
            <div className='w-full'>
              <Link href={Routes.COMPANY(data?.owner?._id ?? '')}>
                <div className='w-full flex gap-5'>
                  <Image
                    width={80}
                    height={80}
                    src={data?.owner?.company?.logo ?? '/image/placeholder.png'}
                    alt="Company's logo"
                    className='object-cover rounded-lg aspect-square'
                  />
                  <div className='flex flex-col justify-center'>
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
            </div>

            <div className='hidden md:block lg:hidden'>
              <ButtonsGroup
                hasApplied={hasApplied}
                onOpen={onOpen}
                onOpenUnapply={onOpenUnapply}
                onOpenChangeStatus={onOpenChangeStatus}
                applicantStatus={applicantStatus}
                data={data}
                loggedUser={loggedUser}
                jobId={jobId}
                isOwner={isOwner}
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-5'>
            <JobChips job={data} />
            <div className='md:hidden lg:block'>
              <ButtonsGroup
                hasApplied={hasApplied}
                onOpen={onOpen}
                onOpenUnapply={onOpenUnapply}
                onOpenChangeStatus={onOpenChangeStatus}
                applicantStatus={applicantStatus}
                data={data}
                loggedUser={loggedUser}
                jobId={jobId}
                isOwner={isOwner}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <TextElement
            as='p'
            type='base'
            className='!font-light leading-[165%] text-gray-900 overflow-y-hidden'
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
      <ModalContainer
        applicantStatus={applicantStatus}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isOpenUnapply={isOpenUnapply}
        onOpenChangeUnapply={onOpenChangeUnapply}
        isOpenStatus={isOpenStatus}
        onOpenChangeStatus={onOpenChangeStatus}
        data={data}
        loggedUser={loggedUser}
        mutate={mutate}
        hasApplied={hasApplied}
      />
    </>
  )
}

export default HeroSection
