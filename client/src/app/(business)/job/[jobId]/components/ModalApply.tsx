'use client'
import { Button, Input, TextElement } from '@/components'
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
import { type SubmitHandler, useForm } from 'react-hook-form'
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
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<any>({
    mode: 'onChange'
  })

  const handleApply: SubmitHandler<any> = async (data) => {
    try {
      console.log(data)
      const formData = {
        resume: data.resume[0],
        userId: loggedUser._id
      }

      console.log(formData)
      const { error } = await postRequest(
        Endpoints.APPLY_JOB(job._id),
        formData
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
      <form onSubmit={handleSubmit(handleApply)}>
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
                  provide bank account details or any other financial
                  information, or make any form of payment, when applying for a
                  job.
                </TextElement>
                <Input
                  type='file'
                  name='resume'
                  label='Add your resume'
                  placeholder='Your resume'
                  hookForm={{
                    register,
                    validations: {
                      validate: (value: File[]) => {
                        console.log(value)
                        if (!value[0].type.includes('pdf')) {
                          return 'File type should be pdf'
                        }
                        if (value[0].size > 2097152) {
                          return 'File size should be less than 2MB'
                        }

                        return true
                      },
                      required: {
                        value: true,
                        message: 'This field is required'
                      }
                    }
                  }}
                  errorMessage={errors?.resume?.message?.toString()}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color='primary'
                  onPress={async () => {
                    onClose()
                  }}
                  isLoading={isSubmitting}
                  type='submit'
                >
                  Apply Now
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  )
}

export default ModalApply
