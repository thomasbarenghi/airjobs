import { Button, TextElement } from '@/components'
import Image from 'next/image'

interface HeroSectionProps {
  setQuery: (query: Record<string, string>) => void
  query: Record<string, string>
}

const HeroSection = ({ setQuery, query }: HeroSectionProps) => (
  <section className='bg-indigo-50 min-h-[300px] flex items-end justify-center w-full section-padding-x-1 pt-[100px] pb-10 '>
    <div className='flex flex-col gap-5 flex-grow 2xl:container'>
      <TextElement as='h1' type='t1' className='!font-light'>
        Find <b className='font-semibold'>your dream job</b> here.
      </TextElement>
      <div className='w-full bg-white rounded-full flex justify-between p-2'>
        <div className='flex gap-2 pl-4 justify-start items-center w-full'>
          <Image
            src='/icon/gray-search.svg'
            width={24}
            height={24}
            alt='search'
          />
          <input
            type='text'
            className='w-full bg-transparent outline-none placeholder:text-neutral-500 font-light'
            placeholder='Job title or keyword'
            onChange={(e) => {
              setQuery({ ...query, title: e.target.value })
            }}
            value={query.title ?? ''}
          />
        </div>
        <Button title='Search' />
      </div>
    </div>
  </section>
)

export default HeroSection