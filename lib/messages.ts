import { redis } from "./redis";

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  ts: number;
}

const KEY = "portfolio:messages";
const MAX = 200;

// Local filesystem fallback for dev without Redis.
async function readLocal(): Promise<ContactMessage[]> {
  try {
    const { promises: fs } = await import("fs");
    const path = await import("path");
    const raw = await fs.readFile(path.join(process.cwd(), ".localdata", "messages.json"), "utf8");
    return JSON.parse(raw) as ContactMessage[];
  } catch {
    return [];
  }
}

async function writeLocal(list: ContactMessage[]): Promise<void> {
  const { promises: fs } = await import("fs");
  const path = await import("path");
  const dir = path.join(process.cwd(), ".localdata");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "messages.json"), JSON.stringify(list, null, 2), "utf8");
}

export async function addMessage(msg: ContactMessage): Promise<void> {
  if (!redis) {
    const list = await readLocal();
    list.unshift(msg);
    await writeLocal(list.slice(0, MAX));
    return;
  }
  await redis.lpush(KEY, JSON.stringify(msg));
  await redis.ltrim(KEY, 0, MAX - 1);
}

export async function getMessages(): Promise<ContactMessage[]> {
  if (!redis) return readLocal();
  const raw = await redis.lrange<string | ContactMessage>(KEY, 0, -1);
  return raw.map((r) => (typeof r === "string" ? JSON.parse(r) : r)) as ContactMessage[];
}
