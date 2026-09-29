"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";

function CropMark({ className }: { className: string }) {
  return (
    <span className={`pointer-events-none absolute z-20 h-3.5 w-3.5 ${className}`} aria-hidden>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-black" />
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { translate } = useLanguage();

  useGSAP(() => {
    gsap.from(".hero-element", {
      y: 28,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
    });

    gsap.from(".leaf-wrapper-violet", {
      xPercent: -100,
      duration: 1.2,
      ease: "power3.inOut",
      delay: 0.35,
    });

    gsap.from(".leaf-wrapper-pink", {
      xPercent: 100,
      duration: 1.2,
      ease: "power3.inOut",
      delay: 0.35,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-0 w-full flex-1 overflow-hidden">
      <div className="hero-element absolute left-[3%] top-[28%] h-[88px] w-[min(30vw,360px)] border border-neutral-400 bg-white md:top-[30%] md:h-[104px]">
        <div className="leaf-wrapper-pink relative h-full w-1/2 overflow-hidden">
          <Image src="/pink_leaves.png" alt="" fill className="object-cover" />
        </div>
      </div>

      <div className="hero-element absolute left-[34%] top-[10%] flex h-[88px] w-[min(30vw,360px)] justify-end border border-neutral-400 bg-white md:top-[12%] md:h-[104px]">
        <div className="leaf-wrapper-violet relative h-full w-1/2 overflow-hidden">
          <Image src="/violet_leaves.png" alt="" fill className="object-cover" />
        </div>
      </div>

      <div className="hero-element absolute left-[26%] top-[34%] z-20 w-[min(28vw,320px)] bg-black px-5 py-4 text-[#FF4D00] md:top-[36%] md:px-6 md:py-5">
        <div
          className="mb-5 flex justify-between text-[11px] font-bold md:mb-8 md:text-sm"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          <span>{translate("humansDie")}</span>
          <span>DIEEEE</span>
        </div>
        <div className="text-center">
          <div
            className="text-5xl font-bold leading-none tracking-tighter md:text-7xl"
            style={{ fontFamily: "var(--font-cabinet)" }}
          >
            {translate("art")}
          </div>
          <div
            className="mt-1 text-sm font-bold tracking-[0.18em] md:text-lg"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            {translate("artWont")}
          </div>
        </div>
      </div>

      <div className="hero-element absolute right-[4%] top-[8%] aspect-square w-[min(28vw,300px)] border border-neutral-400 md:top-[6%]">
        <CropMark className="-left-2 -top-2" />
        <CropMark className="-right-2 -top-2" />
        <CropMark className="-bottom-2 -left-2" />
        <CropMark className="-bottom-2 -right-2" />
        <Image
          src="/potrait.png"
          alt="Portrait"
          fill
          className="object-cover object-top"
          priority
        />
      </div>
    </section>
  );
}
