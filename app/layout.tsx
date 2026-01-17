import type { Metadata } from "next";
import "./globals.css";
import GradientMeshBackground from "@/components/GradientMeshBackground";
import BackToTop from "@/components/BackToTop";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Andrea Seidita — Full-Stack Developer",
  description: "Building the future, one line of code at a time",
  keywords: [
    "developer",
    "portfolio",
    "web3",
    "full-stack",
    "design",
    "react",
    "nextjs",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-dark text-white overflow-x-hidden antialiased">
        <GradientMeshBackground />
        <BackToTop />

        <main className="relative z-10">{children}</main>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Font loading optimization
                if ('fonts' in document) {
                  await document.fonts.ready;
                  sessionStorage.setItem('fonts-loaded', 'true');
                }
                
                // Remove loading class
                document.documentElement.classList.remove('loading');
              } catch(e) {
                console.log('Performance optimization:', e);
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
