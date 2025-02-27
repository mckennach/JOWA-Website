import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'password',
      credentials: {
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, _request) {
        if (credentials?.password == 'jowa2024!') {
          return { id: '0' }
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: 'thisisasupersecret',
})
