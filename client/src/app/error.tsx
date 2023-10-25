'use client'
import { Footer, Header, TextElement } from '@/components'
import { useEffect } from 'react'

const Error = ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    console.error('Error root error.tsx:', error)
  }, [error])

  return (
    <>
      <Header layout='simple' />
      <main className='!min-h-[100vh] flex items-center justify-center'>
        <article className='flex h-full flex-col gap-10 items-center w-full my-[100px] pt-4 pb-20 '>
          <section className='flex section-reduced justify-center items-center w-full h-full'>
            <div className='flex flex-col gap-3 justify-center items-center'>
              <div className='flex flex-col gap-1'>
                <TextElement
                  as='h1'
                  type='t2'
                  className='!font-light text-center'
                >
                  Something went <b className='!font-bold'>wrong!</b>
                </TextElement>
                <TextElement
                  as='p'
                  type='base'
                  className='!font-light max-w-[600px] text-center'
                >
                  If this is your first time loading the app, try again in one or
                  two minutes. This application is hosted on free services, so
                  our servers turn off after 15 minutes of inactivity.
                </TextElement>
              </div>
              <div className='flex gap-2'>
                <button
                  className='px-6 py-3 bg-primary text-white rounded-full font-semibold'
                  onClick={() => {
                    reset()
                  }}
                >
                  Try again
                </button>
                <button
                  className='px-6 py-3 text-primary bg-primary-foreground rounded-full font-semibold'
                  onClick={() => {
                    reset()
                  }}
                >
                  Go home
                </button>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}

export default Error
