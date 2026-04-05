"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function WhoAmIContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Staggered fade in text
    gsap.from(".who-am-i-element", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.3
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full font-mono text-black overflow-hidden pointer-events-none">
      
      {/* Center Layout Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] flex flex-col items-center pointer-events-auto">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight whitespace-nowrap who-am-i-element" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
          wHo aM  ililililili
        </h1>
        <div className="w-full flex justify-between uppercase text-xs md:text-sm mt-4 md:mt-6 font-bold who-am-i-element px-2">
           <span>Day-1</span>
           <span>Today</span>
        </div>
      </div>

      {/* Bottom Layout Container (Image placeholder + description) */}
      <div className="absolute top-[60%] w-full pl-6 md:pl-20 lg:pl-32 pr-6 flex flex-row items-start pointer-events-auto">
         
         {/* Far Left Day-1 Text */}
         <div className="w-[15%] hidden md:block who-am-i-element mt-10">
            <span className="uppercase text-xs md:text-xl font-bold tracking-widest whitespace-nowrap">Day - 1</span>
         </div>

         {/* Gray Box */}
         <div className="w-[200px] h-[250px] md:w-[280px] md:h-[350px] bg-[#D9D9D9] flex flex-col justify-between p-4 flex-shrink-0 who-am-i-element shadow-sm mx-4 md:mx-0">
            <div className="flex-1 flex justify-center items-center">
              <span className="font-bold text-sm md:text-base">Not Found</span>
            </div>
            <span className="text-[10px] md:text-xs uppercase font-bold text-black/70 tracking-widest">Father didn&apos;t have camera</span>
         </div>

         {/* Born Text */}
         <div className="who-am-i-element mt-10 ml-6 md:ml-12 lg:ml-20">
            <p className="font-bold text-sm md:text-lg max-w-[320px] leading-relaxed">
              I was born in Khammam, Telangana on 15/06/2004
            </p>
         </div>

      </div>

    </div>
  );
}
