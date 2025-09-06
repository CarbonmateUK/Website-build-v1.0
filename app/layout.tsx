import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Carbonmate — SECR & PPN 06/21 compliance for SMEs",
  description: "Upload your activity data and generate audit-ready SECR & PPN 06/21 reports.",
  openGraph: {
    title: "Carbonmate — SECR & PPN 06/21 compliance for SMEs",
    description: "Upload your activity data and generate audit-ready SECR & PPN 06/21 reports.",
    url: "https://carbon-saas.vercel.app",
    siteName: "Carbonmate",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Carbonmate preview" }],
    locale: "en_GB",
    type: "website",
  },
  metadataBase: new URL("https://carbon-saas.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}