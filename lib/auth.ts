import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_MAX_AGE_S = 8 * 60 * 60; // 8 hours

export function makeToken(password: string): string {
  const iat = Math.floor(Date.now() / 1000);
  const sig = createHmac("sha256", password)
    .update(`portfolio-admin-session-v1:${iat}`)
    .digest("hex");
  return `${iat}.${sig}`;
}

export function verifyToken(token: string, password: string): boolean {
  if (!token || !password) return false;
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const iatStr = token.slice(0, dot);
  const sig    = token.slice(dot + 1);
  const iat    = parseInt(iatStr, 10);
  if (!Number.isFinite(iat)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (now - iat > TOKEN_MAX_AGE_S) return false;
  const expected = createHmac("sha256", password)
    .update(`portfolio-admin-session-v1:${iat}`)
    .digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}
