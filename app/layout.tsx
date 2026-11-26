import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeProvider } from "@/components/providers";
import { SmoothScroll } from "@/components/smooth-scroll";
import { siteConfig } from "@/config/site";
import { brandFont } from "@/lib/brand-font";

import "@/styles/fonts.css";
import "@/styles/globals.css";

const ibmPlex = localFont({
  src: [
    {
      path: "../public/og-fonts/ibm-plex-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/og-fonts/ibm-plex-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/og-fonts/ibm-plex-sans-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: {
    default: `Free Animated React Components | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Animation",
    "Interactive",
    "shadcn ui",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "codse",
      url: "https://codse.com",
    },
  ],
  creator: "Codse Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@animata.design",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ibmPlex.variable} ${brandFont.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://assets.animata.design" crossOrigin="anonymous" />
      </head>
      <body className={"min-h-screen bg-background font-sans antialiased"}>
        <SmoothScroll />
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
