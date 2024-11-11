// import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
import { getUserByEmail } from "@/app/api/users/route";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email as string);
        console.log("Found user:", !!user);
        console.log("User:", user);

        if (!user) {
          console.log("No user found with email:", credentials.email);
          throw new Error("No user found with email");
        }

        // else {
        //   const passwordMatch = await bcrypt.compare(
        //     credentials.password as string,
        //     user.password as string
        //   );
        //   if (!passwordMatch) {
        //     console.log("Password doesn't match");
        //     throw new Error("Password doesn't match");
        //   }
        // }

        return {
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
