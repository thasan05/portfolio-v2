import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  // Block suspicious paths / path traversal attempts
  if (
    pathname.includes("..") ||
    pathname.includes("//") ||
    /\.(env|git|htaccess|htpasswd|bak|sql|log|config)$/i.test(pathname)
  ) {
    return new NextResponse(null, { status: 404 });
  }

  // Method guard on content API — only GET and POST allowed
  if (pathname.startsWith("/api/content/") && !["GET", "POST"].includes(req.method)) {
    return new NextResponse(null, { status: 405, headers: { Allow: "GET, POST" } });
  }

  // Method guard on login — POST only
  if (pathname === "/api/admin/login" && req.method !== "POST") {
    return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
  }

  // Prevent admin from being indexed
  if (pathname.startsWith("/admin")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.headers.set("Cache-Control", "no-store");
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|photos|profile.jpg|resume.pdf).*)",
  ],
};
