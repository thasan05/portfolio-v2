import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { makeToken } from "../../../../lib/auth";
import { redis } from "../../../../lib/redis";

export const runtime = "nodejs";

const RATE_LIMIT_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_S = 15 * 60; // 15 minutes

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function hashIP(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // ── Rate limit ────────────────────────────────────────────────────────────
  // When Redis is configured (prod), enforce it and fail closed on any Redis
  // error so an outage can't silently open the endpoint to brute force. When
  // Redis is absent (local dev), skip rate limiting.
  const ip     = getClientIP(req);
  const ipHash = hashIP(ip);
  const rlKey  = `ratelimit:admin:${ipHash}`;

  if (redis) {
    try {
      const attempts = await redis.incr(rlKey);
      if (attempts === 1) {
        await redis.expire(rlKey, RATE_LIMIT_WINDOW_S);
      }
      if (attempts > RATE_LIMIT_ATTEMPTS) {
        const ttl = await redis.ttl(rlKey);
        return NextResponse.json(
          { error: `Too many attempts. Try again in ${Math.ceil(ttl / 60)} min.` },
          { status: 429, headers: { "Retry-After": String(ttl) } }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let password: string;
  try {
    const body = await req.json();
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  // ── Timing-safe password check ────────────────────────────────────────────
  const { timingSafeEqual } = await import("crypto");
  let valid = false;
  try {
    valid = timingSafeEqual(
      Buffer.from(password.padEnd(72)),
      Buffer.from(adminPassword.padEnd(72))
    );
  } catch {
    valid = false;
  }

  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Clear rate limit on success
  if (redis) await redis.del(rlKey);

  const token = makeToken(adminPassword);
  return NextResponse.json({ ok: true, token });
}
