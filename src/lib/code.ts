import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import { codeToHtml } from "shiki";

export type Source = { file: string; code: string; html: string };

function langOf(file: string) {
  if (file.endsWith(".css")) return "css";
  if (file.endsWith(".sh")) return "bash";
  return "tsx";
}

export async function highlight(code: string, lang = "tsx") {
  "use cache";
  cacheLife("max");
  return codeToHtml(code, {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
  });
}

/** Reads and highlights registry files (paths relative to src/registry). Cached at build time. */
export async function getSources(files: string[]): Promise<Source[]> {
  "use cache";
  cacheLife("max");
  return Promise.all(
    files.map(async (file) => {
      const code = await readFile(path.join(process.cwd(), "src/registry", file), "utf8");
      return { file, code, html: await highlight(code, langOf(file)) };
    }),
  );
}
