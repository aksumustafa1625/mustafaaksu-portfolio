import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mustafa Aksu — Salesforce Developer";

// Read the profile photo from /public at module load so each request
// reuses the same base64 string. ~64 KB so the cost is negligible.
const profileBuffer = fs.readFileSync(
  path.join(process.cwd(), "public", "profile.jpg"),
);
const profileDataUrl = `data:image/jpeg;base64,${profileBuffer.toString("base64")}`;

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
          background: "#0a0a0a",
          color: "#fafaf9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Left column — profile photo */}
        <div
          style={{
            width: 420,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 60,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileDataUrl}
            alt="Mustafa Aksu"
            width={300}
            height={300}
            style={{
              width: 300,
              height: 300,
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #27272a",
            }}
          />
        </div>

        {/* Right column — text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 80px 60px 0",
          }}
        >
          <div style={{ fontSize: 24, opacity: 0.7, display: "flex" }}>
            mustafaaksu.dev
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                fontSize: 54,
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {dict.home.headline}
            </div>
            <div style={{ fontSize: 22, opacity: 0.6, lineHeight: 1.35 }}>
              {dict.home.subhead}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
              opacity: 0.75,
            }}
          >
            <span style={{ fontWeight: 500 }}>Mustafa Aksu</span>
            <span style={{ color: "#60a5fa", display: "flex" }}>
              ● {dict.home.availability}
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
