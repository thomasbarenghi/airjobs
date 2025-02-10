import type { Metadata } from 'next'
import { JobsFlex, TextElement, SearchBar } from '@/components'
import { getRequest } from '@/services/apiRequests.service'
import Endpoints from '@/utils/constants/endpoints.const'
import { buildQueryString } from '@/utils/functions/buildQueryString'

export const metadata: Metadata = {
  title: 'Find Jobs | Airjobs'
}

interface JobsSectionProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Home = async ({ searchParams }: JobsSectionProps) => {
  const queryString = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(',') : String(value)
    ])
  )

  const { data, error } = await getRequest(
    Endpoints.ALL_JOBS + buildQueryString(queryString),
    {},
    { tags: ['jobs-filtered'] }
  )

  return (
    <>
      <section className='section-padding-x-1 flex min-h-[300px] w-full items-end justify-center bg-violet-100 pb-10 pt-[100px]'>
        <div className='flex flex-grow flex-col gap-5 2xl:container'>
          <TextElement as='h1' type='t1' className='!font-light text-primary'>
            Find <b className='font-semibold'>your dream job</b> here.
          </TextElement>
          <SearchBar />
        </div>
      </section>
      <section className='section-padding-x-1 flex justify-center'>
        <div className='w-full py-10 2xl:container'>
          <JobsFlex jobs={data ?? []} isLoading={false} isError={error} />
        </div>
      </section>
    </>
  )
}

export default Home
