'use client'
import { TextElement } from '@/components'
import { useEffect } from 'react'

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error('Error root error.tsx:', error)
  }, [error])

  return (
    <html>
      <body>
        <main className='flex !min-h-[100vh] items-center justify-center'>
          <article className='my-[100px] flex h-full w-full flex-col items-center gap-10 pb-20 pt-4'>
            <section className='section-reduced flex h-full w-full items-center justify-center'>
              <div className='flex flex-col items-center justify-center gap-3'>
                <div className='flex flex-col gap-1'>
                  <TextElement as='h1' type='t2' className='text-center !font-light'>
                    Something went <b className='!font-bold'>wrong!</b>
                  </TextElement>
                  <TextElement as='p' type='base' className='max-w-[600px] text-center !font-light'>
                    If this is your first time loading the app, try again in one or two minutes. This application is
                    hosted on free services, so our servers turn off after 15 minutes of inactivity.
                  </TextElement>
                </div>
                <div className='flex gap-2'>
                  <button
                    className='rounded-full bg-primary px-6 py-3 font-semibold text-white'
                    onClick={() => {
                      reset()
                    }}
                  >
                    Try again
                  </button>
                  <button
                    className='rounded-full bg-primary-foreground px-6 py-3 font-semibold text-primary'
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
      </body>
    </html>
  )
}

export default GlobalError
