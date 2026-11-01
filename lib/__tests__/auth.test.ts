import { describe, it, expect, vi } from "vitest";
import { makeToken, verifyToken } from "../auth";

const PW = "correct horse battery staple";

describe("auth tokens", () => {
  it("verifies a freshly minted token", () => {
    expect(verifyToken(makeToken(PW), PW)).toBe(true);
  });

  it("rejects the wrong password", () => {
    expect(verifyToken(makeToken(PW), "wrong")).toBe(false);
  });

  it("rejects malformed / empty tokens", () => {
    expect(verifyToken("", PW)).toBe(false);
    expect(verifyToken("no-dot-here", PW)).toBe(false);
    expect(verifyToken(makeToken(PW), "")).toBe(false);
  });

  it("rejects an expired token (iat older than 8h)", () => {
    const realNow = Date.now;
    // Mint a token 9 hours in the past.
    vi.spyOn(Date, "now").mockReturnValue(realNow() - 9 * 60 * 60 * 1000);
    const oldToken = makeToken(PW);
    vi.spyOn(Date, "now").mockReturnValue(realNow());
    expect(verifyToken(oldToken, PW)).toBe(false);
    vi.restoreAllMocks();
  });
});
