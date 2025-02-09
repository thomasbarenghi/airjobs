import ModalApply from './ModalApply'
import ModalUnapply from './ModalUnapply'
import ModalStatus from './ModalStatus'
import type { KeyedMutator } from 'swr'
import { IJob, StatusEnum } from '@/types/job'
import { IUser } from '@/types/user'

interface ModalContainerProps {
  isOpen: boolean
  onOpenChange: () => void
  isOpenUnapply: boolean
  onOpenChangeUnapply: () => void
  isOpenStatus: boolean
  onOpenChangeStatus: () => void
  applicantStatus: StatusEnum
  data: IJob
  loggedUser: IUser
  hasApplied: boolean
  mutate: KeyedMutator<any>
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
  hasApplied,
  mutate
}: ModalContainerProps) => (
  <>
    <ModalApply
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      job={data}
      loggedUser={loggedUser ?? {}}
      hasApplied={hasApplied}
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

export default ModalContainer
