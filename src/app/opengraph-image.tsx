import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.brand.name} — ${site.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#101918", color: "#ecf5f1", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", width: "100%", height: "100%" }}>
      <div style={{ color: "#2dd4bf", fontSize: 28, fontWeight: 700, letterSpacing: 5 }}>{site.brand.name.toUpperCase()}</div>
      <div style={{ fontSize: 72, fontWeight: 700, marginTop: 28, maxWidth: 900 }}>{site.brand.tagline}</div>
      <div style={{ color: "#a5b8b1", fontSize: 30, marginTop: 24 }}>A clearer path from bold ideas to steady momentum.</div>
    </div>,
    size,
  );
}
