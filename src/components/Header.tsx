"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

import { usePathname } from "next/navigation";

import { useMusic } from "../context/MusicContext";
import { Play, Pause } from "lucide-react";

export default function Header() {
  const { translate } = useLanguage();
  const { isPlaying, togglePlay, trackName } = useMusic();
  const pathname = usePathname();
  const isTransparent = pathname === "/who-am-i";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 text-black font-mono text-sm uppercase tracking-wide ${isTransparent ? "bg-transparent" : "bg-[#EEEEEE]"}`}>
      <div className="flex flex-row items-center justify-between w-full h-full">
        {/* Logo & Music Toggle */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold hover:text-accent-orange transition-colors">
            YEA
          </Link>
          
          {/* Mini Player Toggle */}
          <div 
            onClick={togglePlay}
            className="flex items-center gap-2 cursor-pointer group"
            title={isPlaying ? `Playing: ${trackName}` : "Click to play music"}
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              {isPlaying ? (
                <div className="flex gap-[2px] items-end h-3">
                  <div className="w-[2px] bg-black animate-[music-bar_0.8s_ease-in-out_infinite]"></div>
                  <div className="w-[2px] bg-black animate-[music-bar_1.2s_ease-in-out_infinite]"></div>
                  <div className="w-[2px] bg-black animate-[music-bar_0.9s_ease-in-out_infinite]"></div>
                </div>
              ) : (
                <Play size={14} className="fill-black group-hover:scale-110 transition-transform" />
              )}
            </div>
            <span className="text-[10px] hidden sm:inline-block opacity-50 group-hover:opacity-100 transition-opacity">
              {isPlaying ? "LIVE" : "MUSIC"}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-row items-center space-x-8 md:space-x-24">
           <Link href="/#skills" className="hover:text-accent-orange transition-colors inline-block whitespace-nowrap">{translate("skills")}</Link>
           <Link href="/passion-projects" className="hover:text-accent-orange transition-colors inline-block whitespace-nowrap">{translate("passionProjects")}</Link>
           <div className="hidden md:inline-block whitespace-nowrap">{translate("replyTime")}</div>
        </div>
      </div>
    </header>
  );
}
