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
          background: "linear-gradient(135deg, #0f3d2e 0%, #1a5c45 45%, #c4a35a 100%)",
          color: "#f7f3ea",
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
            background: "#c4a35a",
            color: "#0f3d2e",
            fontSize: 36,
            fontWeight: 700,
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
