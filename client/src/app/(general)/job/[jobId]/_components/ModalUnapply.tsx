'use client'
import { Button, TextElement } from '@/components'
import { postRequest } from '@/services/apiRequests.service'
import { IJob } from '@/types/job'
import { IUser } from '@/types/user'
import Endpoints from '@/utils/constants/endpoints.const'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { toast } from 'sonner'
import type { KeyedMutator } from 'swr'

interface ModalUnapplyProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  job: IJob
  loggedUser: IUser
  mutate: KeyedMutator<any>
}

const ModalUnapply = ({ isOpen, onOpenChange, job, loggedUser, mutate }: ModalUnapplyProps) => {
  const handleUnapply = async () => {
    try {
      const { error, data: updatedData } = await postRequest(
        Endpoints.UNAPPLY_JOB(job._id),
        {
          userId: loggedUser?._id ?? ''
        },
        false
      )
      if (error) {
        console.error('Error ModalUnapply:', error)
        toast.error('Something went wrong, please try again later')
      }
      mutate(updatedData, {
        revalidate: false
      })
      toast.success('You have unapplied to this job')
    } catch (error) {
      console.error('Error ModalUnapply catch:', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Unapplay to {job?.title}</ModalHeader>
            <ModalBody>
              <TextElement as='p' type='base' className='!font-light'>
                You are about to unapply to this job. Are you sure?
                <br />
                <br />
                If you regret your decision, you can always apply again, but you will be placed at the end of the queue.
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
