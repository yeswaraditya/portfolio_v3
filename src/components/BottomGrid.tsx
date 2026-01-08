"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Play, SkipBack, SkipForward, Asterisk } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function BottomGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { translate } = useLanguage();

  useGSAP(() => {
    // Reveal animation
    gsap.from(containerRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full flex flex-col bg-[#EEEEEE] border-t border-gray-300 text-black">
      
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row border-b border-gray-300">
          
          {/* WHO AM I */}
          <div className="flex-1 p-4 md:p-8 border-r border-gray-300 flex items-center">
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter hover:text-accent-orange transition-colors cursor-pointer whitespace-nowrap">
                WHO AM I <span className="align-middle ml-4">→</span>
              </h2>
          </div>

          {/* Right Column */}
          <div className="lg:w-[450px] flex flex-col flex-shrink-0">
              {/* Playlist Widget */}
              <div className="flex-1 p-4 border-b border-gray-300 flex items-center justify-between bg-[#F0F0F0]">
                  {/* Blue Pills Graphic Placeholder */}
                  <div className="grid grid-cols-3 gap-1">
                      {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-8 h-4 bg-blue-600 rounded-full relative overflow-hidden">
                             {/* Mimic image opacity/texture if needed, distinct blue look */}
                             <div className="absolute inset-0 bg-black/10"></div>
                          </div>
                      ))}
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end gap-1">
                      <span className="font-mono text-xs font-bold">My Latest Playlist</span>
                      <div className="flex items-center gap-3 mt-1">
                          <SkipBack size={20} className="fill-black cursor-pointer" />
                          <Play size={20} className="fill-black cursor-pointer" />
                          <SkipForward size={20} className="fill-black cursor-pointer" />
                      </div>
                  </div>
              </div>

              {/* Coffee Section */}
              <div className="h-16 flex items-center justify-center p-4 cursor-pointer hover:bg-white transition-colors">
                  <span className="font-mono text-xs md:text-sm tracking-wider">Let&apos;s have a coffee together!</span>
              </div>
          </div>
      </div>

      {/* Bottom Ticker */}
      <div className="w-full p-4 md:p-6 flex items-center justify-between overflow-hidden">
          <div className="text-xl md:text-4xl font-medium tracking-tight uppercase flex items-center gap-4 whitespace-nowrap">
              <span>YOU ARE NOT LAZY</span>
              <div className="w-12 h-0.5 bg-black"></div>
              <span>JUST CREATIVE</span>
          </div>
          <Asterisk size={40} className="text-black animate-spin-slow flex-shrink-0" />
      </div>

    </section>
  );
}
