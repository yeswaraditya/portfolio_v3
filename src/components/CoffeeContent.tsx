"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ─── Social shape definitions ────────────────────────────────────────────────
interface Shape {
  id: string;
  name: string;
  handle: string;
  href?: string;
  bg: string;
  color: string;
  circle?: boolean;
  dot?: string;         // small accent dot color
  w: number;
  h: number;
  rotate: number;
  pos: React.CSSProperties;
}

const shapes: Shape[] = [
  // ── Row 1 ──────────────────────────────────────────────────────────────────
  {
    id: "instagram",
    name: "Instagram",
    handle: "@eswaraditya5",
    href: "https://www.instagram.com/eswaraditya5/",
    bg: "#FF2D9F", color: "#fff",
    dot: "#C6FF00",
    w: 130, h: 105, rotate: -3,
    pos: { left: "4%", top: "38%" },
  },
  {
    id: "twitter",
    name: "𝕏  Twitter",
    handle: "@YarlagaddaEswar",
    href: "https://x.com/YarlagaddaEswar",
    bg: "#FF9F0A", color: "#000",
    w: 162, h: 90, rotate: 2,
    pos: { left: "36%", top: "36%" },
  },
  {
    id: "telegram",
    name: "Telegram",
    handle: "soon 😁",
    bg: "#34C759", color: "#000",
    w: 145, h: 105, rotate: 1,
    pos: { right: "5%", top: "41%" },
  },

  // ── Row 2 ──────────────────────────────────────────────────────────────────
  {
    id: "youtube",
    name: "YouTube",
    handle: "@eswar_aditya",
    href: "https://www.youtube.com/@eswar_aditya",
    bg: "#FF3B30", color: "#fff",
    circle: true,
    w: 110, h: 110, rotate: 0,
    pos: { left: "28%", top: "53%" },
  },
  {
    id: "github",
    name: "GitHub",
    handle: "@yeswaraditya",
    href: "https://github.com/yeswaraditya",
    bg: "#1C1C1E", color: "#fff",
    dot: "#FF9F0A",
    w: 130, h: 100, rotate: -2,
    pos: { left: "6%", top: "60%" },
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "Yarlagadda Eswar Aditya",
    href: "https://www.linkedin.com/in/yarlagaddaeswaraditya/",
    bg: "#8B5CF6", color: "#fff",
    w: 148, h: 90, rotate: 2,
    pos: { left: "41%", top: "58%" },
  },
  {
    id: "email",
    name: "Email",
    handle: "yeswaraditya3006@...",
    href: "mailto:yeswaraditya3006@gmail.com",
    bg: "#5AC8FA", color: "#000",
    w: 130, h: 100, rotate: -1,
    pos: { right: "5%", top: "60%" },
  },

  // ── Row 3 ──────────────────────────────────────────────────────────────────
  {
    id: "behance",
    name: "Behance",
    handle: "@eswaradyarlaga",
    href: "https://www.behance.net/eswaradyarlaga",
    bg: "#C6FF00", color: "#000",
    w: 122, h: 95, rotate: 3,
    pos: { left: "22%", top: "71%" },
  },
  {
    id: "discord",
    name: "Discord",
    handle: "soon 😁",
    href: "https://discord.com/users/eswaraditya",
    bg: "#7C3AED", color: "#fff",
    circle: true,
    w: 105, h: 105, rotate: 0,
    pos: { left: "5%", top: "76%" },
  },
  {
    id: "dribbble",
    name: "Dribbble",
    handle: "soon 😁",
    bg: "#FF375F", color: "#fff",
    w: 135, h: 95, rotate: -3,
    pos: { right: "8%", top: "73%" },
  },
  {
    id: "figma",
    name: "Figma",
    handle: "@eswaraditya",
    href: "https://figma.com/@eswaraditya",
    bg: "#FF7262", color: "#fff",
    circle: true,
    w: 100, h: 100, rotate: 0,
    pos: { left: "50%", top: "76%" },
  },
];

// ─── Card component ──────────────────────────────────────────────────────────
function ShapeCard({ s }: { s: Shape }) {
  const inner = (
    <div
      className="w-full h-full flex flex-col justify-end p-2.5 transition-transform duration-200 group-hover:scale-105 overflow-hidden"
      style={{
        backgroundColor: s.bg,
        borderRadius: s.circle ? "50%" : "4px",
        position: "relative",
      }}
    >
      {/* Accent dot */}
      {s.dot && (
        <div
          className="absolute top-2 left-2 w-5 h-5 rounded-full"
          style={{ backgroundColor: s.dot }}
        />
      )}

      {/* Text — hidden on circle, visible on rect */}
      {!s.circle && (
        <>
          <span
            className="font-bold text-[11px] leading-none uppercase tracking-widest"
            style={{ color: s.color }}
          >
            {s.name}
          </span>
          <span
            className="font-mono text-[9px] opacity-70 mt-0.5 truncate"
            style={{ color: s.color }}
          >
            {s.handle}
          </span>
        </>
      )}

      {/* Circle — show name */}
      {s.circle && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-bold text-[11px] uppercase tracking-wider text-center leading-tight px-1"
            style={{ color: s.color }}
          >
            {s.name}
          </span>
        </div>
      )}
    </div>
  );

  const cardStyle: React.CSSProperties = {
    ...s.pos,
    width: s.w,
    height: s.h,
    transform: `rotate(${s.rotate}deg)`,
    transformOrigin: "center center",
  };

  if (!s.href) {
    return <div className="social-card absolute group" style={cardStyle}>{inner}</div>;
  }

  return (
    <a
      href={s.href}
      target={s.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="social-card absolute group"
      style={cardStyle}
    >
      {inner}
    </a>
  );
}

// ─── Main content ─────────────────────────────────────────────────────────────
export default function CoffeeContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Title words scatter-in from different directions
    gsap.from(".coffee-word", {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.14,
      ease: "power3.out",
      delay: 0.15,
    });

    // Cards pop in with overshoot
    gsap.from(".social-card", {
      opacity: 0,
      scale: 0.4,
      rotation: () => Math.random() * 20 - 10,
      duration: 0.55,
      stagger: { each: 0.07, from: "random" },
      ease: "back.out(1.7)",
      delay: 0.7,
    });

    // Continuous gentle float on each card
    document.querySelectorAll<HTMLElement>(".social-card").forEach((el, i) => {
      gsap.to(el, {
        y: `+=${Math.random() * 12 - 6}`,
        rotation: `+=${Math.random() * 4 - 2}`,
        duration: 2.5 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.25,
      });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ minHeight: "110vh", backgroundColor: "#3F85FF" }}
    >
      {/* ── Scattered title ───────────────────────────────────────────────── */}

      {/* "Let's" — top left */}
      <span
        className="coffee-word absolute font-bold text-black select-none"
        style={{ left: "4%", top: "13%", fontSize: "clamp(28px, 5vw, 72px)", letterSpacing: "-0.03em" }}
      >
        Let&apos;s
      </span>

      {/* "have" — top right */}
      <span
        className="coffee-word absolute font-bold text-black select-none"
        style={{ left: "62%", top: "15%", fontSize: "clamp(28px, 5vw, 72px)", letterSpacing: "-0.03em" }}
      >
        have
      </span>

      {/* "Coffee" — center-left, largest */}
      <span
        className="coffee-word absolute font-bold text-black select-none"
        style={{ left: "16%", top: "26%", fontSize: "clamp(38px, 7vw, 96px)", letterSpacing: "-0.04em" }}
      >
        Coffee
      </span>

      {/* "together" — center-right */}
      <span
        className="coffee-word absolute font-bold text-black select-none"
        style={{ right: "5%", top: "34%", fontSize: "clamp(22px, 3.5vw, 52px)", letterSpacing: "-0.03em" }}
      >
        together
      </span>

      {/* ── Social shape cards ────────────────────────────────────────────── */}
      {shapes.map((s) => (
        <ShapeCard key={s.id} s={s} />
      ))}
    </div>
  );
}
