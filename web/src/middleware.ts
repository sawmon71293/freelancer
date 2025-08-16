import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, decodeJwt } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  const protectedPaths = ["/client", "/freelancer"];
  const currentPath = req.nextUrl.pathname;
  // const claims = decodeJwt(token);
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    await jwtVerify(token, secret);
    const claims = decodeJwt(token);
    const claimsRole = claims.role || "";
    const redirectUrl = claimsRole ? `/${claimsRole}` : "/";
    if (claimsRole && currentPath !== `/${claimsRole}`) {
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/client", "/freelancer"],
};
