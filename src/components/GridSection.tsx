"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GridSection() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColTopRef = useRef<HTMLDivElement>(null);
  const rightColBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Left Column (Name) Animation
    gsap.from(leftColRef.current, {
      scrollTrigger: {
        trigger: leftColRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // 2. Right Column (Roles) Animation - Staggered
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(rightColTopRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    })
    .from(rightColBottomRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full border-t border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Column: Name */}
        <div ref={leftColRef} className="border-r border-white/20 p-12 md:p-24 flex items-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none">
            I&apos;m <br />
            Eswar Aditya
          </h1>
        </div>

        {/* Right Column: Roles */}
        <div className="flex flex-col">
          {/* Top Row */}
          <div ref={rightColTopRef} className="border-b border-white/20 p-12 md:p-24 flex items-center justify-center md:items-start md:justify-start h-1/2">
            <h2 className="text-xl md:text-2xl font-mono">UI/UX Designer</h2>
          </div>
          
          {/* Bottom Row */}
          <div ref={rightColBottomRef} className="p-12 md:p-24 flex items-center justify-center md:items-start md:justify-start h-1/2">
            <h2 className="text-xl md:text-2xl font-mono">Developer</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
