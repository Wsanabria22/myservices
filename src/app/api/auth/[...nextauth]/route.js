import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from '@/utils/mongodb';
import { connectToDB } from '@/utils/database';

 const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@mail.com..." },
        password: { label: "Password", type: "password", autocomplete:"current-password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        try {
          const response = await fetch(`${process.env.NEXTAUTH_PUBLIC_BACKEND_URL}/api/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
          console.log({response});
          const user = await response.json();
          console.log({user});
          // If no error and we have user data, return it
          if (response.ok && user) {
            return user
          }
          // Return null if user data could not be retrieved
          return null
        } catch (error) {
          console.log('Error autorizando credenciales',error)
          return null
        }
      }  
    }),

    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  callbacks: {
    async session({session, token}) {
      session.user = token;
      // if(token.sub && session.user ) session.user.id = token.sub;
      // console.log('callbacksession', {session})
      return session;
    },
    async jwt({token, user, account, profile, trigger }) {
      // console.log('callbackjwt', {token}, {user}, {account}, {profile}, {trigger})
      // return token;
      return { ...token, ...user };
    },
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      console.log('callbackSingIn', {user}, {account})
      if(user) {
        try {
          const dataUser = {
            name: user.name,
            email: user.email,
            subId: user.id,
            isSocialUser: true,
            origin: account.provider,
            password: "no password",
          };
          const response = await fetch(`${process.env.NEXTAUTH_PUBLIC_BACKEND_URL}/api/localusers/${user.email}`);
          const localUser = await response.json();
          console.log({localUser});
          if (!response.ok) {
            console.log('creacion de usuario')
            const response = await fetch(`${process.env.NEXTAUTH_PUBLIC_BACKEND_URL}/api/localusers`,
              {
                method:"POST",
                body: JSON.stringify(dataUser),
                headers: { "Content-Type": "application/json" }
              }
            );
            console.log('response', response);
            const newUser = await response.json();
            console.log({newUser});
          }
        } catch (error) {
          console.log('Failed to crete a social user', error)
        }
      }
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    }
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise, {databaseName: 'my_services'}),
  // debug: true,
});

export { handler as GET, handler as POST };