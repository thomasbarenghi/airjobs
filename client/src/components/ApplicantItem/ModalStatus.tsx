'use client'
import { Button, SimpleSelect, TextElement } from '@/components'
import type {
  ApplicantsEnum,
  JobInterface,
  StatusEnum
} from '@/interfaces/job.interface'
import { putRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import { convertArrayToValueLabelArray } from '@/utils/functions/formatToSelect'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import type { KeyedMutator } from 'swr'

interface ModalApplyProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  applicant: ApplicantsEnum
  job: JobInterface
  mutate: KeyedMutator<JobInterface>
}

export const statusData = convertArrayToValueLabelArray([
  'Under review',
  'Interested company',
  'Obtained',
  'Rejected'
])

const ModalStatus = ({
  isOpen,
  onOpenChange,
  applicant,
  mutate,
  job
}: ModalApplyProps) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
    control,
    setValue
  } = useForm<any>({
    mode: 'onChange'
  })

  const handleApply: SubmitHandler<any> = async (data) => {
    try {
      const formData = {
        ...data,
        userId: applicant?.user?._id
      }

      const { error } = await putRequest(
        Endpoints.UPDATE_APPLICANT(job._id),
        formData,
        false
      )

      if (error) {
        toast.error('Something went wrong, please try again later')
        return
      }

      await mutate()
      toast.success('Applicant status updated successfully')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(handleApply)}>
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Update applicant status for {applicant?.user?.firstName}{' '}
                {applicant?.user?.lastName}
              </ModalHeader>
              <ModalBody>
                <TextElement as='p' type='base' className='!font-light '>
                  You can update the status of the applicant here.
                </TextElement>
                <Controller
                  name='status'
                  control={control}
                  defaultValue={applicant?.status}
                  rules={{
                    required: { value: true, message: 'This field is required' }
                  }}
                  render={({ field }: any) => (
                    <SimpleSelect
                      name='status'
                      selectedValue={applicant?.status}
                      field={field}
                      label='Select status'
                      setSelected={(selected) => {
                        setValue('status', selected as StatusEnum)
                      }}
                      names={statusData}
                      placeholder='Select an option'
                      errorMessage={errors?.status?.message?.toString()}
                    />
                  )}
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
                  onPress={
                    getValues()?.resume?.length <= 0 ||
                    Object.keys(errors).length > 0
                      ? undefined
                      : onClose
                  }
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalStatus
