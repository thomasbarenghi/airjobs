'use client'

import type { StatusEnum } from '@/interfaces/job.interface'

import ModalApply from './ModalApply'
import ModalUnapply from './ModalUnapply'
import ModalStatus from './ModalStatus'
import type { UserInterface } from '@/interfaces/user.interface'
import type { KeyedMutator } from 'swr'

interface ModalContainerProps {
  isOpen: boolean
  onOpenChange: () => void
  isOpenUnapply: boolean
  onOpenChangeUnapply: () => void
  isOpenStatus: boolean
  onOpenChangeStatus: () => void
  applicantStatus: StatusEnum
  data: any
  loggedUser: UserInterface
  mutate: KeyedMutator<any>
  hasApplied: boolean
}

const ModalContainer = ({
  isOpen,
  onOpenChange,
  isOpenUnapply,
  onOpenChangeUnapply,
  isOpenStatus,
  onOpenChangeStatus,
  applicantStatus,
  data,
  loggedUser,
  mutate,
  hasApplied
}: ModalContainerProps) => (
  <>
    <ModalApply
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      job={data}
      loggedUser={loggedUser ?? {}}
      mutate={mutate}
      hasApplied={hasApplied}
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

export default ModalContainer
