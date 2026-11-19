import { isProItem, registryJson } from "@/lib/registry-json";
import { site } from "@/lib/site";

/**
 * shadcn registry endpoint: GET /r/button.json, /r/tactile.json, /r/registry.json …
 * Dependency URLs point back at whichever host served the request, so it works on
 * localhost, previews and production without configuration.
 */
export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!name.endsWith(".json")) return Response.json({ error: "Not found" }, { status: 404 });
  const slug = name.slice(0, -5);
  const base = new URL(request.url).origin;
  if (isProItem(slug)) {
    const pro = site.proHref.startsWith("/") ? base + site.proHref : site.proHref;
    return Response.json(
      { error: `"${slug}" is a Pro component. See ${pro}` },
      { status: 403, headers: { "Access-Control-Allow-Origin": "*" } },
    );
  }
  const json = await registryJson(slug, base);
  if (!json) return Response.json({ error: `No registry item "${name}"` }, { status: 404 });
  return Response.json(json, {
    headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=300, s-maxage=86400" },
  });
}
