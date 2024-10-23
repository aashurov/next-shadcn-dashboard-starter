import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phoneNumber: {
          label: 'Phone Number',
          type: 'text',
          placeholder: '+1234567890'
        },
        password: { label: 'Password', type: 'password' },

        typeL: { label: 'Type', type: 'text', placeholder: 'signIn or signUp' }
      },

      async authorize(credentials, req) {
        const { ...rest } = credentials as any;
        const url =
          credentials.typeL === 'signIn'
            ? `${process.env.PRODUCTION_API_URL}`
            : `${process.env.PRODUCTION_API_URL_SIGN_UP}`;

        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        });

        let user: MyUser;

        user = await response.json();

        if (user.result) {
          return user;
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  },

  pages: {
    signIn: '/',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request'
  }
} satisfies NextAuthConfig;

export default authConfig;

interface MyUser {
  id: string;
  name: string;
  email: string;
  role: string;

  userName?: string;
  token?: string;
  refreshToken?: string;
  result?: boolean;
  message?: string[];
  isExpired?: boolean;
}
