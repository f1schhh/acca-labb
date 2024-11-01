import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    address?: string;
    phone?: string;
    zipcode?: string;
    city?: string;
    country?: string;
    email_verified?: Date;
    signup_date: Date;
    last_login_date?: Date;
  }

  export interface Session {
    user: User;
  }
}
