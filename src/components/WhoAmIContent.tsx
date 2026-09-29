"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function GreenDots({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-1.5 ${className}`} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-5 w-5 bg-[#B4FF00] md:h-7 md:w-7" />
      ))}
    </div>
  );
}

function Frame({
  src,
  alt,
  caption,
  className = "",
  aspect = "aspect-[4/3]",
  rotate = 0,
  fit = "cover",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspect?: string;
  rotate?: number;
  fit?: "cover" | "contain";
}) {
  return (
    <figure
      className={`wai-block bg-white p-2 shadow-[7px_7px_0_#111] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className={`relative w-full overflow-hidden bg-neutral-100 ${aspect}`}>
        <Image src={src} alt={alt} fill className={fit === "contain" ? "object-contain" : "object-cover"} />
      </div>
      {caption ? (
        <figcaption
          className="px-1 pt-2 text-[11px] font-bold uppercase tracking-[0.16em]"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function WhoAmIContent() {
  const ref = useRef<HTMLDivElement>(null);
  const { translate } = useLanguage();

  useGSAP(() => {
    gsap.from(".wai-intro", {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.utils.toArray<HTMLElement>(".wai-block").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="mx-auto w-full max-w-[1180px] px-5 pb-28 pt-28 md:px-10 md:pt-32">
      <header className="wai-intro flex items-end justify-between gap-6">
        <div className="min-w-0">
          <p
            className="text-[12px] font-bold uppercase tracking-[0.32em]"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            15 / 06 / 2004
          </p>
          <h1
            className="mt-3 max-w-full text-[clamp(3.2rem,8.5vw,7.2rem)] font-bold uppercase leading-[0.82] tracking-[-0.05em]"
            style={{ fontFamily: "var(--font-cabinet)" }}
          >
            {translate("whoAmI")}
          </h1>
          <p className="mt-5 max-w-[36ch] text-base leading-relaxed md:text-lg">
            {translate("born")}
          </p>
        </div>
        <GreenDots className="mb-3 hidden sm:grid" />
      </header>

      <div className="mt-14 grid grid-cols-12 items-end gap-4 md:mt-20 md:gap-6">
        <Frame
          src="/about/baby.jpg"
          alt="Day one"
          rotate={-2}
          aspect="aspect-[4/3]"
          className="col-span-7 md:col-span-5"
        />
        <Frame
          src="/about/childhood-suit.jpg"
          alt="Childhood"
          rotate={2}
          aspect="aspect-[3/4]"
          className="col-span-5 md:col-span-3 md:col-start-9"
        />
      </div>

      <div className="mt-8 grid grid-cols-12 items-start gap-4 md:mt-12 md:gap-6">
        <Frame
          src="/about/childhood-wall-2.jpg"
          alt="Childhood event"
          rotate={-2}
          aspect="aspect-[3/4]"
          className="col-span-6 md:col-span-4"
        />
        <Frame
          src="/about/childhood-wall-1.jpg"
          alt="Childhood event"
          rotate={1.5}
          aspect="aspect-[3/4]"
          className="col-span-6 md:col-span-3 md:mt-16"
        />
        <Frame
          src="/about/childhood-wall-3.jpg"
          alt="Childhood event"
          rotate={-1}
          aspect="aspect-[4/5]"
          className="col-span-8 md:col-span-3 md:mt-6"
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-12 md:gap-6">
        <Frame
          src="/about/childhood-face-1.jpg"
          alt="Portrait"
          rotate={-1}
          aspect="aspect-[4/3]"
          className="md:col-span-4"
        />
        <Frame
          src="/about/childhood-face-2.jpg"
          alt="Portrait smiling"
          rotate={1}
          aspect="aspect-[4/3]"
          className="md:col-span-4 md:col-start-6 md:mt-10"
        />
        <GreenDots className="col-span-2 mt-2 justify-self-end md:col-span-2 md:col-start-11 md:mt-24" />
      </div>

      <div className="mt-14 grid grid-cols-12 items-end gap-4 md:mt-20 md:gap-8">
        <Frame
          src="/about/speaking.jpg"
          alt="Speaking at institute"
          caption={translate("siddhartha")}
          rotate={-1.5}
          aspect="aspect-[3/4]"
          className="col-span-12 sm:col-span-5"
        />
        <Frame
          src="/about/figma-workshop-1.jpg"
          alt="Figma workshop"
          caption={translate("figmaWorkshop")}
          rotate={1}
          aspect="aspect-[4/3]"
          className="col-span-12 sm:col-span-7"
        />
      </div>

      <div className="mt-14 grid grid-cols-12 items-end gap-4 md:mt-20 md:gap-8">
        <Frame
          src="/about/notion-club.jpg"
          alt="Notion club"
          caption={translate("notionClub")}
          rotate={-1}
          fit="contain"
          aspect="aspect-[5/4]"
          className="col-span-12 bg-white md:col-span-6"
        />
        <Frame
          src="/about/google-dev.jpg"
          alt="Google Developer Groups"
          caption={translate("googleDev")}
          aspect="aspect-[16/10]"
          className="col-span-12 md:col-span-6"
        />
      </div>

      {/* Bio Summary Section */}
      <section className="wai-block mt-16 rounded-2xl border-2 border-black bg-[#FFE600] p-6 text-black shadow-[8px_8px_0_#111] md:mt-24 md:p-10">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          Overview & Focus
        </p>
        <h2
          className="mt-2 text-2xl font-bold uppercase tracking-[-0.03em] md:text-4xl"
          style={{ fontFamily: "var(--font-cabinet)" }}
        >
          Software Engineering, ML & Cybersecurity
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-relaxed md:text-lg font-medium text-black/90">
          Computer Science graduate with expertise in Software Development and Machine Learning, currently expanding into the cybersecurity domain with a practical focus on network reconnaissance, ethical hacking, and Security Operations Center (SOC) analysis. Dedicated to building visually compelling, user-centered digital experiences and intelligent systems.
        </p>
      </section>

      {/* Experience & Leadership Section */}
      <section className="wai-block mt-16 md:mt-20">
        <div className="flex items-center justify-between gap-4 border-b-2 border-black pb-4">
          <h2
            className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold uppercase leading-none tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-cabinet)" }}
          >
            Leadership & Experience
          </h2>
          <GreenDots className="hidden sm:grid" />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              role: "UI/UX & Graphic Design Domain Master",
              org: "Google Developer Groups On Campus - PVPSIT",
              period: "Oct 2025 – Aug 2026",
              detail: "Recognized twice for leadership in UI/UX and Graphic Design. Mentored members, designed key digital assets, and led visual identity workflows.",
              accent: "#B4FF00",
            },
            {
              role: "President",
              org: "Innovation Club - PVPSIT",
              period: "Jan 2024 – Aug 2026",
              detail: "Led innovation events, workshops, hackathons, and student-driven technical initiatives across campus.",
              accent: "#FFE600",
            },
            {
              role: "Member of Lead Council",
              org: "Notion Student Clubs (PVPSIT)",
              period: "Dec 2024 – Aug 2026",
              detail: "Led the design team and oversaw workflows, content systems, and productivity tool coordination.",
              accent: "#FF4D00",
            },
            {
              role: "NEC Lead",
              org: "ED-CELL, PVPSIT",
              period: "Aug 2024 – Aug 2026",
              detail: "Spearheaded entrepreneurship initiatives and national competition representation.",
              accent: "#0055FF",
              textColor: "text-white",
            },
          ].map((exp, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border-2 border-black p-6 shadow-[6px_6px_0_#111] transition-transform hover:-translate-y-1 ${
                exp.textColor ? exp.textColor : "text-black"
              }`}
              style={{ backgroundColor: exp.accent }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className="rounded-full bg-black/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  {exp.period}
                </span>
              </div>
              <h3
                className="mt-3 text-xl font-bold uppercase leading-tight md:text-2xl"
                style={{ fontFamily: "var(--font-cabinet)" }}
              >
                {exp.role}
              </h3>
              <p
                className="mt-1 text-sm font-semibold uppercase tracking-wider opacity-90"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                {exp.org}
              </p>
              <p className="mt-3 text-sm leading-relaxed opacity-95">{exp.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Honours Grid */}
      <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12">
        {/* Education */}
        <section className="wai-block md:col-span-7">
          <h2
            className="border-b-2 border-black pb-3 text-[clamp(1.8rem,4vw,3.2rem)] font-bold uppercase tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-cabinet)" }}
          >
            Education & Academic Track
          </h2>
          <div className="mt-6 flex flex-col gap-5">
            {[
              {
                degree: "B.Tech in Computer Science & Engineering",
                institution: "Prasad V Potluri Siddhartha Institute of Technology (JNTUK)",
                period: "2022 – 2026",
                grade: "CGPA: 7.84 / 10",
                badge: "Undergraduate",
              },
              {
                degree: "12th Standard (MPC - Intermediate)",
                institution: "Narayana Junior College (Board of Intermediate Education)",
                period: "2020 – 2022",
                grade: "Final Grade: 71%",
                badge: "Higher Secondary",
              },
              {
                degree: "10th Standard (CBSE)",
                institution: "Kennedy High School",
                period: "2019 – 2020",
                grade: "Final Grade: 75%",
                badge: "Secondary School",
              },
            ].map((edu, idx) => (
              <div
                key={idx}
                className="rounded-xl border-2 border-black bg-white p-5 text-black shadow-[5px_5px_0_#111]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500"
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    {edu.period} • {edu.badge}
                  </span>
                  <span className="rounded bg-[#B4FF00] px-2 py-0.5 text-xs font-bold text-black">
                    {edu.grade}
                  </span>
                </div>
                <h3
                  className="mt-2 text-lg font-bold uppercase leading-tight md:text-xl"
                  style={{ fontFamily: "var(--font-cabinet)" }}
                >
                  {edu.degree}
                </h3>
                <p className="mt-1 text-xs font-semibold text-neutral-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Honours & Awards */}
        <section className="wai-block md:col-span-5">
          <h2
            className="border-b-2 border-black pb-3 text-[clamp(1.8rem,4vw,3.2rem)] font-bold uppercase tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-cabinet)" }}
          >
            Honours & Awards
          </h2>
          <div className="mt-6 flex flex-col gap-5">
            {[
              {
                title: "HackVyuha'25 National Hackathon",
                award: "2nd Place Finalist (Out of 250+ teams)",
                org: "National Hackathon Competition",
                color: "bg-[#0055FF]",
                text: "text-white",
              },
              {
                title: "IIT Bombay NEC'25",
                award: "National Finalist",
                org: "IIT Bombay",
                color: "bg-[#FF4D00]",
                text: "text-white",
              },
              {
                title: "NEC '24 Advanced Track",
                award: "Top 20 Selection",
                org: "National Entrepreneurship Challenge",
                color: "bg-white",
                text: "text-black",
              },
            ].map((award, idx) => (
              <div
                key={idx}
                className={`rounded-xl border-2 border-black p-5 shadow-[5px_5px_0_#111] ${award.color} ${award.text}`}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-80"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  {award.org}
                </span>
                <h3
                  className="mt-1 text-lg font-bold uppercase leading-tight md:text-xl"
                  style={{ fontFamily: "var(--font-cabinet)" }}
                >
                  {award.title}
                </h3>
                <p className="mt-2 text-xs font-bold tracking-wide">{award.award}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-16 flex justify-center md:mt-24">
        <Frame
          src="/about/flow-work.gif"
          alt="Music and work"
          fit="contain"
          aspect="aspect-[3/4]"
          className="w-full max-w-[380px] bg-black"
        />
      </div>
    </div>
  );
}

