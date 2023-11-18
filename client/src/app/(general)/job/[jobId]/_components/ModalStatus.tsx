/* eslint-disable @typescript-eslint/indent */
'use client'
import { Button, TextElement } from '@/components'
import type { JobInterface, StatusEnum } from '@/interfaces/job.interface'
import type { UserInterface } from '@/interfaces/user.interface'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

interface ModalApplyProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  job: JobInterface
  loggedUser: UserInterface | any
  applicantStatus: StatusEnum
}

const ModalStatus = ({ isOpen, onOpenChange, applicantStatus }: ModalApplyProps) => (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className='flex flex-col gap-1'>Status of your application</ModalHeader>
          <ModalBody>
            <TextElement as='p' type='base' className='!font-light '>
              {applicantStatus === 'Under review'
                ? 'Your application is under review. They will contact you soon for next steps.'
                : applicantStatus === 'Interested company'
                ? 'The company is interested in you. We provided your contact information to the company. They will contact you soon.'
                : applicantStatus === 'Obtained'
                ? 'You have obtained the job. Congratulations!'
                : 'Sorry, your application has been rejected. Luck for the next one!'}
            </TextElement>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='flat' onPress={onClose}>
              Close
            </Button>
            <Button
              color='primary'
              onPress={() => {
                onClose()
              }}
            >
              Okey
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
)

export default ModalStatus
