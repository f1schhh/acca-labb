// import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./src/app/lib/helpers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await getUserByEmail(credentials.email as string);

        if (!user) {
          console.log("No user found with email:", credentials.email);
          throw new Error("No user found with email");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password as string
        );
        if (!passwordMatch) {
          console.log("Password doesn't match");
          throw new Error("Password doesn't match");
        }

        return {
          ...user,
          id: user.id.toString(),
          email: user.email as string,
          name: `${user.first_name} ${user.last_name}` as string,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});
