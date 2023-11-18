'use client'
import { Button } from '@/components'
import Image from 'next/image'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

const Search = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className='flex w-full justify-between rounded-full bg-white p-2'>
      <div className='flex w-full items-center justify-start gap-2 pl-4'>
        <Image src='/icon/gray-search.svg' width={24} height={24} alt='search' />
        <input
          type='text'
          className='w-full bg-transparent font-light outline-none placeholder:text-neutral-500'
          placeholder='Job title or keyword'
          onChange={(e) => {
            router.push(pathname + '?' + createQueryString('title', e.target.value))
          }}
        />
      </div>
      <Button title='Search' />
    </div>
  )
}

export default Search
