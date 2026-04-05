"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Play, SkipBack, SkipForward, Asterisk } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BottomGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const transitionTextRef = useRef<HTMLDivElement>(null);

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

  const handleWhoAmIClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    if (isTransitioning) return;
    setIsTransitioning(true);

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    if (overlayRef.current && transitionTextRef.current) {
        gsap.set(overlayRef.current, {
           display: "block",
           opacity: 1,
           backgroundColor: "#FF6E00",
           clipPath: `circle(0% at ${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px)`
        });

        gsap.set(transitionTextRef.current, {
           display: "flex",
           top: rect.top,
           left: rect.left,
           xPercent: 0,
           yPercent: 0,
           opacity: 1,
           alignItems: 'center'
        });

        const textSpan = transitionTextRef.current.querySelector('span');
        if (textSpan) {
            gsap.set(textSpan, { textContent: "WHO AM I \u2192", opacity: 1 });
        }

        // Animate overlay circle
        gsap.to(overlayRef.current, {
           clipPath: `circle(150% at ${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px)`,
           duration: 1.0,
           ease: "power3.inOut"
        });

        // Animate text moving to center
        gsap.to(transitionTextRef.current, {
           top: "50%",
           left: "50%",
           xPercent: -50,
           yPercent: -50,
           duration: 1.0,
           ease: "power3.inOut",
           onComplete: () => {
              router.push("/who-am-i");
              // hide after delay so next page can mount
              setTimeout(() => {
                 setIsTransitioning(false);
                 if (overlayRef.current && transitionTextRef.current) {
                     gsap.set([overlayRef.current, transitionTextRef.current], { display: "none" });
                 }
              }, 500);
           }
        });
        
        // Mid-way text swap
        if (textSpan) {
            gsap.to(textSpan, {
                opacity: 0,
                duration: 0.2,
                delay: 0.4,
                onComplete: () => {
                    textSpan.textContent = "wHo aM ililililili";
                    gsap.to(textSpan, { opacity: 1, duration: 0.3 });
                }
            });
        }
    }
  };

  return (
    <>
      {/* Transition Overlay */}
      <div ref={overlayRef} className="fixed inset-0 z-[9998] hidden pointer-events-none" />
      <div 
        ref={transitionTextRef} 
        className="fixed z-[9999] hidden pointer-events-none text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-black flex items-center justify-center whitespace-nowrap"
      >
        <span>WHO AM I →</span>
      </div>

      <section ref={containerRef} className="w-full flex flex-col bg-[#EEEEEE] border-t border-gray-300 text-black">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row border-b border-gray-300">
            
            {/* WHO AM I */}
            <div className="flex-1 p-4 md:p-8 border-r border-gray-300 flex items-center">
                <h2 
                  onClick={handleWhoAmIClick}
                  className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter hover:text-accent-orange transition-colors cursor-pointer whitespace-nowrap group"
                >
                  <span className="group-hover:opacity-0 transition-opacity duration-300">WHO AM I <span className="align-middle ml-4">→</span></span>
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
    </>
  );
}
