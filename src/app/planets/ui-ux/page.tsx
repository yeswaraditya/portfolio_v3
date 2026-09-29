"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PlanetRealmNav from "@/components/PlanetRealmNav";
import {
  Sparkles,
  Layers,
  Palette,
  Sliders,
  Download,
  ExternalLink,
  ChevronRight,
  Eye,
  CheckCircle2,
  Figma,
  Smartphone,
  Box,
  Compass,
} from "lucide-react";

export default function UIUXPlanetPage() {
  // Interactive Design Tokens Playground State
  const [activeColor, setActiveColor] = useState("#00F5A0");
  const [customHeading, setCustomHeading] = useState("Intentional Craft");
  const [activeTab, setActiveTab] = useState<"projects" | "tokens" | "wallpapers" | "tooling">("projects");
  const [activeWallpaper, setActiveWallpaper] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(null);

  const colors = [
    { name: "Bioluminescent Lime", hex: "#00F5A0" },
    { name: "Cyber Cyan", hex: "#00D9F5" },
    { name: "Solar Gold", hex: "#FFD000" },
    { name: "Radiant Coral", hex: "#FF5C5C" },
    { name: "Deep Amethyst", hex: "#A855F7" },
  ];

  const caseStudies = [
    {
      id: 0,
      title: "NO-TEMPLATE Brand Identity System",
      subtitle: "Full-Spectrum Visual Identity & Design Guidelines",
      category: "Brand & Visual Systems",
      badge: "Flagship Identity",
      accent: "#00F5A0",
      description:
        "Engineered an unapologetically bold, anti-generic visual identity named NO-TEMPLATE. Crafted custom typography scales, high-contrast palette tokens, brutalist grid rules, and dynamic social media assets that defy cookie-cutter web design trends.",
      deliverables: [
        "Design System Specification (50+ tokens)",
        "Custom Logo & Wordmark Variants",
        "Social Kit & Marketing Assets",
        "Typography Hierarchy Matrix",
      ],
      metrics: ["100% Custom Architecture", "Zero Templates Used", "Scalable Multi-Platform"],
    },
    {
      id: 1,
      title: "iOS Native Mobile App Interface Design",
      subtitle: "SwiftUI-Ready User Journeys & Micro-Interactions",
      category: "Mobile Product Design",
      badge: "iOS / SwiftUI UX",
      accent: "#00D9F5",
      description:
        "Designed end-to-end iOS application user journeys tailored specifically for Apple's Human Interface Guidelines, leveraging Swift Charts data visualizations, tactile haptic feedback states, and seamless dark-mode ergonomics.",
      deliverables: [
        "Complete User Journey Mapping",
        "Interactive High-Fidelity Figma Prototypes",
        "SwiftUI-Compliant Component Tokens",
        "Apple Vision OCR Interface States",
      ],
      metrics: ["Sub-16ms Animation Targets", "Full Dark & Light Modes", "Accessible Color Contrast"],
    },
    {
      id: 2,
      title: "Enterprise Component Kit & Design Systems",
      subtitle: "Modular, Reusable Design Architecture",
      category: "Design Infrastructure",
      badge: "Design System",
      accent: "#FFD000",
      description:
        "Architected scalable Figma component libraries equipped with nested variants, auto-layout 5.0 constraints, semantic token mappings, and developer handoff documentation for cross-functional engineering velocity.",
      deliverables: [
        "120+ Auto-Layout Component Variants",
        "Semantic Token Architecture",
        "Responsive Grid Breakpoint Blueprints",
        "Interactive States (Hover, Active, Focus, Error)",
      ],
      metrics: ["4x Faster Dev Handoff", "100% Variable-Driven Tokens", "Zero Component Drift"],
    },
    {
      id: 3,
      title: "Google Developer Groups (GDG) Design Lead",
      subtitle: "Community Workshops, Mentorship & Event Visuals",
      category: "Leadership & Community",
      badge: "Design Mentorship",
      accent: "#A855F7",
      description:
        "Conducted interactive design workshops for university students and developers, covering modern UI principles, rapid prototyping in Figma, and design-to-code pipelines with modern web frameworks.",
      deliverables: [
        "Interactive Figma Workshop Decks",
        "Hands-on Prototyping Exercises",
        "Event Brand Assets & Posters",
        "Design Career Mentorship Sessions",
      ],
      metrics: ["500+ Participants Reached", "5+ Workshops Delivered", "4.9/5 Feedback Score"],
    },
  ];

  const wallpapers = [
    {
      title: "Mobile Wallpaper 1.0",
      downloads: "1,420+",
      desc: "Minimalist geometric abstraction tailored for OLED smartphone displays.",
      preview: "/Mobile Wallpaper 1.0/see how it looks on device/311015175-c8040d05-91e4-4000-a2ce-1f8e4a29417b.jpeg",
      folder: "Mobile Wallpaper 1.0",
    },
    {
      title: "Popsicle Wallpaper Pack",
      downloads: "2,042+",
      desc: "Vibrant pastel gradients with lush tactile depth and modern blurs.",
      preview: "/Popsicle Wallpaper pack-Mobile/How this looks on device/blush.png",
      folder: "Popsicle Wallpaper pack-Mobile",
    },
    {
      title: "Wallpaper Pack 1.0",
      downloads: "1,890+",
      desc: "Desktop and mobile collection with futuristic ambient grain textures.",
      preview: "/Wallpaper pack 1.0/See how it looks on device/289275185-5dc3eeaf-39fb-4b80-bbf1-259067b54ae0.png",
      folder: "Wallpaper pack 1.0",
    },
    {
      title: "Wallpaper Pack 2.0",
      downloads: "1,231+",
      desc: "MacBook and ultrawide desktop landscapes with architectural realism.",
      preview: "/Wallpaper pack 2.0/see how it looks on device/mockuuups-free-macbook-pro-mockup-on-stone-pedestal.jpg",
      folder: "Wallpaper pack 2.0",
    },
  ];

  const tools = [
    { name: "Figma & FigJam", level: 98, role: "Primary Design & Prototyping Suite", badge: "Expert" },
    { name: "Adobe Illustrator", level: 92, role: "Vector Systems, Brand Identity & Wordmarks", badge: "Advanced" },
    { name: "Adobe Photoshop", level: 88, role: "Photo Compositing, Textures & Mockups", badge: "Advanced" },
    { name: "Adobe XD & Sketch", level: 85, role: "Component Architecture & Wireframing", badge: "Proficient" },
    { name: "OnyX & Design Tools", level: 82, role: "Asset Optimization & Color Grading", badge: "Proficient" },
  ];

  const handleDownload = (packName: string) => {
    const link = document.createElement("a");
    link.href = `/${encodeURIComponent(packName)}.zip`;
    link.download = `${packName}.zip`;
    link.click();
  };

  return (
    <div className="relative min-h-screen bg-[#030d08] text-white selection:bg-[#00F5A0] selection:text-black overflow-x-hidden font-sans">
      <PlanetRealmNav currentPlanet="ui-ux" />

      {/* Atmospheric Bioluminescent Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-[#00F5A0]/10 blur-[130px] animate-pulse" />
        <div className="absolute top-1/2 -right-32 h-[450px] w-[450px] rounded-full bg-[#00D9F5]/08 blur-[140px]" />
        <div className="absolute bottom-10 left-10 h-[400px] w-[400px] rounded-full bg-[#10B981]/08 blur-[120px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #00F5A0 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-20 md:px-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl border border-[#00F5A0]/20 bg-gradient-to-b from-[#00F5A0]/[0.08] via-black/40 to-black/80 p-8 md:p-14 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,245,160,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00F5A0]/30 bg-[#00F5A0]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#00F5A0]">
              <span className="h-2 w-2 rounded-full bg-[#00F5A0] animate-ping" />
              BIOSPHERE REALM // 01
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <span>ATMOSPHERE: ORGANIC DESIGN</span>
              <span>•</span>
              <span className="text-[#00F5A0]">100% INTENTIONAL PIXELS</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
                UI/UX, Visual Systems &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5A0] via-[#7DF5A5] to-[#00D9F5]">
                  Digital Biospheres
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
                A design playground where organic aesthetics meet high-precision interface engineering, 
                design token architecture, responsive components, and immersive visual storytelling.
              </p>
            </div>

            {/* Live Stats Pill Cards */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#00F5A0] font-mono">120+</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">Figma Components</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#00D9F5] font-mono">6,500+</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">Wallpaper Downloads</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#FFD000] font-mono">4+</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">Design Systems</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#A855F7] font-mono">500+</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">Mentees & Students</p>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {[
              { id: "projects", label: "Featured Case Studies", icon: Layers },
              { id: "tokens", label: "Interactive Token Studio", icon: Sliders },
              { id: "wallpapers", label: "Wallpaper Packs & Downloads", icon: Download },
              { id: "tooling", label: "Design Arsenal & Radar", icon: Palette },
            ].map((tab) => {
              const Icon = tab.icon;
              const isCurrent = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                    isCurrent
                      ? "bg-[#00F5A0] text-black shadow-[0_0_25px_rgba(0,245,160,0.4)]"
                      : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION 1: Featured Case Studies */}
        {activeTab === "projects" && (
          <section className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Signature Works & Case Studies
                </h2>
                <p className="text-sm text-white/50 mt-1">
                  Click any project card to inspect deliverables, tokens, and technical impact.
                </p>
              </div>
              <span className="hidden sm:inline-block font-mono text-xs text-[#00F5A0]">
                [ 04 ARCHIVED ARTIFACTS ]
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map((study) => {
                const isExpanded = activeCaseStudy === study.id;
                return (
                  <div
                    key={study.id}
                    onClick={() => setActiveCaseStudy(isExpanded ? null : study.id)}
                    className={`group relative cursor-pointer rounded-3xl border transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? "border-[#00F5A0] bg-black/80 shadow-[0_0_40px_rgba(0,245,160,0.15)] ring-1 ring-[#00F5A0]/40"
                        : "border-white/10 bg-black/40 hover:border-white/25 hover:bg-white/[0.04]"
                    } p-7 backdrop-blur-xl`}
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black"
                        style={{ backgroundColor: study.accent }}
                      >
                        {study.badge}
                      </span>
                      <span className="text-xs font-mono uppercase text-white/40">{study.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 text-2xl font-bold uppercase text-white group-hover:text-[#00F5A0] transition-colors leading-tight">
                      {study.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-white/50 uppercase tracking-wide">
                      {study.subtitle}
                    </p>

                    <p className="mt-4 text-sm text-white/70 leading-relaxed">
                      {study.description}
                    </p>

                    {/* Metrics Row */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {study.metrics.map((m) => (
                        <span
                          key={m}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-white/80"
                        >
                          ✦ {m}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Deliverables */}
                    {isExpanded && (
                      <div className="mt-6 border-t border-white/10 pt-5 space-y-3 animate-fadeIn">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#00F5A0] font-mono">
                          Key Deliverables & Specifications:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {study.deliverables.map((del) => (
                            <div key={del} className="flex items-start gap-2 text-xs text-white/80">
                              <CheckCircle2 size={14} className="text-[#00F5A0] shrink-0 mt-0.5" />
                              <span>{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interactive Expand Hint */}
                    <div className="mt-6 flex items-center justify-between text-xs font-mono text-white/40 pt-4 border-t border-white/5">
                      <span>{isExpanded ? "CLICK TO COLLAPSE" : "CLICK TO EXPAND SPEC"}</span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform duration-300 ${isExpanded ? "rotate-90 text-[#00F5A0]" : "group-hover:translate-x-1 text-white/40"}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 2: Interactive Design Token Studio */}
        {activeTab === "tokens" && (
          <section className="mt-12 rounded-3xl border border-white/10 bg-black/60 p-8 md:p-12 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F5A0] uppercase tracking-widest">
                  <Sliders size={14} /> LIVE TOKEN ENGINE
                </div>
                <h2 className="mt-2 text-3xl font-bold uppercase text-white">
                  Interactive Design System Sandbox
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Experiment with dynamic tokens, responsive typography scales, and interactive UI components in real time.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/60 block mb-3">
                    Active Color Token (`--color-accent`)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setActiveColor(c.hex)}
                        className={`h-12 rounded-xl transition-all flex items-center justify-center relative ${
                          activeColor === c.hex ? "scale-110 ring-2 ring-white shadow-lg" : "hover:scale-105 opacity-80"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {activeColor === c.hex && (
                          <span className="h-2 w-2 rounded-full bg-black" />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs font-mono text-white/40">Current: {activeColor}</p>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/60 block mb-2">
                    Live Display Text Token
                  </label>
                  <input
                    type="text"
                    value={customHeading}
                    onChange={(e) => setCustomHeading(e.target.value)}
                    placeholder="Enter custom text..."
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white focus:border-[#00F5A0] focus:outline-none font-mono"
                  />
                </div>

                {/* Token Specs List */}
                <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs space-y-2 text-white/70">
                  <div className="flex justify-between">
                    <span className="text-white/40">Border Radius:</span>
                    <span>16px (--radius-xl)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Glass Blur:</span>
                    <span>24px (--blur-2xl)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Elevation:</span>
                    <span>0 0 35px rgba(accent, 0.3)</span>
                  </div>
                </div>
              </div>

              {/* Live Preview Canvas */}
              <div className="lg:col-span-7 flex flex-col justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-black/80 to-black/40 p-8 backdrop-blur-xl relative overflow-hidden">
                <div
                  className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[90px] opacity-30 transition-colors duration-500"
                  style={{ backgroundColor: activeColor }}
                />

                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40 mb-2">
                  LIVE COMPONENT PREVIEW
                </span>

                <h3
                  className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight transition-colors duration-300"
                  style={{ color: activeColor }}
                >
                  {customHeading || "Design System"}
                </h3>

                <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-lg">
                  Every button, badge, and card inherits strictly typed tokens for predictable spacing, 
                  contrast accessibility, and cinematic visual polish.
                </p>

                {/* Live interactive UI components preview */}
                <div className="mt-8 flex flex-wrap gap-4 items-center">
                  <button
                    className="rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:opacity-90 active:scale-95"
                    style={{
                      backgroundColor: activeColor,
                      boxShadow: `0 0 25px ${activeColor}50`,
                      fontFamily: "var(--font-roboto)",
                    }}
                  >
                    Primary Action Button
                  </button>

                  <button
                    className="rounded-xl border px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                    style={{
                      borderColor: `${activeColor}80`,
                      fontFamily: "var(--font-roboto)",
                    }}
                  >
                    Secondary Glass
                  </button>

                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase"
                    style={{
                      backgroundColor: `${activeColor}20`,
                      color: activeColor,
                      border: `1px solid ${activeColor}50`,
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeColor }} />
                    Active Token
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: Wallpaper Packs & Downloads */}
        {activeTab === "wallpapers" && (
          <section className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Wallpapers & Visual Assets
                </h2>
                <p className="text-sm text-white/50 mt-1">
                  Custom crafted wallpaper collections for Mobile, Desktop, and Ultrawide displays.
                </p>
              </div>
              <span className="font-mono text-xs text-[#00F5A0]">[ 4 PACKS AVAILABLE ]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {wallpapers.map((wp, idx) => (
                <div
                  key={wp.title}
                  className="group rounded-3xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl hover:border-[#00F5A0]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Mockup Frame */}
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                      <Image
                        src={wp.preview}
                        alt={wp.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute top-3 left-3 rounded-lg bg-black/70 px-3 py-1 text-[11px] font-mono uppercase text-[#00F5A0] backdrop-blur-md border border-white/10">
                        {wp.downloads} Downloads
                      </div>
                    </div>

                    <div className="mt-5">
                      <h3 className="text-2xl font-bold uppercase text-white group-hover:text-[#00F5A0] transition-colors">
                        {wp.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/60 leading-relaxed">
                        {wp.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-white/40">ZIP ARCHIVE • HIGH RES</span>
                    <button
                      onClick={() => handleDownload(wp.folder)}
                      className="flex items-center gap-2 rounded-xl bg-[#00F5A0] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#00F5A0]/90 transition-all shadow-[0_0_20px_rgba(0,245,160,0.3)]"
                      style={{ fontFamily: "var(--font-roboto)" }}
                    >
                      <Download size={14} /> Download Pack
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: Design Arsenal & Radar */}
        {activeTab === "tooling" && (
          <section className="mt-12 rounded-3xl border border-white/10 bg-black/60 p-8 md:p-12 backdrop-blur-2xl">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-[#00F5A0] tracking-widest">
                SKILLS & PROFICIENCY
              </span>
              <h2 className="mt-2 text-3xl font-bold uppercase text-white">
                Design Tooling & Software Stack
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Industry-standard tooling mastery for wireframing, high-fidelity design systems, vector art, and motion prototypes.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md hover:border-[#00F5A0]/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white uppercase">{tool.name}</h3>
                    <span className="rounded-md border border-[#00F5A0]/40 bg-[#00F5A0]/10 px-2.5 py-0.5 text-xs font-mono text-[#00F5A0]">
                      {tool.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-white/60">{tool.role}</p>

                  {/* Progress Bar */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#00F5A0] to-[#00D9F5]"
                        style={{ width: `${tool.level}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-white/80">{tool.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Orbit Navigation CTA */}
        <section className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-black via-black/80 to-[#00F5A0]/10 p-8 md:p-12 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-[#00F5A0] uppercase tracking-widest">
              NEXT DESTINATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white mt-1">
              Ready to explore the Dev Reactor?
            </h3>
            <p className="text-sm text-white/60 mt-1">
              Journey to Planet 02 to discover Graph RAG pipelines, iOS SwiftUI apps, and ML fraud detection systems.
            </p>
          </div>

          <Link
            href="/planets/development"
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#00D9F5] px-6 py-4 text-sm font-bold uppercase tracking-wider text-black hover:opacity-90 transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] shrink-0"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            <span>Warp to Dev Planet</span>
            <ChevronRight size={18} />
          </Link>
        </section>
      </main>
    </div>
  );
}
