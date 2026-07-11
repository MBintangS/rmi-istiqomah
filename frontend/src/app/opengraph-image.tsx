import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Remaja Masjid Istiqomah";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0f1609 0%, #1a2e0c 40%, #4e830a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 88,
            height: 88,
            borderRadius: 999,
            background: "#ffffff",
            color: "#4e830a",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.04em",
            marginBottom: 36,
          }}
        >
          RMI
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Remaja Masjid Istiqomah
        </div>
        <div style={{ marginTop: 20, fontSize: 28, opacity: 0.9, maxWidth: 820 }}>
          Kegiatan, program, dan artikel Islami untuk generasi muda masjid
        </div>
      </div>
    ),
    { ...size },
  );
}
