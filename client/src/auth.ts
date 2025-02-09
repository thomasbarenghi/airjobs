/* eslint-disable @typescript-eslint/no-unused-vars */
import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import { type AdapterUser } from 'next-auth/adapters'
import { postData } from './utils/apiAccess'
import { type ILoginResponseDto, type IRefreshResponseDto } from './types/auth'

// TODO: Marcar errores por session o credenciales invalidas. Borrar info si la session es invalida.
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const email = credentials?.email ?? ''
        const password = credentials?.password ?? ''
        const user = await authenticateUser(email, password)
        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
        token.access_token = user.access_token
        token.access_token_expires_at = user.access_token_expires_at
        token.refresh_token = user.refresh_token
        return await Promise.resolve(token)
      } else if (Date.now() < token.access_token_expires_at) {
        return await Promise.resolve(token)
      } else {
        if (!token.refresh_token) {
          token.error = 'RefreshTokenError'
          return await Promise.resolve(token)
        }

        try {
          const newTokens = await refreshAuthToken(token.refresh_token)
          return { ...token, ...newTokens }
        } catch (error) {
          token.error = 'RefreshTokenError'
          return await Promise.resolve(token)
        }
      }
    },
    async session({ session, token }) {
      session.error = token.error
      session.user = token.user as AdapterUser
      return session
    }
  }
})

const loginUser = async (email: string, password: string) =>
  await postData<ILoginResponseDto>('auth/login', {
    email,
    password
  })

const refreshTokenReq = async (refreshToken: string) =>
  await postData<IRefreshResponseDto>('auth/refresh', {
    refreshToken
  })

const authenticateUser = async (email: string, password: string) => {
  const { data, error } = await loginUser(email, password)

  if (error || !data) {
    throw new Error('Login error')
  }

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role,
    access_token: data.access_token,
    access_token_expires_at: data.access_token_expires_at,
    refresh_token: data.refresh_token
  }
}

let isRefreshing = false

const refreshAuthToken = async (refreshToken: string) => {
  if (isRefreshing) return
  isRefreshing = true
  try {
    const { data: resTokens, error } = await refreshTokenReq(refreshToken)

    if (error || !resTokens) {
      throw new Error('refresh error')
    }

    return {
      access_token: resTokens.access_token,
      access_token_expires_at: resTokens.access_token_expires_at,
      refresh_token: resTokens.refresh_token
    }
  } finally {
    isRefreshing = false
  }
}
