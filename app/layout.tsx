import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "next-themes";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Vaibhav Somani | Segment Builder Dashboard",
  description:
    "A modern Next.js + TypeScript demo project by Vaibhav Somani featuring an interactive Segment Builder with schema management, local storage, and elegant glassmorphic UI styling.",
  keywords: [
    "Vaibhav Somani",
    "Vaibhav Somani Projects",
    "Segment Builder",
    "Next.js Dashboard",
    "Frontend Developer Portfolio",
    "React UI Components",
    "Tailwind CSS Design",
    "TypeScript Frontend",
    "Glassmorphism UI",
    "Local Storage Demo",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Segment Builder Dashboard | Vaibhav Somani",
    description:
      "Explore a glassmorphic, schema-driven segment builder built with Next.js, TypeScript, and Tailwind CSS.",
    url: "https://customer-labs-test.vercel.app/",
    siteName: "Vaibhav Somani Projects",
    images: [
      {
        url: "/segment_builder.jpeg", // optional OG image
        width: 1200,
        height: 630,
        alt: "Segment Builder Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${plusJakarta.className} relative flex h-max w-full antialiased`}
      >
        <ThemeProvider
          attribute="class" // Uses `class="light"` or `class="dark"`
          defaultTheme="light" // Force light mode by default
          enableSystem={false} // Disable system theme detection
          disableTransitionOnChange
        >
          <main className="relative flex h-max w-full antialiased">
            <Sidebar />
            <div className="h-max w-full flex-1">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
