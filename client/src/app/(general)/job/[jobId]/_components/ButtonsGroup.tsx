'use client'
import { Button } from '@/components'
import Routes from '@/utils/constants/routes.const'
import { useDisclosure } from '@heroui/react'
import ModalContainer from './ModalContainer'
import type { KeyedMutator } from 'swr'
import { IUser } from '@/types/user'
import { IJob, StatusEnum } from '@/types/job'

interface ButtonsProps {
  hasApplied: boolean
  applicantStatus: StatusEnum
  data: IJob
  loggedUser: IUser
  jobId: string
  isOwner: boolean
  mutate: KeyedMutator<any>
}

const ButtonsGroup = ({ hasApplied, applicantStatus, data, loggedUser, jobId, isOwner, mutate }: ButtonsProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isOpenStatus, onOpenChange: onOpenChangeStatus } = useDisclosure()
  const { isOpen: isOpenUnapply, onOpen: onOpenUnapply, onOpenChange: onOpenChangeUnapply } = useDisclosure()

  return (
    <>
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
        {hasApplied && <Button onPress={onOpenChangeStatus} title='View status' color='primary' />}
        {loggedUser?.role === 'company' && isOwner && (
          <div className='flex gap-2'>
            <Button title='Edit Job' color='primary' href={Routes.EDIT_JOB(jobId)} />
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
      <ModalContainer
        mutate={mutate}
        applicantStatus={applicantStatus}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isOpenUnapply={isOpenUnapply}
        onOpenChangeUnapply={onOpenChangeUnapply}
        isOpenStatus={isOpenStatus}
        onOpenChangeStatus={onOpenChangeStatus}
        data={data}
        loggedUser={loggedUser}
        hasApplied={hasApplied}
      />
    </>
  )
}

export default ButtonsGroup
