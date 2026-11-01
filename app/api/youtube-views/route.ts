import { NextResponse } from "next/server";

export const revalidate = 600; // Cache response for 10 minutes

const API_KEY = process.env.YOUTUBE_API_KEY!;
const PLAYLIST_ID = "PLDEFeMnoY4iVxQQvS8xkJymCtgIsUSDjo";

interface PlaylistItem {
  contentDetails: { videoId: string };
}

interface VideoItem {
  statistics: { viewCount: string };
}

export async function GET() {
  try {
    // 1. Fetch playlist videos
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
    );
    const data = await res.json();

    // Guard: API errors (missing/invalid key, quota) return no `items`.
    const videoIds: string[] = Array.isArray(data.items)
      ? (data.items as PlaylistItem[]).map((item) => item.contentDetails.videoId)
      : [];

    if (videoIds.length === 0) {
      return NextResponse.json({ totalViews: 0 });
    }

    // 2. Fetch view counts
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );
    const statsData = await statsRes.json();

    // 3. Sum views
    const totalViews = Array.isArray(statsData.items)
      ? (statsData.items as VideoItem[]).reduce((sum: number, video) => {
          return sum + parseInt(video.statistics.viewCount, 10);
        }, 0)
      : 0;

    return NextResponse.json({ totalViews });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ totalViews: 0 });
  }
}
