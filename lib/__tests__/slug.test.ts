import { describe, it, expect } from "vitest";
import { slugify, projectSlug } from "../slug";

describe("slugify", () => {
  it("converts strings to lowercase url-safe slugs", () => {
    expect(slugify("Campus Network Design & Simulation")).toBe("campus-network-design-simulation");
  });

  it("strips special characters and trims excess hyphens", () => {
    expect(slugify("---Hello, World! @# 2026---")).toBe("hello-world-2026");
  });

  it("handles numbers and single words cleanly", () => {
    expect(slugify("NextJS 16")).toBe("nextjs-16");
  });
});

describe("projectSlug", () => {
  it("prefers explicit slug if provided", () => {
    const item = { slug: "my-custom-slug", title: "My Long Title", id: "proj-1" };
    expect(projectSlug(item)).toBe("my-custom-slug");
  });

  it("falls back to slugified title if slug is empty", () => {
    const item = { title: "AQI & Air Pollution", id: "proj-2" };
    expect(projectSlug(item)).toBe("aqi-air-pollution");
  });

  it("falls back to id if title has no slugifiable characters", () => {
    const item = { title: "!!!", id: "proj-3" };
    expect(projectSlug(item)).toBe("proj-3");
  });
});
