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

interface ModalApplyProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  job: JobInterface
  loggedUser: UserInterface | any
  mutate: any
}

const ModalApply = ({
  isOpen,
  onOpenChange,
  job,
  loggedUser,
  mutate
}: ModalApplyProps) => {
  const handleApply = async () => {
    try {
      const { error } = await postRequest(Endpoints.APPLY_JOB(job._id), {
        userId: loggedUser?._id ?? ''
      })
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
              Apply to {job?.title}
            </ModalHeader>
            <ModalBody>
              <TextElement as='p' type='base' className='!font-light '>
                When you apply to this job, you agree to the terms and
                conditions of our website. You should never be required to
                provide bank account details or any other financial information,
                or make any form of payment, when applying for a job.
                <br />
                <br />
                Once you click 'Apply' below, you will be added to the list of
                applicants for this job. You can withdraw your application at
                any time by clicking on the 'Withdraw Application' button in
                your account.
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
                  handleApply()
                  onClose()
                }}
              >
                Apply Now
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalApply
