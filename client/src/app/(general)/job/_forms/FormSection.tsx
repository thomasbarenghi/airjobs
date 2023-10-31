'use client'
import {
  Input,
  Textarea,
  SimpleSelect,
  TextElement,
  Button
} from '@/components'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import type {
  CountryEnum,
  CurrencyEnum,
  JobInterface,
  LocationEnum,
  SeniorityEnum,
  TypeEnum
} from '@/interfaces/job.interface'
import {
  countryData,
  currencyData,
  locationData,
  seniorityData,
  typeData
} from '../create-job/selectsData'
import { postJob } from './postJob'
import { editJob } from './editJob'
import { deleteJob } from './deleteJob'
import type { JobForm } from './jobForm.interface'
import {
  descriptionPattern,
  maxApplicantsPattern,
  salaryPattern,
  titlePattern
} from '@/utils/constants/pattern'
import type { UserInterface } from '@/interfaces/user.interface'

interface FormSectionProps {
  mode: 'create' | 'edit'
  job?: JobInterface
  loggedUser: UserInterface
}

const FormSection = ({ mode, job, loggedUser }: FormSectionProps) => {
  const router = useRouter()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    setValue
  } = useForm<JobForm>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<JobForm> = async (data) => {
    try {
      const formData = {
        ...data,
        ownerId: loggedUser?._id,
        salary: Number(data.salary),
        maxApplicants: Number(data.maxApplicants),
        deadline: new Date(data.deadline).toISOString()
      }
      if (mode === 'create') {
        await postJob(formData, router)
      } else {
        await editJob(formData, router, job?._id ?? '')
      }
    } catch (error) {
      console.error('Error FormSection catch:', error)
    }
  }

  return (
    <section className='flex flex-col gap-5 section-reduced'>
      <TextElement as='h1' type='t2' className='!font-light'>
        {mode === 'create' ? 'Create' : 'Edit your'}{' '}
        <b className='!font-semibold'>job</b>
      </TextElement>
      <form
        className='w-full flex flex-col items-center gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type='text'
          name='title'
          label='Job Title'
          placeholder='An amazing job title'
          defaultValue={mode === 'edit' ? job?.title : ''}
          hookForm={{
            register,
            validations: {
              pattern: {
                value: titlePattern.value,
                message: titlePattern.message
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.title?.message?.toString()}
        />
        <Textarea
          name='description'
          defaultValue={mode === 'edit' ? job?.description : ''}
          rows={5}
          label='Job Description'
          placeholder='A brief description of the job'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: descriptionPattern.value,
                message: descriptionPattern.message
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.description?.message?.toString()}
        />
        <Controller
          name='country'
          control={control}
          defaultValue={mode === 'edit' ? job?.country : ''}
          rules={{
            required: { value: true, message: 'This field is required' }
          }}
          render={({ field }: any) => (
            <SimpleSelect
              name='country'
              selectedValue={mode === 'edit' ? job?.country : ''}
              field={field}
              label='Select a country'
              setSelected={(selected) => {
                setValue('country', selected as CountryEnum)
              }}
              names={countryData}
              placeholder='Select an option'
              errorMessage={errors?.country?.message?.toString()}
            />
          )}
        />
        <Controller
          name='type'
          control={control}
          defaultValue={mode === 'edit' ? job?.type : undefined}
          rules={{
            required: { value: true, message: 'This field is required' }
          }}
          render={({ field }: any) => (
            <SimpleSelect
              name='type'
              selectedValue={mode === 'edit' ? job?.type : ''}
              field={field}
              label='Select the type of job'
              setSelected={(selected) => {
                setValue('type', selected as TypeEnum)
              }}
              names={typeData}
              placeholder='Select an option'
              errorMessage={errors?.type?.message?.toString()}
            />
          )}
        />
        <Controller
          name='location'
          defaultValue={mode === 'edit' ? job?.location : undefined}
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' }
          }}
          render={({ field }: any) => (
            <SimpleSelect
              name='location'
              selectedValue={mode === 'edit' ? job?.location : ''}
              field={field}
              label='Select the location mode'
              setSelected={(selected) => {
                setValue('location', selected as LocationEnum)
              }}
              names={locationData}
              placeholder='Select an option'
              errorMessage={errors?.location?.message?.toString()}
            />
          )}
        />
        <Controller
          name='seniority'
          defaultValue={mode === 'edit' ? job?.seniority : undefined}
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' }
          }}
          render={({ field }: any) => (
            <SimpleSelect
              name='seniority'
              selectedValue={mode === 'edit' ? job?.seniority : ''}
              field={field}
              label='Select the seniority level'
              setSelected={(selected) => {
                setValue('seniority', selected as SeniorityEnum)
              }}
              names={seniorityData}
              placeholder='Select an option'
              errorMessage={errors?.seniority?.message?.toString()}
            />
          )}
        />
        <Controller
          name='currency'
          defaultValue={mode === 'edit' ? job?.currency : undefined}
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' }
          }}
          render={({ field }: any) => (
            <SimpleSelect
              name='currency'
              field={field}
              selectedValue={mode === 'edit' ? job?.currency : ''}
              label='Select the currency'
              setSelected={(selected) => {
                setValue('currency', selected as CurrencyEnum)
              }}
              names={currencyData}
              placeholder='Select an option'
              errorMessage={errors?.currency?.message?.toString()}
            />
          )}
        />
        <Input
          type='number'
          name='salary'
          defaultValue={mode === 'edit' && job?.salary ? job.salary : undefined}
          label='Salary'
          placeholder='1000'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: salaryPattern.value,
                message: salaryPattern.message
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.salary?.message?.toString()}
        />
        <Input
          type='number'
          defaultValue={
            mode === 'edit' && job?.maxApplicants
              ? job.maxApplicants
              : undefined
          }
          name='maxApplicants'
          label='Max Applicants'
          placeholder='50'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: maxApplicantsPattern.value,
                message: maxApplicantsPattern.message
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.maxApplicants?.message?.toString()}
        />
        <Input
          type='date'
          defaultValue={
            mode === 'edit' && job?.deadline
              ? new Date(job.deadline).toISOString().split('T')[0]
              : ''
          }
          name='deadline'
          label='Deadline Date to Apply'
          placeholder='Deadline Date to Apply'
          hookForm={{
            register,
            validations: {
              validate: (value) => {
                const date = new Date(value)
                const today = new Date()
                if (date < today) {
                  return 'The deadline must be a future date'
                }
                return true
              },
              required: { value: true, message: 'This field is required' }
            }
          }}
          errorMessage={errors?.deadline?.message?.toString()}
        />
        <div className='w-full flex gap-2'>
          {mode === 'edit' && (
            <Button
              title='Delete'
              type='button'
              className='mt-4'
              color='danger'
              onPress={() => {
                deleteJob(job?._id ?? '', router)
              }}
            />
          )}

          <Button
            title={mode === 'create' ? 'Create Job' : 'Edit Job'}
            type='submit'
            isLoading={isSubmitting}
            fullWidth
            className='mt-4'
          />
        </div>
      </form>
    </section>
  )
}

export default FormSection
