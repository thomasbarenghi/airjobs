'use client'
import { itemsNavBuilder, type ItemNavInterface } from './lib/itemsNav'
import NextLink from 'next/link'
import { signOut } from 'next-auth/react'
import { IUser } from '@/types/user'

interface Props {
  loggedUser: IUser
}

const Menu = ({ loggedUser }: Props) => {
  const items: ItemNavInterface[] = itemsNavBuilder(loggedUser)
  const dangerStyle = 'bg-red-50 text-red-800 hover:bg-red-50 hover:text-red-800'

  return (
    <div className='flex w-full flex-col'>
      {items.map((item, index) => (
        <NextLink
          href={item.href}
          className={`w-full rounded-xl p-2 hover:bg-slate-100 ${item.color === 'danger' ? dangerStyle : ''}`}
          key={index}
        >
          {item.label}
        </NextLink>
      ))}
      <button
        onClick={async () => {
          void signOut({ redirect: true })
        }}
        className={`w-full rounded-xl bg-white p-2 text-start font-semibold hover:bg-slate-100 ${dangerStyle}`}
      >
        Logout
      </button>
    </div>
  )
}

export default Menu
