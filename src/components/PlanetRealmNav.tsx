"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Orbit, Sparkles, Terminal, Palette, Code2, Shield } from "lucide-react";

interface PlanetNavProps {
  currentPlanet: "ui-ux" | "development" | "cybersecurity";
}

export default function PlanetRealmNav({ currentPlanet }: PlanetNavProps) {
  const pathname = usePathname();

  const realms = [
    {
      id: "ui-ux",
      name: "UI/UX Biosphere",
      href: "/planets/ui-ux",
      icon: Palette,
      color: "#2ECC71",
      glow: "rgba(46, 204, 113, 0.4)",
      badge: "BIO-01",
    },
    {
      id: "development",
      name: "Dev Reactor",
      href: "/planets/development",
      icon: Code2,
      color: "#3B82F6",
      glow: "rgba(59, 130, 246, 0.4)",
      badge: "ENG-02",
    },
    {
      id: "cybersecurity",
      name: "Cyber Operations",
      href: "/planets/cybersecurity",
      icon: Shield,
      color: "#8B5CF6",
      glow: "rgba(139, 92, 246, 0.4)",
      badge: "SOC-03",
    },
  ];

  const current = realms.find((r) => r.id === currentPlanet) || realms[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 md:py-4 transition-all">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-2xl shadow-2xl">
        {/* Left: Back to Planets Canvas */}
        <div className="flex items-center gap-3">
          <Link
            href="/planets"
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            <Orbit size={14} className="text-white/60 group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">Orbit View</span>
            <span className="sm:hidden">Orbits</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/10 text-xs text-white/40 font-mono">
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: current.color }}
            />
            <span>REALM // {current.badge}</span>
          </div>
        </div>

        {/* Center: Realm Switcher */}
        <nav className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/5">
          {realms.map((realm) => {
            const isActive = currentPlanet === realm.id;
            const Icon = realm.icon;
            return (
              <Link
                key={realm.id}
                href={realm.href}
                className={`relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-white/50 hover:text-white/90 hover:bg-white/5"
                }`}
                style={{
                  backgroundColor: isActive ? "rgba(255, 255, 255, 0.08)" : undefined,
                  border: isActive ? `1px solid ${realm.color}40` : "1px solid transparent",
                  fontFamily: "var(--font-roboto)",
                }}
              >
                <Icon
                  size={14}
                  style={{ color: isActive ? realm.color : "currentColor" }}
                />
                <span className="hidden lg:inline">{realm.name}</span>
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ backgroundColor: realm.color }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Back to Home */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/15 hover:text-white transition-all"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
