"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const skillCategories = [
  {
    id: "designing",
    name: "Designing",
    color: "#4285F4",
    skills: ["UI/UX Design", "Figma", "Typography", "Graphic Design", "Branding"],
    pos: { top: "18%", left: "14%" },
    floatDuration: 2.5,
    floatDelay: 0,
    enterFrom: -120,
  },
  {
    id: "product",
    name: "Product Management",
    color: "#FF55FF",
    skills: ["User Research", "Roadmapping", "Wireframing", "Prototyping"],
    pos: { top: "36%", left: "43%" },
    floatDuration: 3.0,
    floatDelay: 0.5,
    enterFrom: 80,
  },
  {
    id: "ai",
    name: "AI & Prompting",
    color: "#6DE385",
    skills: ["Prompt Engineering", "Claude / ChatGPT", "AI Workflows", "Cursor IDE"],
    pos: { top: "20%", left: "74%" },
    floatDuration: 2.8,
    floatDelay: 0.8,
    enterFrom: 120,
  },
  {
    id: "development",
    name: "Development",
    color: "#FF7340",
    skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS"],
    pos: { top: "55%", left: "7%" },
    floatDuration: 2.6,
    floatDelay: 0.3,
    enterFrom: -120,
  },
  {
    id: "mobile",
    name: "iOS / Mobile",
    color: "#7C3AED",
    skills: ["Swift", "SwiftUI", "Xcode", "App Store Connect"],
    pos: { top: "66%", left: "71%" },
    floatDuration: 3.2,
    floatDelay: 1.1,
    enterFrom: 120,
  },
  {
    id: "tools",
    name: "Tools & Productivity",
    color: "#FFB300",
    skills: ["Git / GitHub", "VS Code", "Notion", "Chrome DevTools"],
    pos: { top: "79%", left: "33%" },
    floatDuration: 2.9,
    floatDelay: 0.6,
    enterFrom: -80,
  },
];

export default function SkillsContent() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const centerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCat = skillCategories.find((c) => c.id === activeId);

  useGSAP(
    () => {
      // Pill entrance: slide in from left or right based on position
      pillRefs.current.forEach((pill, i) => {
        if (!pill) return;
        gsap.from(pill, {
          x: skillCategories[i].enterFrom,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.3 + i * 0.1,
        });
      });

      // Idle float animation (staggered out of phase)
      pillRefs.current.forEach((pill, i) => {
        if (!pill) return;
        const cat = skillCategories[i];
        gsap.to(pill, {
          y: 10,
          duration: cat.floatDuration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: cat.floatDelay,
        });
      });

      // Center text entrance
      if (centerRef.current) {
        gsap.from(centerRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.9,
        });
      }
    },
    { scope: desktopRef }
  );

  const swapCenter = (nextId: string | null) => {
    if (!centerRef.current) {
      setActiveId(nextId);
      return;
    }
    gsap.to(centerRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        setActiveId(nextId);
        gsap.fromTo(
          centerRef.current!,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      },
    });
  };

  const handlePillClick = (id: string) => {
    swapCenter(activeId === id ? null : id);
  };

  return (
    <div className="w-full">
      {/* ── Desktop: scattered floating layout ── */}
      <div
        ref={desktopRef}
        className="hidden md:block relative w-full"
        style={{ height: "calc(100vh - 160px)" }}
        onClick={(e) => {
          // Deselect when clicking empty background
          if (e.target === e.currentTarget) swapCenter(null);
        }}
      >
        {/* Floating pills */}
        {skillCategories.map((cat, i) => (
          <button
            key={cat.id}
            ref={(el) => {
              pillRefs.current[i] = el;
            }}
            onClick={() => handlePillClick(cat.id)}
            className="absolute font-mono text-sm font-bold px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-sm z-10"
            style={{
              backgroundColor: cat.color,
              top: cat.pos.top,
              left: cat.pos.left,
              outline:
                activeId === cat.id ? `2px solid #000` : "2px solid transparent",
              outlineOffset: "3px",
            }}
          >
            {cat.name}
          </button>
        ))}

        {/* Center: "Explore Skills" or skill list */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0 min-w-[260px]">
          <div ref={centerRef}>
            {!activeCat ? (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight">
                Explore Skills
              </h2>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <span
                  className="font-mono text-xs font-bold px-4 py-1.5 rounded-full"
                  style={{ backgroundColor: activeCat.color }}
                >
                  {activeCat.name}
                </span>
                <ul className="flex flex-col items-center gap-2 mt-1">
                  {activeCat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="font-mono text-sm text-black/70"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
                <span className="font-mono text-[10px] text-black/30 tracking-widest mt-2 uppercase">
                  click pill to close
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="md:hidden w-full px-6 pb-20">
        <h1 className="text-5xl font-bold tracking-tighter mb-8 uppercase">
          Skills
        </h1>
        <div className="flex flex-wrap gap-3 mb-8">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveId(activeId === cat.id ? null : cat.id)
              }
              className="font-mono text-sm font-bold px-5 py-2.5 rounded-full active:scale-95 transition-transform"
              style={{
                backgroundColor: cat.color,
                outline:
                  activeId === cat.id
                    ? "2px solid #000"
                    : "2px solid transparent",
                outlineOffset: "3px",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {activeCat && (
          <div className="border border-gray-400 p-6">
            <h3
              className="font-mono text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: activeCat.color }}
            >
              {activeCat.name}
            </h3>
            <ul className="flex flex-col gap-3">
              {activeCat.skills.map((skill) => (
                <li
                  key={skill}
                  className="font-mono text-sm border-b border-gray-200 pb-3 last:border-0 last:pb-0"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
