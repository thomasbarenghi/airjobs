'use client'
import { useSession } from 'next-auth/react'
import { Button, DynamicPopover } from '@/components'
import Menu from './Menu'
import Endpoints from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import Routes from '@/utils/constants/routes.const'

const ProfileAction = () => {
  const { data: session, status } = useSession()
  const { data: loggedUser } = useSWR(
    Endpoints.USER_BY_EMAIL(session?.user?.email ?? '')
  )

  return (
    <>
      {status === 'authenticated' ? (
        <DynamicPopover image={loggedUser?.profileImage} backdrop='transparent'>
          <Menu loggedUser={loggedUser} />
        </DynamicPopover>
      ) : (
        <Button size='md' title='Iniciar sesión' href={Routes.SINGIN} />
      )}
    </>
  )
}

export default ProfileAction
