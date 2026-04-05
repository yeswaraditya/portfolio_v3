"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function UpdatesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax or simple reveal animation
    const elements = gsap.utils.toArray(".update-block") as HTMLElement[];
    elements.forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: i * 0.1
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-[80vh] bg-[#EEEEEE] text-black overflow-hidden flex flex-col py-16 md:py-32">
      
      {/* Title */}
      <div className="w-full flex justify-end px-6 md:px-12 mb-20 md:mb-32">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase">
          UPDATES...
        </h2>
      </div>

      <div className="w-full flex flex-col gap-32 md:gap-40 px-8 md:px-32">
        
        {/* Left Block */}
        <div className="update-block w-full flex items-end self-start md:ml-12 mt-4 md:mt-12">
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border border-black overflow-hidden">
            <Image 
              src="/leaves.png" 
              alt="Green Leaves Placeholder" 
              fill 
              className="object-cover" 
              unoptimized
            />
          </div>
          <p className="font-mono text-[10px] md:text-sm tracking-wide leading-relaxed text-black max-w-[380px] ml-8 md:ml-20">
            I am currently studying Cybersecurity<br/>
            in Destination.I am currently studying<br/>
            Cybersecurity in Destination.
          </p>
        </div>

        {/* Right Block */}
        <div className="update-block w-full flex justify-end items-start self-end mt-24 md:mt-40 mb-20 md:mr-12">
          <p className="font-mono text-[10px] md:text-sm tracking-wide leading-relaxed text-black max-w-[280px] mr-8 md:mr-12 mt-16 md:mt-32">
            I am currently studying Cybersecurity in Destination.I am currently studying Cybersecurity in Destination.
          </p>
          <div className="relative w-24 h-20 md:w-48 md:h-32 flex-shrink-0 border border-black overflow-hidden">
             <Image 
              src="/leaves.png" 
              alt="Green Leaves Placeholder" 
              fill 
              className="object-cover" 
              unoptimized
            />
          </div>
        </div>

      </div>
    </section>
  );
}
