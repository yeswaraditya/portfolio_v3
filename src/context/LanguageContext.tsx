"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es" | "fr" | "ja" | "hi";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string, params?: Record<string, string | number>) => string;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // nav
    skills: "Skills",
    passionProjects: "Passion Projects",
    replyTime: "reply you in 10min!",
    flashback: "Flashback",
    headerLive: "LIVE",
    headerMusic: "MUSIC",
    // hero
    humansDie: "HUMANS",
    artWont: "WOOOONT",
    art: "ART",
    translateHeading: "Translate to your language",
    // home
    whoAmI: "WHO AM I",
    playingTrack: "Playing Track",
    paused: "Paused",
    coffeeButton: "Let's have a coffee together!",
    notLazy: "YOU ARE NOT LAZY",
    justCreative: "JUST CREATIVE",
    // about
    born: "I was born in Khammam, Telangana on 15/06/2004",
    siddhartha: "Sri Siddhartha Institute",
    figmaWorkshop: "Figma & UI Workshop",
    notionClub: "Notion Campus Club",
    googleDev: "Google Developer Groups",
    // modal
    selectLanguage: "Select Language",
    translatesInstantly: "Translates entire website instantly",
    // skills
    exploreSkills: "Explore Skills",
    clickToClose: "click pill to close",
    catDesigning: "Designing",
    catProduct: "Product Management",
    catAi: "AI & Prompting",
    catDevelopment: "Development",
    catMobile: "iOS / Mobile",
    catTools: "Tools & Productivity",
    // coffee
    coffeeLets: "Let's",
    coffeeHave: "have",
    coffeeCoffee: "Coffee",
    coffeeTogether: "together",
    // reply
    replyContact: "Contact",
    replyTitle: "REPLY YOU IN",
    replyMin: "min",
    replyAvailable: "Available for work",
    replyDirect: "Reach out directly",
    replyMessages: "I check messages obsessively. You'll hear back fast.",
    replyElsewhere: "Find me elsewhere",
    replyBasedIn: "Based in",
    replyLocation: "Hyderabad, India",
    replyTimezone: "IST (UTC+5:30)",
    // projects
    pjCaseStudies: "Case Studies",
    pjWallpapers: "Wallpapers",
    pjFigmaCommunity: "Figma Community",
    pjIosDev: "iOS Development",
    pjCourses: "Courses",
    pjNotionTemplates: "Notion Templates",
    pjGraphicDesign: "Graphic Design",
    pjStickers: "Stickers",
    pjChromeExtensions: "Chrome Extensions",
    pjVscodeExtensions: "VSCode Extensions",
    pjCaseDesc: "Deep dives into my UX design process and problem solving.",
    pjPlaceholder: "Project {n} Placeholder",
    pjFigmaDesc: "Resources, plugins, and UI kits shared with the community.",
    pjIosDesc: "Native iOS apps built with Swift and SwiftUI.",
    pjCoursesDesc: "Educational content and tutorials I've created.",
    pjNotionDesc: "Productivity systems and templates for Notion.",
    pjGraphicDesc: "Branding, social media assets, and digital art.",
    pjStickersDesc: "Fun and custom sticker packs for devs.",
    pjChromeDesc: "Tools to enhance your browsing experience.",
    pjVscodeDesc: "Themes and utilities for Visual Studio Code.",
    pjDownloads: "downloads",
    pjDownloadPack: "Download pack",
    flashPlaceholder: "Flashback {n}",
  },
  es: {
    // nav
    skills: "Habilidades",
    passionProjects: "Proyectos de Pasión",
    replyTime: "¡te respondo en 10min!",
    flashback: "Flashback",
    headerLive: "EN VIVO",
    headerMusic: "MÚSICA",
    // hero
    humansDie: "LOS HUMANOS",
    artWont: "NOOOO",
    art: "ARTE",
    translateHeading: "Traducir a tu idioma",
    // home
    whoAmI: "QUIÉN SOY",
    playingTrack: "Reproduciendo",
    paused: "En pausa",
    coffeeButton: "¡Tomemos un café juntos!",
    notLazy: "NO ERES PEREZOSO",
    justCreative: "SOLO CREATIVO",
    // about
    born: "Nací en Khammam, Telangana el 15/06/2004",
    siddhartha: "Instituto Sri Siddhartha",
    figmaWorkshop: "Taller de Figma y UI",
    notionClub: "Notion Campus Club",
    googleDev: "Grupos de Desarrolladores de Google",
    // modal
    selectLanguage: "Seleccionar idioma",
    translatesInstantly: "Traduce todo el sitio web al instante",
    // skills
    exploreSkills: "Explorar habilidades",
    clickToClose: "haz clic en la pastilla para cerrar",
    catDesigning: "Diseño",
    catProduct: "Gestión de Producto",
    catAi: "IA y Prompting",
    catDevelopment: "Desarrollo",
    catMobile: "iOS / Móvil",
    catTools: "Herramientas y Productividad",
    // coffee
    coffeeLets: "Tomemos",
    coffeeHave: "un",
    coffeeCoffee: "Café",
    coffeeTogether: "juntos",
    // reply
    replyContact: "Contacto",
    replyTitle: "TE RESPONDO EN",
    replyMin: "min",
    replyAvailable: "Disponible para trabajar",
    replyDirect: "Contáctame directamente",
    replyMessages: "Reviso los mensajes obsesivamente. Te responderé rápido.",
    replyElsewhere: "Encuéntrame en otros lugares",
    replyBasedIn: "Sede",
    replyLocation: "Hyderabad, India",
    replyTimezone: "IST (UTC+5:30)",
    // projects
    pjCaseStudies: "Casos de Estudio",
    pjWallpapers: "Fondos de Pantalla",
    pjFigmaCommunity: "Comunidad Figma",
    pjIosDev: "Desarrollo iOS",
    pjCourses: "Cursos",
    pjNotionTemplates: "Plantillas Notion",
    pjGraphicDesign: "Diseño Gráfico",
    pjStickers: "Stickers",
    pjChromeExtensions: "Extensiones de Chrome",
    pjVscodeExtensions: "Extensiones VSCode",
    pjCaseDesc: "Análisis a fondo de mi proceso de diseño UX y resolución de problemas.",
    pjPlaceholder: "Proyecto {n} en desarrollo",
    pjFigmaDesc: "Recursos, plugins y kits de UI compartidos con la comunidad.",
    pjIosDesc: "Apps iOS nativas creadas con Swift y SwiftUI.",
    pjCoursesDesc: "Contenido educativo y tutoriales que he creado.",
    pjNotionDesc: "Sistemas de productividad y plantillas para Notion.",
    pjGraphicDesc: "Branding, contenido para redes sociales y arte digital.",
    pjStickersDesc: "Packs de stickers divertidos y personalizados para desarrolladores.",
    pjChromeDesc: "Herramientas para mejorar tu experiencia de navegación.",
    pjVscodeDesc: "Temas y utilidades para Visual Studio Code.",
    pjDownloads: "descargas",
    pjDownloadPack: "Descargar pack",
    flashPlaceholder: "Flashback {n}",
  },
  fr: {
    // nav
    skills: "Compétences",
    passionProjects: "Projets Passion",
    replyTime: "réponse dans 10min!",
    headerLive: "EN DIRECT",
    headerMusic: "MUSIQUE",
    // hero
    humansDie: "LES HUMAINS",
    artWont: "RESTERAAAA",
    art: "ART",
    translateHeading: "Traduire dans votre langue",
    // home
    whoAmI: "QUI SUIS-JE",
    playingTrack: "En lecture",
    paused: "En pause",
    coffeeButton: "Prenons un café ensemble !",
    notLazy: "VOUS N'ÊTES PAS PARESSEUX",
    justCreative: "JUSTE CRÉATIF",
    // about
    born: "Je suis né à Khammam, Telangana le 15/06/2004",
    siddhartha: "Institut Sri Siddhartha",
    figmaWorkshop: "Atelier Figma et UI",
    notionClub: "Notion Campus Club",
    googleDev: "Groupes de Développeurs Google",
    // modal
    selectLanguage: "Choisir la langue",
    translatesInstantly: "Traduit tout le site instantanément",
    // skills
    exploreSkills: "Explorer les compétences",
    clickToClose: "cliquez sur la pastille pour fermer",
    catDesigning: "Conception",
    catProduct: "Gestion de Produit",
    catAi: "IA et Prompting",
    catDevelopment: "Développement",
    catMobile: "iOS / Mobile",
    catTools: "Outils et Productivité",
    // coffee
    coffeeLets: "Prenons",
    coffeeHave: "un",
    coffeeCoffee: "Café",
    coffeeTogether: "ensemble",
    // reply
    replyContact: "Contact",
    replyTitle: "RÉPONSE EN",
    replyMin: "min",
    replyAvailable: "Disponible pour travailler",
    replyDirect: "Contactez-moi directement",
    replyMessages: "Je consulte mes messages sans arrêt. Je réponds vite.",
    replyElsewhere: "Retrouvez-moi ailleurs",
    replyBasedIn: "Basé à",
    replyLocation: "Hyderabad, Inde",
    replyTimezone: "IST (UTC+5:30)",
    // projects
    pjCaseStudies: "Études de Cas",
    pjWallpapers: "Fonds d'écran",
    pjFigmaCommunity: "Communauté Figma",
    pjIosDev: "Développement iOS",
    pjCourses: "Cours",
    pjNotionTemplates: "Modèles Notion",
    pjGraphicDesign: "Design Graphique",
    pjStickers: "Stickers",
    pjChromeExtensions: "Extensions Chrome",
    pjVscodeExtensions: "Extensions VSCode",
    pjCaseDesc: "Analyses approfondies de mon processus de design UX et de résolution de problèmes.",
    pjPlaceholder: "Projet {n} à venir",
    pjFigmaDesc: "Ressources, plugins et kits UI partagés avec la communauté.",
    pjIosDesc: "Applications iOS natives avec Swift et SwiftUI.",
    pjCoursesDesc: "Contenus éducatifs et tutoriels que j'ai créés.",
    pjNotionDesc: "Systèmes de productivité et modèles pour Notion.",
    pjGraphicDesc: "Branding, visuels réseaux sociaux et art numérique.",
    pjStickersDesc: "Packs de stickers amusants pour développeurs.",
    pjChromeDesc: "Des outils pour améliorer votre navigation.",
    pjVscodeDesc: "Thèmes et utilitaires pour Visual Studio Code.",
    pjDownloads: "téléchargements",
    pjDownloadPack: "Télécharger le pack",
    flashPlaceholder: "Flashback {n}",
  },
  ja: {
    // nav
    skills: "スキル",
    passionProjects: "情熱プロジェクト",
    replyTime: "10分以内に返信します！",
    headerLive: "配信中",
    headerMusic: "ミュージック",
    // hero
    humansDie: "人間は",
    artWont: "残るぅぅぅ",
    art: "芸術",
    translateHeading: "言語を翻訳する",
    // home
    whoAmI: "私は誰",
    playingTrack: "再生中",
    paused: "一時停止",
    coffeeButton: "一緒にコーヒーを飲みましょう！",
    notLazy: "あなたは怠け者じゃない",
    justCreative: "クリエイティブなだけ",
    // about
    born: "2004年6月15日にテランガーナ州カンマムで生まれました",
    siddhartha: "スリ・シッダールタ研究所",
    figmaWorkshop: "Figma & UI ワークショップ",
    notionClub: "Notion キャンパスクラブ",
    googleDev: "Google Developer Groups",
    // modal
    selectLanguage: "言語を選択",
    translatesInstantly: "サイト全体を即座に翻訳します",
    // skills
    exploreSkills: "スキルを探索",
    clickToClose: "ピルをクリックして閉じる",
    catDesigning: "デザイン",
    catProduct: "プロダクトマネジメント",
    catAi: "AI と プロンプト",
    catDevelopment: "開発",
    catMobile: "iOS / モバイル",
    catTools: "ツールと生産性",
    // coffee
    coffeeLets: "一緒に",
    coffeeHave: "コーヒーを",
    coffeeCoffee: "コーヒー",
    coffeeTogether: "飲みましょう",
    // reply
    replyContact: "お問い合わせ",
    replyTitle: "返信は",
    replyMin: "分以内",
    replyAvailable: "仕事の受付中",
    replyDirect: "直接連絡する",
    replyMessages: "メッセージはすぐ確認します。すぐ返信します。",
    replyElsewhere: "他の場所で探す",
    replyBasedIn: "拠点",
    replyLocation: "インド・ハイデラバード",
    replyTimezone: "IST (UTC+5:30)",
    // projects
    pjCaseStudies: "ケーススタディ",
    pjWallpapers: "壁紙",
    pjFigmaCommunity: "Figma コミュニティ",
    pjIosDev: "iOS 開発",
    pjCourses: "コース",
    pjNotionTemplates: "Notion テンプレート",
    pjGraphicDesign: "グラフィックデザイン",
    pjStickers: "ステッカー",
    pjChromeExtensions: "Chrome 拡張機能",
    pjVscodeExtensions: "VSCode 拡張機能",
    pjCaseDesc: "UX デザインのプロセスと問題解決への深い考察。",
    pjPlaceholder: "プロジェクト {n} 準備中",
    pjFigmaDesc: "コミュニティと共有するリソース、プラグイン、UI キット。",
    pjIosDesc: "Swift と SwiftUI で作ったネイティブ iOS アプリ。",
    pjCoursesDesc: "私が作成した教育コンテンツとチュートリアル。",
    pjNotionDesc: "Notion 向けの生産性システムとテンプレート。",
    pjGraphicDesc: "ブランディング、SNS 素材、デジタルアート。",
    pjStickersDesc: "開発者向けの楽しいカスタムステッカー。",
    pjChromeDesc: "ブラウジング体験を向上させるツール。",
    pjVscodeDesc: "Visual Studio Code 用のテーマとユーティリティ。",
    pjDownloads: "ダウンロード",
    pjDownloadPack: "パックをダウンロード",
    flashPlaceholder: "フラッシュバック {n}",
  },
  hi: {
    // nav
    skills: "कौशल",
    passionProjects: "जुनूनी परियोजनाएं",
    replyTime: "10 मिनट में जवाब दूंगा!",
    headerLive: "लाइव",
    headerMusic: "संगीत",
    // hero
    humansDie: "इंसान",
    artWont: "नहीं मरेगी",
    art: "कला",
    translateHeading: "अपनी भाषा में अनुवाद करें",
    // home
    whoAmI: "मैं कौन हूँ",
    playingTrack: "चल रहा है",
    paused: "रुका हुआ",
    coffeeButton: "चलो साथ में कॉफी पीते हैं!",
    notLazy: "आप आलसी नहीं हैं",
    justCreative: "बस रचनात्मक हैं",
    // about
    born: "मैं 15/06/2004 को खम्मम, तेलंगाना में पैदा हुआ था",
    siddhartha: "श्री सिद्धार्थ संस्थान",
    figmaWorkshop: "Figma और UI कार्यशाला",
    notionClub: "Notion कैंपस क्लब",
    googleDev: "Google डेवलपर ग्रुप्स",
    // modal
    selectLanguage: "भाषा चुनें",
    translatesInstantly: "पूरी वेबसाइट का तुरंत अनुवाद करता है",
    // skills
    exploreSkills: "स्किल्स एक्सप्लोर करें",
    clickToClose: "बंद करने के लिए पिल पर क्लिक करें",
    catDesigning: "डिज़ाइनिंग",
    catProduct: "प्रोडक्ट मैनेजमेंट",
    catAi: "AI और प्रॉम्प्टिंग",
    catDevelopment: "डेवलपमेंट",
    catMobile: "iOS / मोबाइल",
    catTools: "टूल्स और प्रोडक्टिविटी",
    // coffee
    coffeeLets: "चलो",
    coffeeHave: "साथ में",
    coffeeCoffee: "कॉफ़ी",
    coffeeTogether: "पीते हैं",
    // reply
    replyContact: "संपर्क",
    replyTitle: "जवाब मिलेगा",
    replyMin: "मिनट में",
    replyAvailable: "काम के लिए उपलब्ध",
    replyDirect: "सीधे संपर्क करें",
    replyMessages: "मैं संदेश हमेशा चेक करता हूँ। जल्दी जवाब मिलेगा।",
    replyElsewhere: "मुझे अन्य जगहों पर खोजें",
    replyBasedIn: "स्थान",
    replyLocation: "हैदराबाद, भारत",
    replyTimezone: "IST (UTC+5:30)",
    // projects
    pjCaseStudies: "केस स्टडीज़",
    pjWallpapers: "वॉलपेपर",
    pjFigmaCommunity: "Figma कम्युनिटी",
    pjIosDev: "iOS डेवलपमेंट",
    pjCourses: "कोर्स",
    pjNotionTemplates: "Notion टेम्पलेट",
    pjGraphicDesign: "ग्राफिक डिज़ाइन",
    pjStickers: "स्टिकर",
    pjChromeExtensions: "Chrome एक्सटेंशन",
    pjVscodeExtensions: "VSCode एक्सटेंशन",
    pjCaseDesc: "मेरी UX डिज़ाइन प्रक्रिया और समस्या समाधान की गहराई से समझ।",
    pjPlaceholder: "प्रोजेक्ट {n} जल्द",
    pjFigmaDesc: "कम्युनिटी के साथ साझा किए गए रिसोर्स, प्लगइन और UI किट।",
    pjIosDesc: "Swift और SwiftUI से बने नेटिव iOS ऐप।",
    pjCoursesDesc: "मेरे द्वारा बनाया गया शैक्षिक कंटेंट और ट्यूटोरियल।",
    pjNotionDesc: "Notion के लिए प्रोडक्टिविटी सिस्टम और टेम्पलेट।",
    pjGraphicDesc: "ब्रांडिंग, सोशल मीडिया एसेट्स और डिजिटल कला।",
    pjStickersDesc: "डेवलपर्स के लिए मज़ेदार कस्टम स्टिकर।",
    pjChromeDesc: "आपके ब्राउज़िंग अनुभव को बेहतर बनाने वाले टूल।",
    pjVscodeDesc: "Visual Studio Code के लिए थीम और उपयोगिताएँ।",
    pjDownloads: "डाउनलोड",
    pjDownloadPack: "पैक डाउनलोड करें",
    flashPlaceholder: "फ्लैशबैक {n}",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const translate = (key: string, params?: Record<string, string | number>) => {
    let text = translations[currentLanguage][key] ?? translations.en[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.split(`{${k}}`).join(String(v));
      }
    }
    return text;
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