// import { PrismaAdapter } from '@auth/prisma-adapter';
// import bcrypt from 'bcrypt';
// import NextAuth, { type AuthOptions } from 'next-auth';
// // import AuthConfig, { type AuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// import { prisma } from '@/server/prisma';

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'email', type: 'email' },
//         password: { label: 'password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('check credentials');
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user?.hashedPassword) {
//           throw new Error('check credentials');
//         }

//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword,
//         );

//         if (!isCorrectPassword) {
//           throw new Error('check credentials');
//         }
//         return user;
//       },
//     }),
//   ],

//   pages: {
//     signIn: '/auth',
//   },

//   // session: { strategy: 'jwt' },
//   // jwt: {
//   //   secret: process.env.AUTH_JWT_SECRET,
//   // },
//   // secret: process.env.AUTH_SECRET,
//   session: { strategy: 'jwt' },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// import { PrismaAdapter } from '@auth/prisma-adapter';
// import bcrypt from 'bcrypt';
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// import { prisma } from '@/server/prisma';

// export const authOptions = {
//   debug: true,
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'email', type: 'email' },
//         password: { label: 'password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user?.hashedPassword) return null;

//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword,
//         );

//         if (!isCorrectPassword) return null;

//         return user;
//       },
//     }),
//   ],

//   pages: {
//     signIn: '/auth',
//   },

//   session: { strategy: 'jwt' },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { prisma } from '@/server/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  session: { strategy: 'jwt' },
});
