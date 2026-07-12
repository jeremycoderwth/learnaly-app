import { Geist_Mono, Outfit, Inter } from "next/font/google";

export const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});