"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { X } from "lucide-react";

export default function LanguageModal() {
  const { isModalOpen, closeModal, setLanguage } = useLanguage();

  if (!isModalOpen) return null;

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "es", name: "Spanish", native: "Español" },
    { code: "fr", name: "French", native: "Français" },
    { code: "ja", name: "Japanese", native: "日本語" },
    { code: "hi", name: "Hindi", native: "हिन्दी" },
  ] as const;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white text-black w-full max-w-md rounded-lg shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold font-mono uppercase tracking-wide">Select Language</h2>
          <button 
            onClick={closeModal}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div className="p-4 grid gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="flex items-center justify-between w-full p-4 text-left border border-gray-200 rounded-md hover:bg-accent-orange hover:border-accent-orange hover:text-white transition-all group"
            >
              <span className="font-bold">{lang.name}</span>
              <span className="font-mono text-sm opacity-50 group-hover:opacity-100">{lang.native}</span>
            </button>
          ))}
        </div>

        <div className="bg-gray-50 p-3 text-center text-xs text-gray-400 font-mono border-t border-gray-100">
          Translates entire website instantly
        </div>

      </div>
    </div>
  );
}
