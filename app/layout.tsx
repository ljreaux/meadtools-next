import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/ui/Navbar";
import TranslationsProvider from "@/components/TranslationsProvider";

const libre = Libre_Baskerville({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://meadtools.com"),
  title: "MeadTools",
  description: "The all in one mead, wine, and cider making calculator.",
  icons: "/favicon.png",
  openGraph: {
    title: "MeadTools",
    description: "The all in one mead, wine, and cider making calculator.",
    images: "/favicon.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@meadtools",
    title: "MeadTools",
    description: "The all in one mead, wine, and cider making calculator.",
    images: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(libre.className, "bg-secondary")}>
        <TranslationsProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header>
              <Navbar />
            </header>
            {children}
          </ThemeProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
