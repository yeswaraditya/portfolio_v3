"use client";

import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const CaseStudiesContent = () => {
  const { translate } = useLanguage();
  return (
    <div className="p-12 text-center border-t border-black">
      <h3 className="text-3xl font-bold mb-4">{translate("pjCaseStudies")}</h3>
      <p className="text-gray-600">{translate("pjCaseDesc")}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {[1, 2].map((i) => (
          <div key={i} className="aspect-video bg-[#E0E0E0] border border-black rounded-sm flex items-center justify-center font-mono text-sm">
            {translate("pjPlaceholder", { n: i })}
          </div>
        ))}
      </div>
    </div>
  );
};

export const WallpapersContent = () => {
  const [downloads, setDownloads] = useState<Record<number, number>>({
    1: 420,
    2: 1042,
    3: 890,
    4: 231
  });
  const { translate } = useLanguage();

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
                <span className="font-mono text-xs text-gray-500 mt-1">{downloads[pack.id].toLocaleString()} {translate("pjDownloads")}</span>
              </div>
              <button 
                onClick={() => handleDownload(pack.id, pack.folder)}
                className="flex items-center justify-center p-2 rounded-full hover:bg-black/10 transition-colors border-2 border-transparent hover:border-black/20"
                title={translate("pjDownloadPack")}
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

export const FigmaCommunityContent = () => {
  const { translate } = useLanguage();
  return (
    <div className="p-12 text-center border-t border-black">
      <h3 className="text-3xl font-bold mb-4">{translate("pjFigmaCommunity")}</h3>
      <p className="text-gray-600">{translate("pjFigmaDesc")}</p>
    </div>
  );
};

export const IOSDevelopmentContent = () => {
  const { translate } = useLanguage();
  return (
    <div className="p-12 text-center border-t border-black">
      <h3 className="text-3xl font-bold mb-4">{translate("pjIosDev")}</h3>
      <p className="text-gray-600">{translate("pjIosDesc")}</p>
    </div>
  );
};

export const CoursesContent = () => {
  const { translate } = useLanguage();
  return (
    <div className="p-12 text-center border-t border-black">
      <h3 className="text-3xl font-bold mb-4">{translate("pjCourses")}</h3>
      <p className="text-gray-600">{translate("pjCoursesDesc")}</p>
    </div>
  );
};

export const NotionTemplatesContent = () => {
  const { translate } = useLanguage();
  return (
    <div className="p-12 text-center border-t border-black">
      <h3 className="text-3xl font-bold mb-4">{translate("pjNotionTemplates")}</h3>
      <p className="text-gray-600">{translate("pjNotionDesc")}</p>
    </div>
  );
};

export const GraphicDesignContent = () => {
  const { translate } = useLanguage();
  return (
    <div className="p-12 text-center border-t border-black">
      <h3 className="text-3xl font-bold mb-4">{translate("pjGraphicDesign")}</h3>
      <p className="text-gray-600">{translate("pjGraphicDesc")}</p>
    </div>
  );
};

export const StickersContent = () => {
  const { translate } = useLanguage();
  return (
    <div className="p-12 text-center border-t border-black">
      <h3 className="text-3xl font-bold mb-4">{translate("pjStickers")}</h3>
      <p className="text-gray-600">{translate("pjStickersDesc")}</p>
    </div>
  );
};

export const ChromeExtensionsContent = () => {
  const { translate } = useLanguage();
  return (
    <div className="p-12 text-center border-t border-black">
      <h3 className="text-3xl font-bold mb-4">{translate("pjChromeExtensions")}</h3>
      <p className="text-gray-600">{translate("pjChromeDesc")}</p>
    </div>
  );
};

export const VSCodeExtensionsContent = () => {
  const { translate } = useLanguage();
  return (
    <div className="p-12 text-center border-t border-black">
      <h3 className="text-3xl font-bold mb-4">{translate("pjVscodeExtensions")}</h3>
      <p className="text-gray-600">{translate("pjVscodeDesc")}</p>
    </div>
  );
};
