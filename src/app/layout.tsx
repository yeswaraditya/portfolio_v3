import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { MusicProvider } from "@/context/MusicContext";
import LanguageModal from "@/components/LanguageModal";
import NavigationProgress from "@/components/NavigationProgress";
import CustomCursor from "@/components/CustomCursor";
import SoundEffects from "@/components/SoundEffects";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const roboto = localFont({
  src: [
    {
      path: "./fonts/Roboto-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Roboto-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
});

const cabinetGrotesk = localFont({
  src: [
    {
      path: "./fonts/CabinetGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CabinetGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cabinet",
});

export const metadata: Metadata = {
  title: "Eswar Aditya | Portfolio",
  description: "Portfolio of Eswar Aditya - CSE Student & Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable} ${roboto.variable} ${cabinetGrotesk.variable} font-sans`}>
        <LanguageProvider>
          <MusicProvider>
            <CustomCursor />
            <SoundEffects />
            <NavigationProgress />
            {children}
            <LanguageModal />
          </MusicProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
