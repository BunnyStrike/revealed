import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { type DefaultSession, type NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

import { prisma } from '@revealed/db'

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [],
}
