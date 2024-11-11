// import NextAuth from "next-auth";
// import { authConfig } from "./auth";

// export { auth as middleware } from "./auth";

// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Route Middleware", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
