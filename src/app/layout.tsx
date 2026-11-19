import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/docs/site-header";
import { ThemeProvider } from "@/components/docs/theme";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const policies = [["Terms", "/terms"], ["Privacy", "/privacy"], ["Refunds", "/refunds"], ["Licence", "/licence"]] as const;

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-line px-4 py-6 text-center text-xs text-subtle">
            <p>{site.name} by {site.company} · Free to use in personal and commercial projects</p>
            <nav aria-label="Policies" className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
              {policies.map(([label, path]) => (
                <a key={path} href={site.policiesBase + path} className="hover:text-fg">
                  {label}
                </a>
              ))}
            </nav>
          </footer>
        </ThemeProvider>
        {/* Page views on Vercel (no cookies); does nothing in development or off Vercel. */}
        <Analytics />
      </body>
    </html>
  );
}
