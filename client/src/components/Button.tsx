'use client'
import { Button as ButtonUI } from '@heroui/react'
import Link from 'next/link'
import { type ComponentProps } from 'react'

interface CustomProps {
  children?: React.ReactNode
  title?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
  href?: string
  target?: '_blank' | '_self'
}

type DefaultProps = ComponentProps<typeof ButtonUI>
type ExtendedProps = DefaultProps & CustomProps

const Button = (props: ExtendedProps) => (
  <ButtonUI
    as={props.href && props.href.length > 0 ? Link : 'button'}
    href={props.href}
    color={props.color ?? 'primary'}
    variant={props.variant ?? 'solid'}
    size={props.size ?? 'lg'}
    type={props.type}
    radius={props.radius ?? 'full'}
    fullWidth={props.fullWidth}
    isDisabled={props.isDisabled}
    className={`!text-sm font-semibold ${props.className} `}
    onPress={props.onPress}
    onClick={props.onClick}
    isLoading={props.isLoading}
    spinnerPlacement={props.spinnerPlacement}
    target={props.target}
  >
    {props.startContent}
    {props.children}
    {props.title}
    {props.endContent}
  </ButtonUI>
)

export default Button
