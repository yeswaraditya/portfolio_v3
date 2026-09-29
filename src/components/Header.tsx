"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

import { usePathname } from "next/navigation";

import { useMusic } from "../context/MusicContext";
import { Play, Pause } from "lucide-react";

export default function Header() {
  const { translate } = useLanguage();
  const { isPlaying, togglePlay, trackName } = useMusic();
  const pathname = usePathname();
  const isSkills = pathname === "/skills";
  const isAbout = pathname === "/who-am-i";
  const [skillsScrolled, setSkillsScrolled] = useState(false);

  useEffect(() => {
    if (!isSkills) return;

    const onScroll = () => {
      setSkillsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isSkills]);

  const isTransparent =
    pathname === "/coffee" || (isSkills && !skillsScrolled);
  const miniLabel = isPlaying ? translate("headerLive") : translate("headerMusic");
  const isHome = pathname === "/";
  const ink = isSkills ? "text-white" : "text-black";
  const mark = isSkills ? "bg-white" : "bg-black";
  const playFill = isSkills ? "fill-white" : "fill-black";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 ${ink} text-sm ${isHome ? "tracking-wide" : "uppercase tracking-wide"} transition-colors duration-300 ${isAbout ? "bg-accent-orange" : isSkills && skillsScrolled ? "bg-[#0055FF]/90 backdrop-blur-md" : isTransparent ? "bg-transparent" : "bg-[#EEEEEE]"}`} style={{ fontFamily: "var(--font-roboto)" }}>
      <div className="flex flex-row items-center justify-between w-full h-full">
        {/* Logo & Music Toggle */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold hover:text-accent-orange transition-colors">
            YEA
          </Link>
          
          <div 
            onClick={togglePlay}
            className={`flex items-center gap-2 cursor-pointer group ${isHome ? "hidden" : ""}`}
            title={isPlaying ? `Playing: ${trackName}` : "Click to play music"}
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              {isPlaying ? (
                <div className="flex gap-[2px] items-end h-3">
                  <div className={`w-[2px] ${mark} animate-[music-bar_0.8s_ease-in-out_infinite]`}></div>
                  <div className={`w-[2px] ${mark} animate-[music-bar_1.2s_ease-in-out_infinite]`}></div>
                  <div className={`w-[2px] ${mark} animate-[music-bar_0.9s_ease-in-out_infinite]`}></div>
                </div>
              ) : (
                <Play size={14} className={`${playFill} group-hover:scale-110 transition-transform`} />
              )}
            </div>
            <span className="text-[10px] hidden sm:inline-block opacity-50 group-hover:opacity-100 transition-opacity">
              {miniLabel}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-row items-center space-x-5 md:space-x-12 lg:space-x-16">
           <Link href="/skills" className="hover:text-accent-orange transition-colors inline-block whitespace-nowrap">{translate("skills")}</Link>
           <Link href="/passion-projects" className="hover:text-accent-orange transition-colors inline-block whitespace-nowrap">{translate("passionProjects")}</Link>
           <Link href="/planets" className="hover:text-accent-orange transition-colors inline-block whitespace-nowrap">{translate("myPlanets")}</Link>
           <Link href="/coffee" className="hover:text-accent-orange transition-colors hidden md:inline-block whitespace-nowrap">{translate("replyTime")}</Link>
        </div>
      </div>
    </header>
  );
}
