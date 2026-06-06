"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** 2 × 2 grid of bright-green squares */
function GreenDots({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`grid grid-cols-2 flex-shrink-0 ${className}`}
      style={{ gap: 5, width: size * 2 + 5, height: size * 2 + 5 }}
    >
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          style={{ width: size, height: size, backgroundColor: "#B4FF00" }}
        />
      ))}
    </div>
  );
}

function Photo({
  src,
  alt,
  w,
  h,
  rotate = 0,
  className = "",
  style = {},
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden ${className}`}
      style={{ width: w, height: h, transform: `rotate(${rotate}deg)`, ...style }}
    >
      <Image src={src} alt={alt} fill className="object-cover" unoptimized />
    </div>
  );
}

export default function WhoAmIContent() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".wai-title", {
      y: 30, opacity: 0, duration: 1, ease: "power2.out", delay: 0.3,
    });
    const blocks = gsap.utils.toArray<HTMLElement>(".wai-block");
    blocks.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 92%" },
        y: 30, opacity: 0, duration: 0.7, ease: "power2.out",
      });
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="w-full pt-28 md:pt-32 pb-48 font-mono text-black select-none">

      {/* ── TITLE ──────────────────────────────────────── */}
      <div className="wai-title px-6 md:px-16 mb-14 md:mb-20 text-center">
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          style={{ fontFamily: "system-ui,-apple-system,sans-serif" }}
        >
          wHo aM&nbsp;&nbsp;ililililili
        </h1>
        <div className="flex justify-between uppercase text-[10px] md:text-xs mt-3 font-bold px-1">
          <span>Day-1</span>
          <span className="flex-1 mx-2 flex items-center">
            <span className="flex-1 border-t border-black/40 mt-0.5" />
          </span>
          <span>Today</span>
        </div>
      </div>

      {/* ── ROW 1 · baby photo | birth text | green dots ── */}
      <div className="wai-block flex items-start justify-between px-6 md:px-16 mb-12 md:mb-16">

        {/* Left: baby */}
        <Photo src="/about/baby.jpg" alt="Day 1" w={100} h={100} rotate={-2} />

        {/* Center: birth text */}
        <p className="text-[10px] md:text-xs tracking-wide leading-relaxed mt-2 mx-4 max-w-[200px]">
          I was born in Khammam,<br />Telangana on 15/06/2004
        </p>

        {/* Right: green dots */}
        <GreenDots size={26} />
      </div>

      {/* ── ROW 2 · green dots | birth text | suit photo | Day-2 label ── */}
      <div className="wai-block flex items-start justify-between px-6 md:px-16 mb-14 md:mb-20">

        {/* Left: green dots */}
        <GreenDots size={30} />

        {/* Center: text */}
        <p className="text-[10px] md:text-xs tracking-wide leading-relaxed mx-4 max-w-[160px] mt-1">
          I was born in Khammam,<br />Telangana on 15/06/2004
        </p>

        {/* Right: suit photo */}
        <Photo src="/about/childhood-suit.jpg" alt="Childhood" w={90} h={130} rotate={1} />

        {/* Far right: label */}
        <span className="text-[10px] font-bold uppercase tracking-widest ml-3 mt-1 whitespace-nowrap">
          Day - 2
        </span>
      </div>

      {/* ── ROW 3 · three scattered childhood photos ── */}
      <div className="wai-block relative px-6 md:px-16 mb-16 md:mb-24" style={{ height: 220 }}>
        <Photo
          src="/about/childhood-wall-2.jpg"
          alt="Childhood event"
          w={120} h={160}
          rotate={-3}
          className="absolute"
          style={{ left: 24, bottom: 0 }}
        />
        <Photo
          src="/about/childhood-wall-1.jpg"
          alt="Childhood event"
          w={100} h={140}
          rotate={2}
          className="absolute"
          style={{ left: 110, top: 10 }}
        />
        <Photo
          src="/about/childhood-wall-3.jpg"
          alt="Childhood event"
          w={80} h={110}
          rotate={-1}
          className="absolute"
          style={{ left: 190, bottom: 20 }}
        />
      </div>

      {/* ── ROW 4 · childhood faces ── */}
      <div className="wai-block flex items-end justify-between px-6 md:px-16 mb-16 md:mb-24">
        <div className="flex flex-col gap-2">
          <Photo src="/about/childhood-face-1.jpg" alt="Portrait" w={130} h={100} rotate={-1} />
          <Photo src="/about/childhood-face-2.jpg" alt="Portrait smiling" w={130} h={100} rotate={1} />
        </div>
        <GreenDots size={24} className="mb-4" />
      </div>

      {/* ── ROW 5 · speaking + workshop ── */}
      <div className="wai-block flex items-end justify-between px-6 md:px-16 mb-16 md:mb-24">
        <div className="flex flex-col gap-1">
          <Photo src="/about/speaking.jpg" alt="Speaking at institute" w={120} h={160} rotate={-2} />
          <span className="text-[8px] uppercase tracking-widest text-black/40 max-w-[120px]">
            Sri Siddhartha Institute
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <Photo src="/about/figma-workshop-1.jpg" alt="Figma workshop" w={190} h={150} rotate={1} />
          <span className="text-[8px] uppercase tracking-widest text-black/40 text-right">
            Figma &amp; UI Workshop
          </span>
        </div>
      </div>

      {/* ── ROW 6 · Notion club ── */}
      <div className="wai-block flex items-center justify-between px-6 md:px-16 mb-16 md:mb-24">
        <div className="flex flex-col gap-1">
          <Photo src="/about/notion-club.jpg" alt="Notion club" w={210} h={165} rotate={-1} />
          <span className="text-[8px] uppercase tracking-widest text-black/40">
            Notion Campus Club
          </span>
        </div>
        <GreenDots size={26} className="self-end mb-6" />
      </div>

      {/* ── ROW 7 · Google Developer Groups ── */}
      <div className="wai-block flex justify-center px-6 md:px-16 mb-16 md:mb-24">
        <div className="flex flex-col gap-1 items-center">
          <Photo src="/about/google-dev.jpg" alt="Google Developer Groups" w={290} h={200} rotate={0} />
          <span className="text-[8px] uppercase tracking-widest text-black/40">
            Google Developer Groups
          </span>
        </div>
      </div>

      {/* ── ROW 8 · MUSIC N WORK ── */}
      <div className="wai-block flex justify-center px-6 md:px-16">
        <Photo src="/about/flow-work.gif" alt="MUSIC N WORK" w={200} h={268} rotate={0} />
      </div>

    </div>
  );
}
