"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es" | "fr" | "ja" | "hi";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    skills: "Skills",
    passionProjects: "Passion Projects",
    replyTime: "reply you in 10min!",
    humansDie: "HUMANS DIEEEE",
    artWont: "ART WOOOONT",
    translateHeading: "Translate to your language",
    whoAmI: "WHO AM I",
    coffeeButton: "Let's have a coffee together!",
    notLazy: "YOU ARE NOT LAZY — JUST CREATIVE",
    art: "ART",
  },
  es: {
    skills: "Habilidades",
    passionProjects: "Proyectos de Pasión",
    replyTime: "¡te respondo en 10min!",
    humansDie: "LOS HUMANOS MUEREN",
    artWont: "EL ARTE NOOOO",
    translateHeading: "Traducir a tu idioma",
    whoAmI: "QUIÉN SOY",
    coffeeButton: "¡Tomemos un café juntos!",
    notLazy: "NO ERES PEREZOSO — SOLO CREATIVO",
    art: "ARTE",
  },
  fr: {
    skills: "Compétences",
    passionProjects: "Projets Passion",
    replyTime: "réponse dans 10min!",
    humansDie: "LES HUMAINS MEURENT",
    artWont: "L'ART RESTERAAAA",
    translateHeading: "Traduire dans votre langue",
    whoAmI: "QUI SUIS-JE",
    coffeeButton: "Prenons un café ensemble !",
    notLazy: "VOUS N'ÊTES PAS PARESSEUX — JUSTE CRÉATIF",
    art: "ART",
  },
  ja: {
    skills: "スキル",
    passionProjects: "情熱プロジェクト",
    replyTime: "10分以内に返信します！",
    humansDie: "人間は死ぬ",
    artWont: "芸術は残るぅぅぅ",
    translateHeading: "言語を翻訳する",
    whoAmI: "私は誰",
    coffeeButton: "一緒にコーヒーを飲みましょう！",
    notLazy: "あなたは怠け者じゃない — クリエイティブなだけ",
    art: "芸術",
  },
  hi: {
    skills: "कौशल",
    passionProjects: "जुनूनी परियोजनाएं",
    replyTime: "10 मिनट में जवाब दूंगा!",
    humansDie: "इंसान मर जाते हैं",
    artWont: "कला नहीं मरेगी",
    translateHeading: "अपनी भाषा में अनुवाद करें",
    whoAmI: "मैं कौन हूँ",
    coffeeButton: "चलो साथ में कॉफी पीते हैं!",
    notLazy: "आप आलसी नहीं हैं — बस रचनात्मक हैं",
    art: "कला",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const translate = (key: string) => {
    return translations[currentLanguage][key] || key;
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    closeModal();
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        translate,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
