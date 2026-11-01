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
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#09090b",
          color: "#f4f4f5",
          fontFamily: "serif",
          position: "relative",
          border: "1px solid #27272a",
        }}
      >
        {/* Subtle warm ambient glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(134,239,172,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Top Header / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>Tanvir</span>
            <span style={{ color: "#86efac" }}>.</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid #27272a",
              backgroundColor: "#151518",
              fontFamily: "sans-serif",
              fontSize: "14px",
              color: "#a1a1aa",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#22c55e",
              }}
            />
            <span>Open for Summer 2026 Internships</span>
          </div>
        </div>

        {/* Center Editorial Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: "#f4f4f5",
            }}
          >
            Tanvir Hasan
          </div>
          <div
            style={{
              fontFamily: "serif",
              fontStyle: "italic",
              fontSize: "30px",
              color: "#86efac",
              fontWeight: 400,
            }}
          >
            Networking & Systems Focused CSE Undergraduate
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "20px",
              color: "#a1a1aa",
              lineHeight: 1.5,
              marginTop: "8px",
            }}
          >
            American International University-Bangladesh · Future MS Candidate
          </div>
        </div>

        {/* Bottom Metadata row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #27272a",
            paddingTop: "28px",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {["Computer Networks", "Distributed Systems", "Cisco Packet Tracer", "Applied Research"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    border: "1px solid #27272a",
                    backgroundColor: "#151518",
                    color: "#a1a1aa",
                    fontSize: "14px",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          <div
            style={{
              fontSize: "18px",
              color: "#86efac",
              fontWeight: 500,
              letterSpacing: "0.2px",
            }}
          >
            tanvirh.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
