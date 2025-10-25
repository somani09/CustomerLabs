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
  title: "Vaibhav Somani | Project Template",
  description: "This is a template",

  keywords: [
    "Vaibhav Somani",
    "Vaibhav Somani Portfolio",
    "Vaibhav Somani Projects",
    "React Portfolio",
    "Frontend Developer Projects",
    "Full Stack Developer Showcase",
    "Next.js Projects",
    "Tailwind CSS UI",
    "TypeScript Components",
  ],
  icons: {
    icon: "/favicon.ico",
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
        className={` ${plusJakarta.className} bg-glass/50 relative flex h-max w-full antialiased`}
      >
        <ThemeProvider
          attribute="class" // Uses `class="light"` or `class="dark"`
          defaultTheme="light" // Force light mode by default
          enableSystem={false} // Disable system theme detection
          disableTransitionOnChange
        >
          <main className="bg-glass/50 relative flex h-max w-full antialiased">
            <Sidebar />
            <div className="h-max w-full flex-1">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
