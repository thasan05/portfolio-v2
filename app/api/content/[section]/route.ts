import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getRawSection, setContent } from "../../../../lib/content";
import { verifyToken } from "../../../../lib/auth";

const VALID_SECTIONS = new Set([
  "hero", "career", "experience", "education", "skills",
  "publications", "references", "affiliations", "beyond", "site",
  "projects", "certifications", "books", "video", "testimonials", "now", "research",
  "coding", "achievements", "blog", "sessions",
]);

const MAX_BODY_BYTES = 256 * 1024; // 256 KB

function isAuthorized(req: NextRequest): boolean {
  const auth  = req.headers.get("Authorization") ?? "";
  const token = auth.replace("Bearer ", "").trim();
  const pass  = process.env.ADMIN_PASSWORD ?? "";
  return verifyToken(token, pass);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;

  if (!VALID_SECTIONS.has(section)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data = await getRawSection(section);
  return NextResponse.json(data);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = await params;

  if (!VALID_SECTIONS.has(section)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Payload size guard
  const contentLength = parseInt(req.headers.get("content-length") ?? "0", 10);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
  }

  try {
    const text = await req.text();
    if (Buffer.byteLength(text) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    const body = JSON.parse(text);
    await setContent(section, body);
    // Bust the ISR cache so the edit shows up on the live site immediately.
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
