'use client'
import { Button, Input, TextElement } from '@/components'
import { postRequest } from '@/services/apiRequests.service'
import { IJob } from '@/types/job'
import { IUser } from '@/types/user'
import Endpoints from '@/utils/constants/endpoints.const'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { KeyedMutator } from 'swr'

interface ModalApplyProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  job: IJob
  loggedUser: IUser
  hasApplied: boolean
  mutate: KeyedMutator<any>
}

const ModalApply = ({ isOpen, onOpenChange, job, loggedUser, hasApplied, mutate }: ModalApplyProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
    reset
  } = useForm<any>({
    mode: 'onChange'
  })

  const handleApply: SubmitHandler<any> = async (data) => {
    try {
      console.log('hey, data')

      const formData = {
        resume: data.resume[0],
        userId: loggedUser._id
      }
      const { error, data: updatedData } = await postRequest(Endpoints.APPLY_JOB(job._id), formData, true)
      if (error) {
        toast.error('Something went wrong, please try again later')
        return
      }
      toast.success('You have applied to this job')
      mutate(updatedData, {
        revalidate: false
      })
      reset()
    } catch (error) {
      console.error('Error ModalApply catch:', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(handleApply)}>
            <>
              <ModalHeader className='flex flex-col gap-1'>Apply to {job?.title}</ModalHeader>
              <ModalBody>
                <TextElement as='p' type='base' className='!font-light'>
                  When you apply to this job, you agree to the terms and conditions of our website. You should never be
                  required to provide bank account details or any other financial information, or make any form of
                  payment, when applying for a job.
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
                  isLoading={isSubmitting}
                  type='submit'
                  onPress={getValues()?.resume?.length <= 0 || Object.keys(errors).length > 0 ? undefined : onClose}
                  isDisabled={hasApplied}
                >
                  Apply Now
                </Button>
              </ModalFooter>
            </>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalApply
