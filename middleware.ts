import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Very-light in-memory rate limiter (best-effort; not persistent across serverless instances)
const RATE_LIMIT = { windowMs: 60_000, max: 30 }; // 30 req/min/IP
const buckets = new Map<string, { count: number; reset: number }>();

export function middleware(req: NextRequest) {
  // Security headers
  const res = NextResponse.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "no-referrer");
  res.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  // Strict CSP allowing self, images from https and data/ipfs
  res.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' https: data: blob: ipfs:; connect-src 'self' https:; script-src 'self'; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'"
  );

  // Simple rate limit for API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "global";
    const now = Date.now();
    const bucket = buckets.get(ip);
    if (!bucket || now > bucket.reset) {
      buckets.set(ip, { count: 1, reset: now + RATE_LIMIT.windowMs });
    } else {
      bucket.count++;
      if (bucket.count > RATE_LIMIT.max) {
        return new NextResponse(JSON.stringify({ error: "Too Many Requests" }), {
          status: 429,
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
