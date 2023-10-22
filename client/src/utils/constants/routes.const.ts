const Routes = {
  ABOUT: '/about',
  HOME: '/',
  FIND_JOBS: '/',
  EMPLOYERS: '/employers',
  SINGIN: '/signin',
  SINGUP: '/signup',
  INDIVIDUAL_JOB: (id: string) => `/job/${id}`,
  ACCOUNT: '/account'
}

export default Routes
