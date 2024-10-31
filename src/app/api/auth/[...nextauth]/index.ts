import NextAuth from "next-auth";
import { authConfig } from "../../../../lib/auth/auth-config";
import PostgresAdapter from "@auth/pg-adapter";
import { pool } from "../../../../lib/auth/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PostgresAdapter(pool),
  session: { strategy: "database" },
});
