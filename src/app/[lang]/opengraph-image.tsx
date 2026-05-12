import { ImageResponse } from "next/og";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mustafa Aksu — Software Engineer";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safe: Locale = hasLocale(lang) ? lang : "en";
  const dict = await getDictionary(safe);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0a",
          color: "#fafaf9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.7, display: "flex" }}>
          mustafaaksu.dev
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.05 }}>
            {dict.home.headline}
          </div>
          <div style={{ fontSize: 28, opacity: 0.6 }}>{dict.home.subhead}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            opacity: 0.7,
          }}
        >
          <span>Mustafa Aksu</span>
          <span style={{ color: "#60a5fa" }}>● {dict.home.availability}</span>
        </div>
      </div>
    ),
    size,
  );
}
