import type { MetadataRoute } from "next";
import { registry } from "@/registry";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/docs",
    "/docs/components",
    ...[site.proHref, site.templatesHref].filter((h) => h.startsWith("/")),
    ...(site.policiesBase ? [] : ["/terms", "/privacy", "/refunds", "/licence"]),
  ];
  return [
    ...pages.map((p) => ({ url: site.url + p, priority: p === "" ? 1 : 0.8 })),
    ...registry.map((i) => ({ url: `${site.url}/docs/components/${i.slug}`, priority: 0.6 })),
  ];
}
