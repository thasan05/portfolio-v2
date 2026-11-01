import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // va.vercel-scripts.com: Vercel Analytics + Speed Insights collection scripts
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:", // https: allows book covers from any host
  "font-src 'self'",
  "connect-src 'self' https://va.vercel-scripts.com", // analytics/vitals beacons
  "media-src 'self' https:", // direct-file video sources (video intro)
  "frame-src https://www.youtube-nocookie.com", // YouTube video-intro embed only
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control",        value: "on" },
  { key: "Strict-Transport-Security",     value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options",               value: "DENY" },
  { key: "X-Content-Type-Options",        value: "nosniff" },
  // X-XSS-Protection intentionally omitted: deprecated and can introduce issues
  // in legacy browsers. The Content-Security-Policy below is the correct control.
  { key: "Referrer-Policy",               value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Content-Security-Policy",       value: CSP },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  // Tree-shake heavy barrel packages so only used exports ship.
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons", "lucide-react"],
  },

  images: {
    formats: ["image/avif", "image/webp"], // smaller than JPEG/PNG; better LCP + image-delivery audit
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "static-01.daraz.com.bd" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Extra headers for admin routes
      {
        source: "/admin(.*)",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
      // API routes — no caching, no sniffing
      {
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control",        value: "no-store, no-cache" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
