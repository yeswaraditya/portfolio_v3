"use client";

import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { translate, openModal } = useLanguage();

  useGSAP(() => {
    // Simple reveal animation for elements
    gsap.from(".hero-element", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full flex-1 min-h-0 flex flex-col justify-center overflow-hidden">
      
      <div className="relative w-full h-full">
        {/* 1. Pink Leaves Box (Left) */}
        <div className="hero-element absolute top-[30%] left-[5%] w-[25vw] h-[8vw] min-w-[250px] min-h-[80px] border border-gray-400 p-1 bg-white flex">
           <div className="w-[60%] h-full relative overflow-hidden">
             <Image src="/pink_leaves.png" alt="Pink leaves" fill className="object-cover" />
           </div>
        </div>

        {/* 2. Purple Leaves Box (Center Top) */}
        <div className="hero-element absolute top-[10%] left-[35%] w-[25vw] h-[8vw] min-w-[250px] min-h-[80px] border border-gray-400 p-1 bg-white flex">
          <div className="w-[60%] h-full relative overflow-hidden">
             <Image src="/violet_leaves.png" alt="Violet leaves" fill className="object-cover" />
           </div>
        </div>

        {/* 3. Black Box (Center) */}
        <div className="hero-element absolute top-[60%] left-[30%] -translate-y-1/2 bg-black p-4 md:p-8 z-20 shadow-xl">
            <div className="text-accent-orange text-[10px] md:text-sm font-mono flex justify-between mb-1">
                <span>{translate("humansDie")}</span>
                <span>DIEEEE</span>
            </div>
            <div className="text-accent-orange text-3xl md:text-6xl font-bold tracking-tighter">
                {translate("art")}
            </div>
            <div className="text-accent-orange text-[10px] md:text-sm font-mono text-center mt-1">
                {translate("artWont")}
            </div>
        </div>

        {/* 4. Portrait Image (Right) */}
        <div className="hero-element absolute top-[15%] right-[5%] w-[25vw] h-[35vw] max-w-[400px] max-h-[500px] border border-gray-400 z-10">
            {/* Crosshairs */}
            <div className="absolute -top-3 -left-3 w-6 h-6 text-gray-400 text-2xl">+</div>
            <div className="absolute -top-3 -right-3 w-6 h-6 text-gray-400 text-2xl">+</div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 text-gray-400 text-2xl">+</div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 text-gray-400 text-2xl">+</div>

            <div className="w-full h-full  relative overflow-hidden">
                 {/* Placeholder for Profile Image */}
                 <div className="absolute inset-0">
                    <Image src="/potrait.png" alt="Profile" fill className="object-cover" /> 
                 </div>
            </div>
        </div>

        {/* 5. Translate Box (Bottom Left) */}
        <div 
          onClick={openModal}
          className="hero-element absolute bottom-0 left-0 w-48 border-r border-t border-gray-400 p-3 bg-[#E0E0E0]/80 backdrop-blur-sm text-black z-30 cursor-pointer hover:bg-white/90 transition-colors"
        >
            <div className="text-[10px] uppercase font-bold text-gray-600 mb-1">{translate("translateHeading")}</div>
            <div className="text-right text-2xl font-mono font-bold">あ乙</div>
        </div>

      </div>

    </section>
  );
}
