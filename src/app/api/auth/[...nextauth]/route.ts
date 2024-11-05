// import NextAuth from "next-auth";
// import { authConfig } from "../../../../../auth";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   ...authConfig,
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
// });

import { handlers } from "../../../../../auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
