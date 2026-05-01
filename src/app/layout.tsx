import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Omni-school - منصة التعليم",
  description: "منصة تعليمية متكاملة لإدارة التعلم والتعليم الإلكتروني - مستوحاة من أفضل المنصات العالمية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="antialiased bg-[#F8FAFB] text-[#1A2332]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
