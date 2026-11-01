import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tanvir Hasan — CS Undergraduate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1040 50%, #0f1825 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background orbs */}
        <div style={{
          position: "absolute", top: "-100px", right: "-100px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", left: "200px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
        }} />

        {/* TH badge */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "72px", height: "72px", borderRadius: "20px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #3b82f6)",
          color: "white", fontSize: "22px", fontWeight: "900",
          marginBottom: "32px",
          boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
        }}>
          TH
        </div>

        {/* Name */}
        <div style={{
          fontSize: "72px", fontWeight: "900", color: "white",
          lineHeight: 1, letterSpacing: "-2px", marginBottom: "16px",
          background: "linear-gradient(90deg, #c7d2fe, #e0e7ff)",
        }}>
          Tanvir Hasan
        </div>

        {/* Title */}
        <div style={{
          fontSize: "28px", color: "#a5b4fc", fontWeight: "600",
          marginBottom: "28px", letterSpacing: "-0.5px",
        }}>
          Networking & Systems · CSE Undergraduate
        </div>

        {/* Tags row */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "40px" }}>
          {["Computer Networks", "Distributed Systems", "AIUB, Bangladesh"].map((tag) => (
            <div key={tag} style={{
              padding: "8px 18px", borderRadius: "100px",
              background: "rgba(99,102,241,0.2)",
              border: "1px solid rgba(99,102,241,0.4)",
              color: "#c7d2fe", fontSize: "16px", fontWeight: "600",
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          fontSize: "18px", color: "#6366f1", fontWeight: "500",
          letterSpacing: "0.5px",
        }}>
          tanvirh.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
