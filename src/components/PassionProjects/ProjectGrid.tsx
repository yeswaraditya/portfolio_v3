"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import {
  CaseStudiesContent,
  WallpapersContent,
  FigmaCommunityContent,
  IOSDevelopmentContent,
  CoursesContent,
  NotionTemplatesContent,
  GraphicDesignContent,
  StickersContent,
  ChromeExtensionsContent,
  VSCodeExtensionsContent,
} from "./ProjectContents";

// Define the category type
type CategoryKey =
  | "Case Studies"
  | "Wallpapers"
  | "Figma Community"
  | "iOS Development"
  | "Courses"
  | "Notion Templates"
  | "Graphic Design"
  | "Stickers"
  | "Chrome Extensions"
  | "VSCode Extensions";

// Map keys to components
const ComponentMap: Record<CategoryKey, React.ComponentType> = {
  "Case Studies": CaseStudiesContent,
  "Wallpapers": WallpapersContent,
  "Figma Community": FigmaCommunityContent,
  "iOS Development": IOSDevelopmentContent,
  "Courses": CoursesContent,
  "Notion Templates": NotionTemplatesContent,
  "Graphic Design": GraphicDesignContent,
  "Stickers": StickersContent,
  "Chrome Extensions": ChromeExtensionsContent,
  "VSCode Extensions": VSCodeExtensionsContent,
};

// Data for the grid items
const categories: { name: CategoryKey; colorClass: string; textColor?: string }[] = [
  { name: "Case Studies", colorClass: "bg-[#3B82F6]", textColor: "text-black" },
  { name: "Wallpapers", colorClass: "bg-black", textColor: "text-white" },
  { name: "Figma Community", colorClass: "bg-[#FF69B4]", textColor: "text-black" }, // Hot Pink
  { name: "iOS Development", colorClass: "bg-black", textColor: "text-white" },
  { name: "Courses", colorClass: "bg-black", textColor: "text-white" },
  { name: "Notion Templates", colorClass: "bg-black", textColor: "text-white" },
  { name: "Graphic Design", colorClass: "bg-black", textColor: "text-white" },
  { name: "Stickers", colorClass: "bg-black", textColor: "text-white" },
  { name: "Chrome Extensions", colorClass: "bg-black", textColor: "text-white" },
  { name: "VSCode Extensions", colorClass: "bg-[#4ADE80]", textColor: "text-black" }, // Green
];

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Case Studies");
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const ActiveComponent = ComponentMap[activeCategory];

  useGSAP(() => {
    // 1. Grid Items Staggered Entrance
    if (gridRef.current) {
        gsap.from(gridRef.current.children, {
            scrollTrigger: {
                trigger: gridRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
        });
    }
  }, { scope: containerRef });

  // Animate content change
  useGSAP(() => {
    if (contentRef.current) {
        gsap.fromTo(contentRef.current, 
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
    }
  }, [activeCategory]);

  return (
    <div ref={containerRef} className="w-full">
      {/* Grid Container */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-5 border-t border-l border-white/20">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`
              relative group
              h-32 md:h-40
              border-r border-b border-white/20
              flex items-center justify-center
              transition-all duration-300
              ${cat.colorClass}
              ${cat.textColor}
            `}
          >
            {/* Hover overlay for interaction feedback */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            
            <span className="font-mono text-sm md:text-base px-2 text-center z-10">
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* Dynamic Content Area */}
      <div ref={contentRef} className="min-h-[40vh] bg-black text-white">
        <ActiveComponent />
      </div>
    </div>
  );
}
