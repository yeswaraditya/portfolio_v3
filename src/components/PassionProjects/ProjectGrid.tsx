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
  | "Ios Development"
  | "Courses"
  | "Notion Templates"
  | "Graphic Design"
  | "Stickers"
  | "chrome extensions"
  | "vscode extensions";

// Map keys to components
const ComponentMap: Record<CategoryKey, React.ComponentType> = {
  "Case Studies": CaseStudiesContent,
  "Wallpapers": WallpapersContent,
  "Figma Community": FigmaCommunityContent,
  "Ios Development": IOSDevelopmentContent,
  "Courses": CoursesContent,
  "Notion Templates": NotionTemplatesContent,
  "Graphic Design": GraphicDesignContent,
  "Stickers": StickersContent,
  "chrome extensions": ChromeExtensionsContent,
  "vscode extensions": VSCodeExtensionsContent,
};

// Data for the grid items
const categories: { name: CategoryKey; colorClass: string; textColor?: string }[] = [
  { name: "Case Studies", colorClass: "bg-[#4285F4]", textColor: "text-black" },
  { name: "Wallpapers", colorClass: "bg-[#EEEEEE]", textColor: "text-black" },
  { name: "Figma Community", colorClass: "bg-[#FF55FF]", textColor: "text-black" }, // Hot Pink
  { name: "Ios Development", colorClass: "bg-[#EEEEEE]", textColor: "text-black" },
  { name: "Courses", colorClass: "bg-[#EEEEEE]", textColor: "text-black" },
  { name: "Notion Templates", colorClass: "bg-[#EEEEEE]", textColor: "text-black" },
  { name: "Graphic Design", colorClass: "bg-[#EEEEEE]", textColor: "text-black" },
  { name: "Stickers", colorClass: "bg-[#EEEEEE]", textColor: "text-black" },
  { name: "chrome extensions", colorClass: "bg-[#EEEEEE]", textColor: "text-black" },
  { name: "vscode extensions", colorClass: "bg-[#6DE385]", textColor: "text-black" }, // Green
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
        gsap.fromTo(gridRef.current.children, 
            { opacity: 0, y: 15 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
            }
        );
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
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-5 border-t border-black w-full">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`
              relative group
              h-24 md:h-32
              border-r border-b border-black
              flex items-center justify-center
              transition-all duration-300
              ${cat.colorClass}
              ${cat.textColor}
            `}
          >
            {/* Hover overlay for interaction feedback */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            
            <span className="font-mono text-sm md:text-xs px-2 text-center z-10 w-full whitespace-normal md:whitespace-nowrap overflow-hidden text-ellipsis">
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* Dynamic Content Area */}
      <div ref={contentRef} className="min-h-[40vh] bg-[#EEEEEE] text-black border-r border-l border-b border-black">
        <ActiveComponent />
      </div>
    </div>
  );
}
