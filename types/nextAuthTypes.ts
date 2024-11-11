import NextAuth from "next-auth";

export declare module "next-auth" {
  export interface User {
    id?: string;
    first_name?: string;
    last_name?: string;
    password: string;
    email?: string | null;
    address?: string;
    phone?: string;
    zipcode?: string;
    city?: string;
    country?: string;
    email_verified?: Date;
    signup_date: Date;
    last_login_date?: Date;
    mode?: string;
  }

  export interface Session {
    user: User;
  }
}
