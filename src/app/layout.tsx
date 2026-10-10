import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { site } from "@/content/site";
import { createSiteJsonLd } from "@/lib/seo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: site.brand.name,
    template: `%s | ${site.brand.name}`,
  },
  description: site.brand.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://mehrtek.example"),
  alternates: { canonical: "/" },
  openGraph: {
    title: site.brand.name,
    description: site.brand.description,
    url: "/",
    siteName: site.brand.name,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.brand.name }],
  },
  twitter: { card: "summary_large_image", title: site.brand.name, description: site.brand.description, images: ["/opengraph-image"] },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#101918" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script type="application/ld+json">{JSON.stringify(createSiteJsonLd(site, process.env.NEXT_PUBLIC_SITE_URL ?? "https://mehrtek.example"))}</script>
        <script>{`(() => { const saved = localStorage.getItem("theme"); const dark = saved === "dark" || (!saved && matchMedia("(prefers-color-scheme: dark)").matches); document.documentElement.classList.toggle("dark", dark); })();`}</script>
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
