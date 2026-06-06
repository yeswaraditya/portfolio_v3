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
const categories: { name: CategoryKey; colorClass: string; hoverClass: string }[] = [
  { name: "Case Studies", colorClass: "bg-[#4285F4]", hoverClass: "hover:bg-[#4285F4]" },
  { name: "Wallpapers", colorClass: "bg-[#FDE047]", hoverClass: "hover:bg-[#FDE047]" },
  { name: "Figma Community", colorClass: "bg-[#FF55FF]", hoverClass: "hover:bg-[#FF55FF]" },
  { name: "Ios Development", colorClass: "bg-[#40E0D0]", hoverClass: "hover:bg-[#40E0D0]" },
  { name: "Courses", colorClass: "bg-[#FF2453]", hoverClass: "hover:bg-[#FF2453]" },
  { name: "Notion Templates", colorClass: "bg-[#FF7340]", hoverClass: "hover:bg-[#FF7340]" },
  { name: "Graphic Design", colorClass: "bg-[#ADFF2F]", hoverClass: "hover:bg-[#ADFF2F]" },
  { name: "Stickers", colorClass: "bg-[#FFB300]", hoverClass: "hover:bg-[#FFB300]" },
  { name: "chrome extensions", colorClass: "bg-[#7C3AED]", hoverClass: "hover:bg-[#7C3AED]" },
  { name: "vscode extensions", colorClass: "bg-[#6DE385]", hoverClass: "hover:bg-[#6DE385]" },
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
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          const isFigma = cat.name === "Figma Community";
          const sharedClassName = `
            relative group
            h-24 md:h-32
            border-r border-b border-black
            flex items-center justify-center
            transition-colors duration-300
            text-black
            ${isActive ? cat.colorClass : `bg-[#EEEEEE] ${cat.hoverClass}`}
          `;

          if (isFigma) {
            return (
              <a
                key={cat.name}
                href="https://www.figma.com/@eswaraditya"
                target="_blank"
                rel="noopener noreferrer"
                className={sharedClassName}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                <span className="font-mono text-sm md:text-xs px-2 text-center z-10 w-full whitespace-normal md:whitespace-nowrap overflow-hidden text-ellipsis">
                  {cat.name}
                </span>
              </a>
            );
          }

          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={sharedClassName}
            >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            <span className="font-mono text-sm md:text-xs px-2 text-center z-10 w-full whitespace-normal md:whitespace-nowrap overflow-hidden text-ellipsis">
              {cat.name}
            </span>
          </button>
          );
        })}
      </div>

      {/* Dynamic Content Area */}
      <div ref={contentRef} className="min-h-[40vh] bg-[#EEEEEE] text-black border-r border-l border-b border-black">
        <ActiveComponent />
      </div>
    </div>
  );
}
