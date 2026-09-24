"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";

export default function FlashbackContent() {
  const ref = useRef<HTMLDivElement>(null);
  const { translate } = useLanguage();

  useGSAP(() => {
    gsap.from(".flash-element", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.2,
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="w-full pt-32 md:pt-40 px-6 md:px-12 pb-24">
      <p className="flash-element font-mono text-[10px] md:text-sm uppercase tracking-widest opacity-60 mb-4">
        {translate("flashback")}
      </p>
      <h1 className="flash-element text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-16">
        FLASHBACK
      </h1>

      <div className="border-t border-gray-300">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="flash-element flex items-center justify-between border-b border-gray-300 py-8"
          >
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-50">
              {String(n).padStart(2, "0")}
            </span>
            <span className="text-2xl md:text-4xl font-bold tracking-tight">
              {translate("flashPlaceholder", { n })}
            </span>
            <span className="w-8 h-8 border border-black/20" />
          </div>
        ))}
      </div>
    </div>
  );
}