import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageTransition } from "@/components/scroll/PageTransition";
import { site } from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "SITEWYRE — Digital Experiences Engineered to Perform",
    template: "%s — SITEWYRE",
  },
  description: site.description,
  keywords: ["WordPress development", "Next.js development", "web design", "WooCommerce", "performance optimization"],
  openGraph: {
    type: "website",
    url: site.domain,
    siteName: site.name,
    title: "SITEWYRE — Digital Experiences Engineered to Perform",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "SITEWYRE — Digital Experiences Engineered to Perform",
    description: site.description,
  },
  alternates: {
    canonical: site.domain,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-accent px-4 py-2 font-mono text-label text-accent-fg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
