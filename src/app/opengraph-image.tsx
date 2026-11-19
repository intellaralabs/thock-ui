import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.name;

export default function Image() {
  return ogImage({ eyebrow: "React + Tailwind", title: site.name, description: site.tagline });
}
