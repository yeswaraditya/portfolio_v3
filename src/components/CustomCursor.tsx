"use client";

import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import Image from "next/image";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Aggressively hide the default cursor everywhere
    // const style = document.createElement("style");
    // style.innerHTML = `
    //   * {
    //     cursor: none !important;
    //   }
    //   html, body {
    //     cursor: none !important;
    //   }
    // `;
    // document.head.appendChild(style);

    // const cursor = cursorRef.current;
    // if (!cursor) return;

    // // Set hotspot offset once — adjust these to align fingertip with click point.
    // // xPercent/yPercent shift the element by % of its own size, persisting across GSAP x/y updates.
    // // Positive xPercent shifts right, negative shifts left (same for y).
    // gsap.set(cursor, { xPercent: -30, yPercent: -10 });

    // const moveCursor = (e: MouseEvent) => {
    //   gsap.to(cursor, {
    //     x: e.clientX,
    //     y: e.clientY,
    //     duration: 0.1,
    //     ease: "power2.out",
    //   });
    // };

    // window.addEventListener("mousemove", moveCursor);

    // return () => {
    //   window.removeEventListener("mousemove", moveCursor);
    //   if (document.head.contains(style)) {
    //     document.head.removeChild(style);
    //   }
    // };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-24 h-24 pointer-events-none z-[999999]"
    >
      <div className="relative w-full h-full">
        {/* <Image 
            src="/finger.png" 
            alt="Cursor Finger" 
            fill
            className="object-contain"
            priority
          /> */}
      </div>
    </div>
  );
}
