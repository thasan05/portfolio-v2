import { NextResponse } from "next/server";
import crypto from "crypto";
import { redis } from "../../../lib/redis";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!redis) {
    return NextResponse.json({ visits: 0, countryCount: 0, countryList: [] });
  }
  try {
    const ip =
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
      "unknown";

    const country = request.headers.get("x-vercel-ip-country");

    const hashedIp = crypto
      .createHash("sha256")
      .update(ip)
      .digest("hex");

    const visitorKey = `visitor:${hashedIp}`;
    const alreadyVisited = await redis.get(visitorKey);

    if (!alreadyVisited) {
      await redis.set(visitorKey, "true", {
        ex: 60 * 60 * 24 * 365,
      });

      await redis.incr("total_visits");

      if (country) {
        await redis.sadd("countries", country);
      }
    }

    const [visits, countries] = await Promise.all([
      redis.get<number>("total_visits"),
      redis.smembers<string[]>("countries"),
    ]);

    return NextResponse.json({
      visits: visits ?? 0,
      countryCount: countries?.length ?? 0,
      countryList: countries ?? [],
    });
  } catch {
    return NextResponse.json(
      {
        visits: 0,
        countryCount: 0,
        countryList: [],
      },
      { status: 500 }
    );
  }
}
