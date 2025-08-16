import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  console.log(token);
  if (!token) return NextResponse.redirect(new URL("/", req.url));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      role: string;
    };
    console.log("User role:======>>>>>", decoded.role); // server-side
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
