import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            cookie: req.headers?.cookie,
          },
          credentials: "include",
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        if (!user.verified) return { verified: false, email: user.email };

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.verified = user.verified;
        token.raw = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.verified = token.verified as boolean;
        session.user.jwt = token.raw as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
