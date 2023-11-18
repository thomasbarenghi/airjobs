'use client'
import { Button, SimpleSelect, TextElement } from '@/components'
import type { ApplicantsEnum, JobInterface, StatusEnum } from '@/interfaces/job.interface'
import { putRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import { convertArrayToValueLabelArray } from '@/utils/functions/formatToSelect.utils'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import type { KeyedMutator } from 'swr'

interface ModalApplyProps {
  applicant: ApplicantsEnum
  job: JobInterface
  mutate: KeyedMutator<any>
}

export const statusData = convertArrayToValueLabelArray(['Under review', 'Interested company', 'Obtained', 'Rejected'])

const ModalStatus = ({ applicant, job, mutate }: ModalApplyProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
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

      const { error, data: updatedData } = await putRequest(Endpoints.UPDATE_APPLICANT(job._id), formData, false)

      if (error) {
        toast.error('Something went wrong, please try again later')
        console.error('Error ModalStatus:', error)
        return
      }

      mutate(updatedData, {
        revalidate: false
      })
      toast.success('Applicant status updated successfully')
    } catch (error) {
      console.error('Error ModalStatus catch:', error)
    }
  }

  return (
    <>
      <Button title='Change Status' variant='flat' onPress={onOpen} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleApply)}>
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  Update applicant status for {applicant?.user?.firstName} {applicant?.user?.lastName}
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
                      required: {
                        value: true,
                        message: 'This field is required'
                      }
                    }}
                    render={({ field }: any) => (
                      <SimpleSelect
                        name='status'
                        defaultSelectedKeys={[applicant?.status]}
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
                    onPress={getValues()?.resume?.length <= 0 || Object.keys(errors).length > 0 ? undefined : onClose}
                  >
                    Update
                  </Button>
                </ModalFooter>
              </>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalStatus
