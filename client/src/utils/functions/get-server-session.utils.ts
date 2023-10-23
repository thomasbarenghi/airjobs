import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

export const auth = async (
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) => await getServerSession(...args, authOptions)
