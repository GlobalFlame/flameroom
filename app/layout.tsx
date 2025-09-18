import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "Flame Room",
  description: "Global Owners' Luxury Lounge"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.className} ${geistMono.className}`}>
      <body>{children}</body>
    </html>
  );
}
