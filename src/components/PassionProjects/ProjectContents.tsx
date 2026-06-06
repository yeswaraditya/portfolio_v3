"use client";

import { useState } from "react";

export const CaseStudiesContent = () => (
  <div className="p-12 text-center border-t border-black">
    <h3 className="text-3xl font-bold mb-4">Case Studies</h3>
    <p className="text-gray-600">Deep dives into my UX design process and problem solving.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {[1, 2].map((i) => (
            <div key={i} className="aspect-video bg-[#E0E0E0] border border-black rounded-sm flex items-center justify-center font-mono text-sm">
                Project {i} Placeholder
            </div>
        ))}
    </div>
  </div>
);

import Image from "next/image";
import { Download } from "lucide-react";

export const WallpapersContent = () => {
  const [downloads, setDownloads] = useState<Record<number, number>>({
    1: 420,
    2: 1042,
    3: 890,
    4: 231
  });

  const handleDownload = (id: number, packName: string) => {
    // Increment fake counter
    setDownloads(prev => ({ ...prev, [id]: prev[id] + 1 }));
    // Trigger download
    const link = document.createElement("a");
    link.href = `/${encodeURIComponent(packName)}.zip`;
    link.download = `${packName}.zip`;
    link.click();
  };

  const packs = [
    { 
      id: 1, 
      title: "Mobile Wallpaper 1.0",
      preview: "/Mobile Wallpaper 1.0/see how it looks on device/311015175-c8040d05-91e4-4000-a2ce-1f8e4a29417b.jpeg",
      folder: "Mobile Wallpaper 1.0"
    },
    { 
      id: 2, 
      title: "Popsicle Wallpaper pack",
      preview: "/Popsicle Wallpaper pack-Mobile/How this looks on device/blush.png",
      folder: "Popsicle Wallpaper pack-Mobile"
    },
    { 
      id: 3, 
      title: "Wallpaper pack 1.0",
      preview: "/Wallpaper pack 1.0/See how it looks on device/289275185-5dc3eeaf-39fb-4b80-bbf1-259067b54ae0.png",
      folder: "Wallpaper pack 1.0"
    },
    { 
      id: 4, 
      title: "Wallpaper pack 2.0",
      preview: "/Wallpaper pack 2.0/see how it looks on device/mockuuups-free-macbook-pro-mockup-on-stone-pedestal.jpg",
      folder: "Wallpaper pack 2.0"
    },
  ];

  return (
    <div className="w-full h-full p-8 md:p-16 flex justify-center border-t border-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full max-w-5xl">
        {packs.map((pack) => (
          <div 
            key={pack.id} 
            className="w-full border border-black rounded-lg p-3 md:p-4 flex flex-col bg-transparent hover:bg-black/5 transition-colors"
          >
            {/* Inner Image Box */}
            <div className="w-full aspect-[16/10] border border-black rounded-md bg-[#EEEEEE] overflow-hidden relative">
              <Image 
                src={pack.preview} 
                alt={pack.title} 
                fill 
                className="object-cover" 
                unoptimized
              />
            </div>
            
            {/* Text Area and Download Button */}
            <div className="pt-6 pb-2 px-1 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-sm md:text-base font-bold text-black">{pack.title}</span>
                <span className="font-mono text-xs text-gray-500 mt-1">{downloads[pack.id].toLocaleString()} downloads</span>
              </div>
              <button 
                onClick={() => handleDownload(pack.id, pack.folder)}
                className="flex items-center justify-center p-2 rounded-full hover:bg-black/10 transition-colors border-2 border-transparent hover:border-black/20"
                title="Download pack"
              >
                <Download size={20} className="text-black" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FigmaCommunityContent = () => (
  <div className="p-12 text-center border-t border-black">
    <h3 className="text-3xl font-bold mb-4">Figma Community</h3>
    <p className="text-gray-600">Resources, plugins, and UI kits shared with the community.</p>
  </div>
);

export const IOSDevelopmentContent = () => (
  <div className="p-12 text-center border-t border-black">
    <h3 className="text-3xl font-bold mb-4">iOS Development</h3>
    <p className="text-gray-600">Native iOS apps built with Swift and SwiftUI.</p>
  </div>
);

export const CoursesContent = () => (
  <div className="p-12 text-center border-t border-black">
    <h3 className="text-3xl font-bold mb-4">Courses</h3>
    <p className="text-gray-600">Educational content and tutorials I&apos;ve created.</p>
  </div>
);

export const NotionTemplatesContent = () => (
  <div className="p-12 text-center border-t border-black">
    <h3 className="text-3xl font-bold mb-4">Notion Templates</h3>
    <p className="text-gray-600">Productivity systems and templates for Notion.</p>
  </div>
);

export const GraphicDesignContent = () => (
  <div className="p-12 text-center border-t border-black">
    <h3 className="text-3xl font-bold mb-4">Graphic Design</h3>
    <p className="text-gray-600">Branding, social media assets, and digital art.</p>
  </div>
);

export const StickersContent = () => (
  <div className="p-12 text-center border-t border-black">
    <h3 className="text-3xl font-bold mb-4">Stickers</h3>
    <p className="text-gray-600">Fun and custom sticker packs for devs.</p>
  </div>
);

export const ChromeExtensionsContent = () => (
  <div className="p-12 text-center border-t border-black">
    <h3 className="text-3xl font-bold mb-4">Chrome Extensions</h3>
    <p className="text-gray-600">Tools to enhance your browsing experience.</p>
  </div>
);

export const VSCodeExtensionsContent = () => (
  <div className="p-12 text-center border-t border-black">
    <h3 className="text-3xl font-bold mb-4">VSCode Extensions</h3>
    <p className="text-gray-600">Themes and utilities for Visual Studio Code.</p>
  </div>
);
