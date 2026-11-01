import { Redis } from "@upstash/redis";

// Single Upstash Redis client for the whole app. The credentials may be exposed
// under either the UPSTASH_* names or the KV_REST_API_* names — on Vercel the
// KV/Upstash integration sets the latter. Read whichever pair exists and build
// the client explicitly.
//
// `Redis.fromEnv()` is deliberately NOT used: when the env vars are unset it
// returns a client with an empty URL that only fails at call time
// ("Failed to parse URL from /pipeline") instead of throwing, so it can't be
// used as an availability guard. `redis` is null when no credentials are
// present (local dev), and callers fall back accordingly.

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL   || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export const redis: Redis | null =
  REDIS_URL && REDIS_TOKEN ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN }) : null;
