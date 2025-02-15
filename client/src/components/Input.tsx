'use client'
import { Input as InputUI } from '@heroui/react'
import { type ComponentProps } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface CustomProps {
  handleChange?: (e: string) => void
  type: string
  name: string
  errorMessage?: string
  className?: string
  hookForm?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>
    validations: RegisterOptions
  }
  max?: number
  min?: number
}

type DefaultProps = ComponentProps<typeof InputUI>
type ExtendedProps = DefaultProps & CustomProps

const Input = (props: ExtendedProps) => {
  const HookForm = props.hookForm?.register(props.name, props.hookForm?.validations)
  return (
    <InputUI
      {...HookForm}
      type={props.type}
      label={props.label}
      labelPlacement='outside'
      name={props.name}
      defaultValue={props.defaultValue}
      autoComplete='off'
      classNames={{
        inputWrapper:
          '!bg-white !text-black border border-solid border-gray-300 px-3 py-2 text-start rounded-2xl hover:!bg-gray-100 focus:!bg-white',
        label: 'text-sm font-light leading-[155%]  gap-1 font-normal !text-black',
        errorMessage: 'text-sm font-light leading-[155%] text-red-800',
        input: '!text-black placeholder:!text-gray-400 placeholder:font-light'
      }}
      className={props.className}
      onChange={async (e: React.ChangeEvent<HTMLInputElement>) => await HookForm?.onChange(e)}
      onValueChange={(value: string) => {
        props.handleChange && props?.handleChange(value)
      }}
      placeholder={props.placeholder}
      errorMessage={props.errorMessage}
      isInvalid={Boolean(props.errorMessage)}
    />
  )
}

export default Input
