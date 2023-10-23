export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/account',
    '/job/create-job',
    '/onboarding-company',
    '/account/:path*',
    '/job/edit-job/:path*',
    '/job/:path*/applicants'
  ]
}
