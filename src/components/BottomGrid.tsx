"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Play, Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function BottomGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
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

    // Marquee animation
    if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
            x: "-50%",
            duration: 20,
            repeat: -1,
            ease: "none",
        });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#EEEEEE] border-t border-gray-300 text-black">
      
      {/* 1. WHO AM I (Large Text) */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 border-r border-gray-300 p-6 flex items-end">
         <h2 className="text-4xl md:text-6xl font-black tracking-tighter hover:text-accent-orange transition-colors cursor-pointer">
            {translate("whoAmI")} <span className="text-2xl align-middle">→</span>
         </h2>
      </div>

      {/* 2. Playlist Widget */}
      <div className="col-span-1 border-r border-gray-300 p-4 flex flex-col justify-between aspect-square md:aspect-auto">
          <div className="flex justify-between items-start">
              <span className="font-mono text-xs uppercase text-gray-500">My Playlist</span>
              <div className="bg-black text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform">
                  <Play size={16} fill="white" />
              </div>
          </div>
          <div>
              <div className="h-1 w-full bg-gray-300 mb-2 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-accent-orange"></div>
              </div>
              <div className="font-bold">Midnight City</div>
              <div className="text-xs text-gray-500">M83</div>
          </div>
      </div>

      {/* 3. Coffee Button */}
      <div className="col-span-1 p-4 flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors cursor-pointer group">
          <div className="text-center">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">☕</div>
              <div className="font-mono text-sm underline decoration-accent-orange underline-offset-4">
                  {translate("coffeeButton")}
              </div>
          </div>
      </div>

      {/* 4. Footer Marquee (Spans full width) */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 border-t border-gray-300 overflow-hidden py-3 bg-black text-white">
          <div ref={marqueeRef} className="whitespace-nowrap flex gap-8 items-center text-sm font-mono uppercase tracking-widest">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8">
                        <span>{translate("notLazy")}</span>
                        <Star size={12} className="text-accent-orange animate-spin-slow" />
                    </div>
                ))}
          </div>
      </div>

    </section>
  );
}
