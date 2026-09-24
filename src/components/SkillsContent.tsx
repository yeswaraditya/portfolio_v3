"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ASSETS = {
  marquee: "/skills-design/marquee.svg",
  portrait: "/skills-design/portrait.svg",
  halo: "/skills-design/halo.svg",
  gradCap: "/skills-design/grad-cap.svg",
  eyes: "/skills-design/eyes.svg",
  peaceHand: "/skills-design/peace-hand.svg",
  skilllessss: "/skills-design/skilllessss.svg",
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

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtml = html.style.overflow;
    const previousBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousHtml;
      body.style.overflow = previousBody;
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".skills-marquee-wrap", {
        opacity: 0,
        x: 40,
        duration: 0.9,
      })
        .from(
          ".skills-halo",
          {
            scale: 0.7,
            opacity: 0,
            duration: 0.85,
            ease: "back.out(1.4)",
          },
          "-=0.55"
        )
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
        )
        .from(
          ".skills-title",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.35"
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

      gsap.to(".skills-halo", {
        scale: 1.04,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
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
    <div
      ref={rootRef}
      className="fixed inset-0 z-0 grid h-svh w-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden text-white"
      style={{
        backgroundColor: "#0055FF",
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.92) 1.1px, transparent 1.15px)",
        backgroundSize: "14px 14px",
      }}
    >
      <div
        ref={stageRef}
        className="relative min-h-0 w-full"
      >
        <div className="skills-marquee-wrap pointer-events-none absolute inset-x-0 top-[44%] z-10 -translate-y-1/2 overflow-hidden">
          <div data-depth="0.35" className="flex w-max">
            {[0, 1].map((copy) => (
              <Image
                key={copy}
                src={ASSETS.marquee}
                alt=""
                width={1440}
                height={346}
                className="h-[18vw] min-h-[120px] max-h-[200px] w-auto shrink-0 md:h-[180px]"
                priority={copy === 0}
                aria-hidden={copy === 1}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 top-16 bottom-2 z-20 mx-auto w-[min(96vw,720px)] md:top-20">
          <div
            data-depth="0.55"
            className="skills-halo absolute left-1/2 top-[0%] z-10 h-[78%] w-[95%] -translate-x-1/2"
          >
            <Image
              src={ASSETS.halo}
              alt=""
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 92vw, 640px"
              priority
            />
          </div>

          <div data-depth="0.9" className="skills-portrait absolute inset-0 z-20">
            <Image
              src={ASSETS.portrait}
              alt="Portrait"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 92vw, 640px"
              priority
            />
          </div>

          <div
            data-depth="1.4"
            className="skills-sticker skills-sticker-cap absolute left-[-4%] top-[1%] z-30 w-[36%] max-w-[230px] md:left-[-6%] md:w-[32%]"
          >
            <Image
              src={ASSETS.gradCap}
              alt=""
              width={280}
              height={340}
              className="h-auto w-full rotate-[-10deg] drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
              priority
            />
          </div>

          <div
            data-depth="1.5"
            className="skills-sticker skills-sticker-eyes absolute right-[-3%] top-0 z-30 w-[30%] max-w-[190px] md:right-[-2%] md:w-[26%]"
          >
            <Image
              src={ASSETS.eyes}
              alt=""
              width={220}
              height={180}
              className="h-auto w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
              priority
            />
          </div>

          <div
            data-depth="1.6"
            className="skills-sticker skills-sticker-peace absolute right-[-8%] top-[34%] z-30 w-[34%] max-w-[220px] md:right-[-10%] md:top-[32%] md:w-[30%]"
          >
            <Image
              src={ASSETS.peaceHand}
              alt=""
              width={260}
              height={290}
              className="h-auto w-full rotate-[8deg] drop-shadow-[0_8px_16px_rgba(0,0,0,0.22)]"
              priority
            />
          </div>

          <Squiggle className="skills-squiggle absolute left-[26%] top-[16%] z-25 h-10 w-8 md:h-12 md:w-10" />
          <Squiggle className="skills-squiggle absolute right-[28%] top-[20%] z-25 h-9 w-7 rotate-25 md:h-11 md:w-9" />
        </div>
      </div>

      <div className="skills-title pointer-events-none z-40 flex justify-center px-4 pb-4 pt-1 md:pb-6">
        <Image
          src={ASSETS.skilllessss}
          alt="SKILLLESSSS"
          width={504}
          height={80}
          className="h-auto w-[min(72vw,420px)]"
          priority
        />
      </div>
    </div>
  );
}
