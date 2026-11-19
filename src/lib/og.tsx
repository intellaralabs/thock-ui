import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

/** Shared share-card artwork: a dark tray with a raised key, a title and an LED row. */
export function ogImage({ eyebrow, title, description, pro }: { eyebrow: string; title: string; description: string; pro?: boolean }) {
  // The bundled font has no ⌘ glyph, and fetching a fallback font fails offline.
  description = description.replaceAll("⌘", "Cmd+");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 56,
          background: "radial-gradient(circle at 30% 0%, #2a2a2f 0%, #121214 70%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
            borderRadius: 36,
            background: "linear-gradient(180deg, #232327, #1a1a1d)",
            border: "2px solid #050506",
            boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#ff2a3c", boxShadow: "0 0 18px #e3192b" }} />
            <div style={{ fontSize: 28, color: "#8a8a93", letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
            {pro && (
              <div
                style={{
                  marginLeft: 8,
                  padding: "4px 14px",
                  borderRadius: 10,
                  background: "#121214",
                  border: "2px solid #2c2c31",
                  color: "#ededf0",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                PRO
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 88, fontWeight: 700, color: "#ededf0", lineHeight: 1.05 }}>{title}</div>
            <div style={{ fontSize: 34, color: "#9a9aa3", lineHeight: 1.35, maxWidth: 940 }}>{description}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                padding: "14px 26px",
                borderRadius: 18,
                background: "linear-gradient(180deg, #36363c, #2c2c31)",
                borderBottom: "6px solid #050506",
                color: "#c9c9d0",
                fontSize: 30,
                fontWeight: 600,
              }}
            >
              {site.name}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[1, 1, 1, 0, 0].map((on, i) => (
                <div
                  key={i}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    background: on ? "#ff2a3c" : "#2a2a2f",
                    boxShadow: on ? "0 0 14px #e3192b" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
