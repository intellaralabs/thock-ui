import { categories, getItem, registry } from "@/registry";
import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${site.name} component`;

export function generateStaticParams() {
  return registry.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const item = getItem((await params).slug);
  if (!item) return ogImage({ eyebrow: "Component", title: site.name, description: site.tagline });
  return ogImage({
    eyebrow: categories.find((c) => c.id === item.category)?.title ?? "Component",
    title: item.name,
    description: item.description,
    pro: item.pro,
  });
}
