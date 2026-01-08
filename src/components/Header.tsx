"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const { translate } = useLanguage();

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-transparent text-black font-mono text-sm uppercase tracking-wide">
      {/* Logo */}
      <Link href="/" className="font-bold hover:text-accent-orange transition-colors">
        YEA
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-8 md:gap-24">
         <Link href="#skills" className="hover:text-accent-orange transition-colors">{translate("skills")}</Link>
         <Link href="#passion-projects" className="hover:text-accent-orange transition-colors">{translate("passionProjects")}</Link>
         <div className="hidden md:block">{translate("replyTime")}</div>
      </nav>
    </header>
  );
}
