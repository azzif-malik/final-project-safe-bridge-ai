import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SafeBridge AI — You're never alone",
  description:
    "SafeBridge AI helps children, teens, and adults safely express difficult experiences, privately journal, learn about abuse awareness, and connect to trusted support — starting with one safe conversation.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[var(--color-bg)] text-[var(--color-text)]`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
