import "./globals.css";
import { Inter, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import ScrollProgress from "../components/ScrollProgress";
import MotionProvider from "../components/MotionProvider";
import AdminBeyondShortcut from "../components/AdminBeyondShortcut";
import AdminSocialPlatformEnhancer from "../components/AdminSocialPlatformEnhancer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tanvir Hasan — CS Undergraduate",
  description:
    "Portfolio of Tanvir Hasan — Computer Science undergraduate at AIUB focused on networking, distributed systems, and applied computing. Open to internships 2026.",
  keywords: [
    "Tanvir Hasan",
    "AIUB",
    "computer science",
    "networking",
    "distributed systems",
    "portfolio",
    "Bangladesh",
  ],
  metadataBase: new URL("https://tanvirh.vercel.app"),
  alternates: { canonical: "https://tanvirh.vercel.app" },
  authors: [{ name: "Tanvir Hasan", url: "https://tanvirh.vercel.app" }],
  creator: "Tanvir Hasan",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    title: "Tanvir Hasan — CS Undergraduate",
    description: "CS Undergraduate · Networking & Systems · AIUB, Bangladesh",
    type: "website",
    url: "https://tanvirh.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanvir Hasan — CS Undergraduate",
    description: "CS Undergraduate · Networking & Systems · AIUB, Bangladesh",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tanvir Hasan",
  url: "https://tanvirh.vercel.app",
  image: "https://tanvirh.vercel.app/profile.jpg",
  jobTitle: "Computer Science Undergraduate",
  description:
    "Networking & Systems Focused CSE Undergraduate at AIUB, Bangladesh. Future MS Candidate. Open to internships.",
  email: "tanvirhasan.career@gmail.com",
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "American International University-Bangladesh",
    url: "https://www.aiub.edu/",
  },
  knowsAbout: [
    "Computer Networks",
    "Distributed Systems",
    "Python",
    "Linux",
    "Docker",
    "TCP/IP",
    "Cisco Networking",
  ],
  sameAs: [
    "https://linkedin.com/in/thasan05",
    "https://github.com/thasan05",
    "https://www.researchgate.net/profile/Md-Hasan-1149",
    "https://scholar.google.com/citations?hl=en&authuser=6&user=m3SKoUgAAAAJ",
    "https://medium.com/@thasan05",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased text-fg bg-bg selection:bg-accent-soft selection:text-accent">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full focus:bg-accent focus:text-white focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <MotionProvider>
            <ScrollProgress />
            <AdminSocialPlatformEnhancer />
            {children}
            <AdminBeyondShortcut />
          </MotionProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
