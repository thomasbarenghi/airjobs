import { JobsFlex, TextElement } from '@/components'
import type { UserInterface } from '@/interfaces/user.interface'

interface Props {
  loggedUser: UserInterface
  isError: boolean
}

const JobsSection = ({ loggedUser, isError }: Props) => (
  <section className='flex flex-col gap-10 section-reduced'>
    <div className='flex flex-col gap-5 w-full'>
      <div>
        <TextElement as='h2' type='t3' className='!font-semibold'>
          {loggedUser?.role === 'aspirant'
            ? 'My Applied Jobs'
            : 'My Posted Jobs'}
        </TextElement>
        <TextElement as='p' type='base' className='!font-light'>
          {loggedUser?.role === 'aspirant'
            ? 'You can check the status of your applications in each job'
            : 'You can check the applications of your jobs in each job'}
        </TextElement>
      </div>
      <JobsFlex
        jobs={
          loggedUser?.role === 'aspirant'
            ? loggedUser?.jobs?.applied ?? []
            : loggedUser?.jobs?.created ?? []
        }
        isError={isError}
        isLoading={false}
      />
    </div>
  </section>
)

export default JobsSection
