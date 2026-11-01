import { describe, it, expect } from "vitest";
import { youTubeId } from "../youtube";

describe("youTubeId", () => {
  it("extracts id from watch URLs", () => {
    expect(youTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });
  it("extracts id from youtu.be short links", () => {
    expect(youTubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });
  it("extracts id from embed and shorts URLs", () => {
    expect(youTubeId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(youTubeId("https://youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });
  it("returns null for non-YouTube or empty URLs", () => {
    expect(youTubeId("https://example.com/video.mp4")).toBeNull();
    expect(youTubeId("")).toBeNull();
  });
});
