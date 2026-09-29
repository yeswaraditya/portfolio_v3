"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Asterisk } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMusic } from "@/context/MusicContext";
import { useLanguage } from "../context/LanguageContext";

export default function BottomGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const transitionTextRef = useRef<HTMLDivElement>(null);

  const { translate, openModal } = useLanguage();

  const pillFaces = [
    "/about/childhood-face-1.jpg",
    "/about/childhood-face-2.jpg",
    "/about/speaking.jpg",
    "/about/baby.jpg",
    "/about/childhood-suit.jpg",
    "/potrait.png",
  ];
  const { isPlaying, currentTrackIndex, playlist, togglePlay, playNext, playPrev } = useMusic();

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
            gsap.set(textSpan, { textContent: `${translate("whoAmI")} \u2192`, opacity: 1 });
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
        <span>{translate("whoAmI")} →</span>
      </div>

      <section ref={containerRef} className="w-full border-t border-neutral-300 bg-[#EEEEEE] text-black">
        <div className="grid border-b border-neutral-300 lg:grid-cols-[168px_minmax(0,1fr)_minmax(300px,420px)]">
            <button
              type="button"
              onClick={openModal}
              className="flex items-end justify-between gap-3 border-b border-neutral-300 px-3 py-3 text-left hover:bg-white lg:border-b-0 lg:border-r"
            >
                <span className="max-w-[9ch] text-[10px] font-bold uppercase leading-tight tracking-wide">
                  {translate("translateHeading")}
                </span>
                <span className="font-mono text-xl font-bold leading-none">あ乙</span>
            </button>

            <div className="flex items-center border-b border-neutral-300 px-3 py-2 md:px-5 lg:border-b-0 lg:border-r">
                <h2
                  onClick={handleWhoAmIClick}
                  className="cursor-pointer whitespace-nowrap text-[clamp(2.6rem,6.4vw,6.4rem)] font-bold leading-[0.85] tracking-[-0.05em] transition-colors hover:text-accent-orange"
                  style={{ fontFamily: "var(--font-cabinet)" }}
                >
                  {translate("whoAmI")} <span className="ml-2">→</span>
                </h2>
            </div>

            <div className="flex flex-col">
                <div className="flex items-center justify-between gap-4 border-b border-neutral-300 px-4 py-3">
                    <div className="grid grid-cols-3 gap-1.5">
                        {playlist.map((_, i) => (
                            <div
                                key={i}
                                className={`relative h-5 w-10 overflow-hidden rounded-full bg-[#0055FF] ${
                                    i === currentTrackIndex ? "ring-2 ring-black" : ""
                                }`}
                            >
                               <Image
                                 src={pillFaces[i] ?? "/potrait.png"}
                                 alt=""
                                 fill
                                 className="object-cover grayscale"
                               />
                            </div>
                        ))}
                    </div>

                    <div className="h-10 w-px bg-neutral-300" />

                    <div className="flex min-w-[132px] flex-col items-end gap-1">
                        <span className="text-[13px]">My Latest Playlist</span>
                        <div className="flex items-center gap-3">
                            <SkipBack
                                size={16}
                                className="cursor-pointer fill-black"
                                onClick={playPrev}
                            />
                            <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                                {isPlaying ? (
                                    <Pause size={16} className="fill-black" />
                                ) : (
                                    <Play size={16} className="fill-black" />
                                )}
                            </button>
                            <SkipForward
                                size={16}
                                className="cursor-pointer fill-black"
                                onClick={playNext}
                            />
                        </div>
                    </div>
                </div>

                <button
                  type="button"
                  className="flex h-14 items-center justify-center px-4 text-sm hover:bg-white"
                  onClick={() => router.push("/coffee")}
                >
                    {translate("coffeeButton")}
                </button>
            </div>
        </div>

        <div className="flex items-center justify-between gap-4 overflow-hidden px-4 py-4 md:px-6">
            <div
              className="flex items-center gap-4 whitespace-nowrap text-[clamp(1.15rem,2.6vw,2.35rem)] font-bold uppercase tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-cabinet)" }}
            >
                <span>{translate("notLazy")}</span>
                <span className="inline-block h-[2px] w-14 bg-black" />
                <span>{translate("justCreative")}</span>
            </div>
            <Asterisk size={34} className="flex-shrink-0 animate-spin-slow text-black" />
        </div>
      </section>
    </>
  );
}
