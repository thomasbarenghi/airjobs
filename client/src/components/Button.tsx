/* eslint-disable @typescript-eslint/indent */
'use client'
import { Button as ButtonUI, Spinner } from '@nextui-org/react'
import Link from 'next/link'

interface ButtonProps {
  children?: React.ReactNode
  color?: 'primary' | 'default' | 'secondary' | 'success' | 'warning' | 'danger'
  variant?:
    | 'flat'
    | 'solid'
    | 'bordered'
    | 'light'
    | 'faded'
    | 'shadow'
    | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  radius?: 'sm' | 'md' | 'lg' | 'none' | 'full'
  fullWidth?: boolean
  title?: string
  isDisabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  href?: string
  isLoading?: boolean
  spinnerPlacement?: 'start' | 'end'
  spinner?: React.ReactNode
  spinnerSize?: 'sm'
}

const Button = ({
  children,
  title,
  color = 'primary',
  variant = 'solid',
  size = 'lg',
  radius = 'full',
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  type = 'button',
  className = '',
  startContent,
  endContent,
  href = '',
  onClick = () => {},
  spinnerPlacement = 'end',
  spinnerSize = 'sm',
  spinner = <Spinner color='current' size={spinnerSize} />
}: ButtonProps) => (
  <ButtonUI
    as={href.length > 0 ? Link : 'button'}
    href={href}
    color={color}
    variant={variant}
    size={size}
    type={type}
    radius={radius}
    fullWidth={fullWidth}
    isDisabled={isDisabled}
    className={`!text-sm font-semibold ${className} `}
    onPress={onClick}
  >
    {startContent}
    {isLoading && spinnerPlacement === 'start' && spinner}
    {children}
    {title}
    {isLoading && spinnerPlacement === 'end' && spinner}
    {endContent}
  </ButtonUI>
)

export default Button
