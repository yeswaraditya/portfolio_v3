import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google"; // Import Space Mono
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguageModal from "@/components/LanguageModal";

const inter = Inter({ subsets: ["latin"] });

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
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
      <body className={`${inter.className} ${spaceMono.variable}`}>
        <LanguageProvider>
          {children}
          <LanguageModal />
        </LanguageProvider>
      </body>
    </html>
  );
}
