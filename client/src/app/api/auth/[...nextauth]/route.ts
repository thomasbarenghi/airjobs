/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { loginUser } from '@/services/auth/login.service'
import { getUserByEmail } from '@/services/user/get-user.service'
import { userAdapter } from '@/adapters/user.adapt'
import type { UserInterface } from '@/interfaces/user.interface'
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'test@test.test'
        },
        password: { label: 'Password', type: 'password', required: true }
      },
      authorize: async (credentials): Promise<any> => {
        const { data, error } = await loginUser(
          credentials?.email ?? '',
          credentials?.password ?? ''
        )
        if (error) {
          console.log('Error: ', error)
          return null
        }
        const userDb = await getUserByEmail(data.userId)
        return {
          ...userAdapter(userDb.user as UserInterface),
          token: data.sessionId
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user
      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user as any
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
