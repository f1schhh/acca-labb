import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { pool } from "./db";
import bcrypt from "bcrypt";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup", // Add this line
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        phone: { label: "Phone", type: "text" },
        address: { label: "Address", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        // Check if this is a signup request
        if (req.body?.mode === "signup") {
          if (!credentials.name || !credentials.phone || !credentials.address) {
            throw new Error("Missing required fields for signup");
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const result = await pool.query(
            `INSERT INTO auth.users (email, password, name, phone, address)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [
              credentials.email,
              hashedPassword,
              credentials.name,
              credentials.phone,
              credentials.address,
            ]
          );

          const newUser = result.rows[0];
          return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          };
        }

        // Login flow
        const result = await pool.query(
          "SELECT * FROM auth.users WHERE email = $1",
          [credentials.email]
        );

        const user = result.rows[0];
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
};
