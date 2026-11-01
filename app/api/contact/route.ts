import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { redis } from "../../../lib/redis";
import { addMessage, getMessages } from "../../../lib/messages";
import { verifyToken } from "../../../lib/auth";

export const runtime = "nodejs";

const RL_MAX = 5;
const RL_WINDOW_S = 60 * 60; // 5 messages / hour / IP
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIP(req: NextRequest): string {
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown"
  );
}

// ── Submit a message (public) ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 415 });
  }

  // Rate limit (fail closed if Redis errors)
  if (redis) {
    try {
      const key = `ratelimit:contact:${createHash("sha256").update(clientIP(req)).digest("hex").slice(0, 16)}`;
      const n = await redis.incr(key);
      if (n === 1) await redis.expire(key, RL_WINDOW_S);
      if (n > RL_MAX) {
        return NextResponse.json({ error: "Too many messages. Try again later." }, { status: 429 });
      }
    } catch {
      return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
    }
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — bots fill hidden "company" field. Pretend success, drop it.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 1 || name.length > 100) return NextResponse.json({ error: "Name required" }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > 200) return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  if (message.length < 1 || message.length > 5000) return NextResponse.json({ error: "Message required" }, { status: 400 });

  await addMessage({ name, email, message, ts: Date.now() });
  return NextResponse.json({ ok: true });
}

// ── Read messages (admin only) ───────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "").trim();
  if (!verifyToken(token, process.env.ADMIN_PASSWORD ?? "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getMessages());
}
