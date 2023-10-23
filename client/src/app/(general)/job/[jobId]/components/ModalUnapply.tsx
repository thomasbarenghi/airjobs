'use client'
import { Button, TextElement } from '@/components'
import type { JobInterface } from '@/interfaces/job.interface'
import type { UserInterface } from '@/interfaces/user.interface'
import { postRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { toast } from 'sonner'

interface ModalUnapplyProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  job: JobInterface
  loggedUser: UserInterface | any
  mutate: any
}

const ModalUnapply = ({
  isOpen,
  onOpenChange,
  job,
  loggedUser,
  mutate
}: ModalUnapplyProps) => {
  const handleUnapply = async () => {
    try {
      const { error } = await postRequest(
        Endpoints.UNAPPLY_JOB(job._id),
        {
          userId: loggedUser?._id ?? ''
        },
        false
      )
      if (error) {
        toast.error('Something went wrong, please try again later')
      }
      await mutate()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Unapplay to {job?.title}
            </ModalHeader>
            <ModalBody>
              <TextElement as='p' type='base' className='!font-light '>
                You are about to unapply to this job. Are you sure?
                <br />
                <br />
                If you regret your decision, you can always apply again, but you
                will be placed at the end of the queue.
                <br />
              </TextElement>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='flat' onPress={onClose}>
                Cancel
              </Button>
              <Button
                color='primary'
                onPress={() => {
                  handleUnapply()
                  onClose()
                }}
              >
                Unapply Now
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalUnapply
