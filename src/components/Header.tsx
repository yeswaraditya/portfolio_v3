"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

import { usePathname } from "next/navigation";

export default function Header() {
  const { translate } = useLanguage();
  const pathname = usePathname();
  const isTransparent = pathname === "/who-am-i";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 text-black font-mono text-sm uppercase tracking-wide ${isTransparent ? "bg-transparent" : "bg-[#EEEEEE]"}`}>
      <div className="flex flex-row items-center justify-between w-full h-full">
        {/* Logo */}
        <Link href="/" className="font-bold hover:text-accent-orange transition-colors">
          YEA
        </Link>

        {/* Navigation */}
        <div className="flex flex-row items-center space-x-8 md:space-x-24">
           <Link href="#skills" className="hover:text-accent-orange transition-colors inline-block whitespace-nowrap">{translate("skills")}</Link>
           <Link href="/passion-projects" className="hover:text-accent-orange transition-colors inline-block whitespace-nowrap">{translate("passionProjects")}</Link>
           <div className="hidden md:inline-block whitespace-nowrap">{translate("replyTime")}</div>
        </div>
      </div>
    </header>
  );
}
