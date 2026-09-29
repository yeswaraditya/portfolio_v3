"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [showTransition, setShowTransition] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip loading transition on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let animTimeout: ReturnType<typeof setTimeout>;
    let safetyTimeout: ReturnType<typeof setTimeout>;

    setShowTransition(true);

    // Wait for React to mount the overlay transition DOM node
    animTimeout = setTimeout(() => {
      if (!fillRef.current || !overlayRef.current) {
        setShowTransition(false);
        return;
      }

      gsap.fromTo(
        fillRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            if (!overlayRef.current) {
              setShowTransition(false);
              return;
            }
            gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 0.25,
              ease: "power2.out",
              onComplete: () => {
                setShowTransition(false);
                if (overlayRef.current) {
                  gsap.set(overlayRef.current, { opacity: 1 });
                }
              },
            });
          },
        }
      );
    }, 40);

    // Safety fallback: ensure transition is always removed after 900ms max
    safetyTimeout = setTimeout(() => {
      setShowTransition(false);
    }, 900);

    return () => {
      clearTimeout(animTimeout);
      clearTimeout(safetyTimeout);
    };
  }, [pathname]);

  if (!showTransition || pathname === "/who-am-i") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-[#EEEEEE] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="w-full max-w-5xl px-6 md:px-16 flex flex-col">
        <span className="font-bold text-2xl md:text-3xl mb-2 text-black ml-1 uppercase">YEA</span>
        <div className="w-full h-32 md:h-48 border border-black overflow-hidden relative bg-[#EEEEEE]">
          <div
            ref={fillRef}
            className="h-full overflow-hidden whitespace-nowrap flex bg-[#EEEEEE] border-r border-black/20"
            style={{ width: "0%" }}
          >
            {[...Array(12)].map((_, i) => (
              <div key={i} className="relative h-full aspect-square flex-shrink-0">
                <Image
                  src="/loading_image.png"
                  alt="Loading frame"
                  fill
                  className="object-contain scale-90"
                  unoptimized
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
