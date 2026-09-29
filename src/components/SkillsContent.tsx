"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SkillsCatalog from "./SkillsCatalog";

const ASSETS = {
  marquee: "/skills-design/marquee.svg",
  portrait: "/skills-design/portrait.svg",
  halo: "/skills-design/halo.svg",
  gradCap: "/skills-design/grad-cap.svg",
  eyes: "/skills-design/eyes.svg",
  peaceHand: "/skills-design/peace-hand.svg",
};

function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" fill="none" className={className} aria-hidden>
      <path
        d="M8 6C14 14 10 22 18 28C26 34 22 40 30 44"
        stroke="#FFE600"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 4C22 12 16 20 24 26"
        stroke="#FFE600"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

export default function SkillsContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".skills-marquee-wrap", {
        opacity: 0,
        duration: 0.9,
      })
        .from(
          ".skills-portrait",
          {
            y: 40,
            opacity: 0,
            scale: 0.94,
            duration: 0.95,
          },
          "-=0.65"
        )
        .from(
          ".skills-sticker",
          {
            scale: 0,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(2)",
          },
          "-=0.55"
        )
        .from(
          ".skills-squiggle",
          {
            scale: 0,
            opacity: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "back.out(2.5)",
          },
          "-=0.4"
        );

      gsap.to(".skills-sticker-cap", {
        y: -12,
        rotation: -6,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".skills-sticker-eyes", {
        y: 10,
        rotation: 5,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.35,
      });

      gsap.to(".skills-sticker-peace", {
        y: -8,
        rotation: -4,
        duration: 3.1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.7,
      });

      gsap.to(".skills-squiggle", {
        y: "+=8",
        rotation: "+=8",
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.25,
      });
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const layers = stage.querySelectorAll<HTMLElement>("[data-depth]");

      const onMove = (event: MouseEvent) => {
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        layers.forEach((layer) => {
          const depth = Number(layer.dataset.depth || 0);
          gsap.to(layer, {
            x: x * depth * 24,
            y: y * depth * 14,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      const onLeave = () => {
        layers.forEach((layer) => {
          gsap.to(layer, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        });
      };

      stage.addEventListener("mousemove", onMove);
      stage.addEventListener("mouseleave", onLeave);

      return () => {
        stage.removeEventListener("mousemove", onMove);
        stage.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: rootRef }
  );

  return (
    <>
    <div
      ref={rootRef}
      className="relative z-0 h-svh w-full overflow-hidden text-white"
      style={{
        backgroundColor: "#0055FF",
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.95) 1.15px, transparent 1.2px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div ref={stageRef} className="absolute inset-0">
        <div
          data-depth="0.85"
          className="skills-portrait pointer-events-none absolute bottom-[-2%] left-1/2 z-20 h-[92%] w-[min(62vw,760px)] -translate-x-1/2"
        >
          <div className="skills-halo absolute left-1/2 top-[-2%] z-0 w-[148%] -translate-x-1/2">
            <Image
              src={ASSETS.halo}
              alt=""
              width={1204}
              height={830}
              className="h-auto w-full"
              priority
            />
          </div>
          <Image
            src={ASSETS.portrait}
            alt="Portrait"
            fill
            className="z-10 object-contain object-bottom"
            sizes="(max-width: 768px) 88vw, 760px"
            priority
          />
        </div>

        <div
          data-depth="1.35"
          className="skills-sticker skills-sticker-cap pointer-events-none absolute left-[4%] top-[14%] z-30 w-[min(20vw,230px)] md:left-[7%] md:top-[16%]"
        >
          <Image
            src={ASSETS.gradCap}
            alt=""
            width={473}
            height={575}
            className="h-auto w-full -rotate-6 drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)]"
            priority
          />
        </div>

        <div
          data-depth="1.45"
          className="skills-sticker skills-sticker-eyes pointer-events-none absolute right-[5%] top-[5%] z-30 w-[min(15vw,170px)] md:right-[8%] md:top-[7%]"
        >
          <Image
            src={ASSETS.eyes}
            alt=""
            width={205}
            height={209}
            className="h-auto w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
            priority
          />
        </div>

        <div
          data-depth="1.55"
          className="skills-sticker skills-sticker-peace pointer-events-none absolute right-[3%] bottom-[16%] z-30 w-[min(18vw,210px)] md:right-[6%] md:bottom-[18%]"
        >
          <Image
            src={ASSETS.peaceHand}
            alt=""
            width={342}
            height={376}
            className="h-auto w-full rotate-6 drop-shadow-[0_10px_18px_rgba(0,0,0,0.2)]"
            priority
          />
        </div>

        <Squiggle className="skills-squiggle pointer-events-none absolute left-[27%] top-[34%] z-30 h-12 w-10 md:left-[30%] md:top-[36%] md:h-14 md:w-12" />
        <Squiggle className="skills-squiggle pointer-events-none absolute right-[30%] top-[24%] z-30 h-11 w-9 rotate-12 md:right-[32%] md:top-[26%] md:h-14 md:w-11" />

        <div className="skills-marquee-wrap pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[17%] overflow-hidden">
          <div className="flex w-max items-start">
            <Image
              src={ASSETS.marquee}
              alt=""
              width={1440}
              height={346}
              className="h-[58vh] w-auto max-w-none shrink-0"
              priority
            />
          </div>
        </div>
      </div>
    </div>
    <SkillsCatalog />
    </>
  );
}
