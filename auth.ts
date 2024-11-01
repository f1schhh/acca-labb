import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { pool } from "./lib/db";
import bcrypt from "bcrypt";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/",
    newUser: "/signup",
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
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        // Check if this is a signup request
        if (req.body?.mode === "signup") {
          if (
            !credentials.first_name ||
            !credentials.last_name ||
            !credentials.email ||
            !credentials.password ||
            !credentials.address ||
            !credentials.phone ||
            !credentials.zipcode ||
            !credentials.city ||
            !credentials.country
          ) {
            throw new Error("Missing required fields for signup");
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const result = await pool.query(
            `INSERT INTO auth.users (
              first_name,
              last_name,
              email,
              password,
              address,
              phone,
              zipcode,
              city,
              country,
              signup_date,
              last_login_date
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *`,
            [
              credentials.first_name,
              credentials.last_name,
              credentials.email,
              hashedPassword,
              credentials.name,
              credentials.phone,
              credentials.address,
              credentials.zipcode,
              credentials.city,
              credentials.country,
            ]
          );

          const newUser = result.rows[0];
          return {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
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
