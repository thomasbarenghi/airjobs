import { JobsFlex, TextElement } from '@/components'
import type { IUser } from '@/interfaces/user.interface'

interface Props {
  loggedUser: IUser
  isError: boolean
}

const JobsSection = ({ loggedUser, isError }: Props) => (
  <section className='section-reduced flex flex-col gap-10'>
    <div className='flex w-full flex-col gap-5'>
      <div>
        <TextElement as='h2' type='t3' className='!font-semibold'>
          {loggedUser?.role === 'aspirant' ? 'My Applied Jobs' : 'My Posted Jobs'}
        </TextElement>
        <TextElement as='p' type='base' className='!font-light'>
          {loggedUser?.role === 'aspirant'
            ? 'You can check the status of your applications in each job'
            : 'You can check the applications of your jobs in each job'}
        </TextElement>
      </div>
      <JobsFlex
        jobs={loggedUser?.role === 'aspirant' ? loggedUser?.jobs?.applied ?? [] : loggedUser?.jobs?.created ?? []}
        isError={isError}
        isLoading={false}
      />
    </div>
  </section>
)

export default JobsSection
