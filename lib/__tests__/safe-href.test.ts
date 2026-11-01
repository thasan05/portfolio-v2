import { describe, it, expect } from "vitest";
import { safeHref } from "../safe-href";

describe("safeHref", () => {
  it("allows http(s), mailto, tel", () => {
    expect(safeHref("https://example.com")).toBe("https://example.com");
    expect(safeHref("http://example.com")).toBe("http://example.com");
    expect(safeHref("mailto:a@b.com")).toBe("mailto:a@b.com");
    expect(safeHref("tel:+123")).toBe("tel:+123");
  });

  it("allows relative paths", () => {
    expect(safeHref("/resume.pdf")).toBe("/resume.pdf");
  });

  it("blocks javascript: and data: URIs", () => {
    expect(safeHref("javascript:alert(1)")).toBe("#");
    expect(safeHref("JavaScript:alert(1)")).toBe("#");
    expect(safeHref("data:text/html,<script>")).toBe("#");
  });

  it("handles empty / nullish", () => {
    expect(safeHref("")).toBe("#");
    expect(safeHref(undefined)).toBe("#");
    expect(safeHref(null)).toBe("#");
  });
});
