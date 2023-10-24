import { Button } from '@/components'
import Routes from '@/utils/constants/routes.const'

interface ButtonsProps {
  hasApplied: boolean
  onOpen: () => void
  onOpenUnapply: () => void
  onOpenChangeStatus: () => void
  applicantStatus: string
  data: any
  loggedUser: any
  jobId: string
  isOwner: boolean
}

const ButtonsGroup = ({
  hasApplied,
  onOpen,
  onOpenUnapply,
  onOpenChangeStatus,
  applicantStatus,
  data,
  loggedUser,
  jobId,
  isOwner
}: ButtonsProps) => (
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
)

export default ButtonsGroup
