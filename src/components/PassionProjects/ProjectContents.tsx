"use client";

import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const CaseStudiesContent = () => {
  const { translate } = useLanguage();
  const caseStudies = [
    {
      id: "upi-fraud",
      title: "UPI Fraud Detection - ML System",
      category: "Machine Learning & Security",
      badge: "ML System",
      color: "bg-[#0055FF]",
      textColor: "text-white",
      description:
        "Built a machine learning based system designed to detect fraudulent UPI transactions by utilizing data preprocessing, feature engineering, and model evaluation techniques.",
      tags: ["Python", "scikit-learn", "Pandas", "Feature Engineering", "ML Security"],
    },
    {
      id: "customer-feedback-rag",
      title: "Explainable Customer Feedback Analysis",
      subtitle: "Graph-Based Orchestration & Emotion-Aware LLM Reasoning",
      category: "AI Architecture & RAG",
      badge: "AI RAG",
      color: "bg-[#FF4D00]",
      textColor: "text-white",
      description:
        "Developed an explainable conversational RAG system for customer feedback analysis using graph-based orchestration, hybrid vector–knowledge graph retrieval, emotion-aware query handling, and evidence-grounded responses.",
      tags: ["Neo4j", "Qdrant", "Graph RAG", "LLM Reasoning", "Vector Search"],
    },
  ];

  return (
    <div className="p-8 md:p-14 border-t border-black">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-[-0.04em]" style={{ fontFamily: "var(--font-cabinet)" }}>
          {translate("pjCaseStudies")}
        </h3>
        <p className="text-gray-700 mt-2 text-base md:text-lg">
          Detailed breakdown of machine learning models, RAG systems, and engineering architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-5xl mx-auto">
        {caseStudies.map((project) => (
          <div
            key={project.id}
            className={`rounded-2xl border-2 border-black p-6 md:p-8 flex flex-col justify-between shadow-[7px_7px_0_#000] ${project.color} ${project.textColor}`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span
                  className="rounded-full bg-black/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  {project.badge}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider opacity-80">{project.category}</span>
              </div>

              <h4
                className="mt-4 text-2xl md:text-3xl font-bold uppercase leading-tight tracking-[-0.03em]"
                style={{ fontFamily: "var(--font-cabinet)" }}
              >
                {project.title}
              </h4>
              {project.subtitle && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide opacity-90">{project.subtitle}</p>
              )}

              <p className="mt-4 text-sm md:text-base leading-relaxed opacity-95">
                {project.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/30 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white text-black px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
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
