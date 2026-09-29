# Design System & Design Language — Portfolio v3

## Executive Summary & Design Philosophy

**Portfolio v3** is a high-contrast, expressive developer & designer portfolio built with **Next.js (App Router)**, **Tailwind CSS v4**, and **GSAP**. The design language combines **Brutalist Grid Structure** (visible 1px borders, high-contrast pure black on light gray canvas), **Expressive Display Typography** (Cabinet Grotesk + Space Mono), **Playful Retro Collage Framing** (rotated photos, hard drop shadows, acid green dot matrixes), and **Vibrant Pop Color Accents** (Electric Blue, Bright Orange-Red, Neon Yellow, Acid Green).

---

## 1. Color Palette & Theming System

### 1.1 Base Palette (CSS Variables)

| Token | CSS Variable | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `--background` | `#EEEEEE` | Main page canvas background, light gray base |
| **Foreground** | `--foreground` | `#000000` | Pure Black primary typography, section borders |
| **Accent Orange-Red** | `--accent-orange` | `#FF4D00` / `#FF6E00` | Primary hero text, transition overlay, about page nav |
| **Accent Yellow** | `--accent-yellow` | `#FFD700` / `#FFE600` | Highlight tags, sticker accents, category headers |
| **Light Card Gray** | — | `#F0F0F0` / `#E0E0E0` | Elevated card surfaces, muted placeholder boxes |
| **Border Gray** | — | `border-neutral-300` / `border-black` | Visible layout grid dividers |

### 1.2 Page-Specific Theming

* **Home (`/`)**: Neutral light gray canvas (`#EEEEEE`) with pure black boxes and signature orange highlights (`#FF4D00`).
* **Who Am I (`/who-am-i`)**: Personal photo story wall with Acid Green (`#B4FF00`) 2x2 dot matrixes, rotated white photo frames with hard drop shadow (`shadow-[7px_7px_0_#111]`), and full-width orange navigation header.
* **Skills (`/skills`)**: Electric Royal Blue (`#0055FF`) background with a white dot matrix grid overlay (`radial-gradient`), white/yellow floating sticker graphics, sticky blue blurred navigation header (`bg-[#0055FF]/90 backdrop-blur-md`), and high-contrast skills catalog cards with alternating vibrant headers (`#FFE600`, `#FF4D00`, `#3DFF8A`).
* **Coffee (`/coffee`)**: Vibrant Cobalt Blue canvas (`#3F85FF`) featuring scattered typography and a rainbow collection of social card chips with unique brand backgrounds:
  * **Instagram**: `#FF2D9F` (Magenta) \| **Twitter / X**: `#FF9F0A` (Orange)
  * **Telegram**: `#34C759` (Green) \| **YouTube**: `#FF3B30` (Red)
  * **GitHub**: `#1C1C1E` (Dark Slate) \| **LinkedIn**: `#8B5CF6` (Purple)
  * **Email**: `#5AC8FA` (Sky Blue) \| **Behance**: `#C6FF00` (Lime)
  * **Discord**: `#7C3AED` (Violet) \| **Dribbble**: `#FF375F` (Pink)
  * **Figma**: `#FF7262` (Coral Red)
* **Passion Projects (`/passion-projects`)**: Filter grid with distinct category color themes:
  * **Case Studies**: `#4285F4` (Google Blue) \| **Wallpapers**: `#FDE047` (Bright Yellow)
  * **Figma Community**: `#FF55FF` (Neon Pink) \| **iOS Development**: `#40E0D0` (Turquoise)
  * **Courses**: `#FF2453` (Crimson) \| **Notion Templates**: `#FF7340` (Burnt Orange)
  * **Graphic Design**: `#ADFF2F` (Green-Yellow) \| **Stickers**: `#FFB300` (Amber)
  * **Chrome Extensions**: `#7C3AED` (Deep Purple) \| **VSCode Extensions**: `#6DE385` (Mint)

---

## 2. Typography System

The application uses a strict 4-font typography hierarchy configured in Next.js `layout.tsx` and mapped via `@theme inline` in `globals.css`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent-orange: var(--accent-orange);
  --color-accent-yellow: var(--accent-yellow);
  --font-sans: var(--font-inter);
  --font-mono: var(--font-space-mono);
  --font-roboto: var(--font-roboto);
  --font-cabinet: var(--font-cabinet);
}
```

### 2.1 Font Roles

1. **Cabinet Grotesk (`var(--font-cabinet)`)** — *Display Headline Font*
   * Local font weights: 400 (Regular), 700 (Bold).
   * Used for ultra-bold impact titles, hero headlines (`"ART"`), section headers (`"WHO AM I"`, `"Skill set."`, `"UPDATES..."`), and footer marquee text (`"YOU ARE NOT LAZY JUST CREATIVE"`).
   * Styling: Tight letter spacing (`tracking-[-0.05em]`), ultra-compressed leading (`leading-[0.82]`).

2. **Space Mono (`var(--font-space-mono)`)** — *Technical Mono Label Font*
   * Google Font weights: 400, 700.
   * Used for technical badges, micro-labels (`"HUMANS DIE"`, `"art won't save it"`), countdown timers, metadata timestamps (`"15 / 06 / 2004"`), and button tags.
   * Styling: Uppercase, wide tracking (`tracking-[0.18em]` / `tracking-widest`).

3. **Roboto (`var(--font-roboto)`)** — *Navigation & Caption Font*
   * Local font weights: 300 (Light), 400 (Regular), 700 (Bold), 900 (Black).
   * Used for header menu links (`"SKILLS"`, `"PASSION PROJECTS"`), image captions, and category tag badges.

4. **Inter (`var(--font-inter)`)** — *Primary Body Font*
   * Google Font default sans font.
   * Used for multi-paragraph body text, modal descriptions, and general UI text copy.

---

## 3. Layout & Architectural Grid

### 3.1 Grid Structure
* **Border Grid System**: Layout boundaries use explicit 1px solid neutral borders (`border border-neutral-300` or `border-black`), creating structured, scannable brutalist compartments.
* **Crop Marks (`+` Crosshairs)**: Corners of key focal elements (e.g., Hero Portrait image) feature absolute-positioned 14px crosshair lines (`CropMark` component) extending outward from frame corners.
* **Photo Frame Cards**: Photo items inside `/who-am-i` use white background containers with 8px padding (`p-2`), dark retro drop shadows (`shadow-[7px_7px_0_#111]`), and slight rotational angles (`rotate-[-2deg]`, `rotate-[1.5deg]`).

### 3.2 Visual Accent Elements
* **Green Dot Matrix**: 2x2 grid of Acid Green (`#B4FF00`) square dots used as decorative accents on the Who Am I page.
* **Dot Grid Pattern**: CSS radial-gradient background (`radial-gradient(circle, rgba(255,255,255,0.95) 1.15px, transparent 1.2px)`) at 18px grid spacing, providing texture for the Skills page.
* **Leaf Animations**: Overlapping rectangular boxes on the hero page featuring pink and violet leaf imagery sliding in from opposite directions.

---

## 4. Animation Engine & Motion Principles

Animations are powered by **GSAP (GreenSock Animation Platform)** with `@gsap/react` (`useGSAP` hook) and `ScrollTrigger`.

### 4.1 Key Animations & Micro-Interactions

1. **Hero Reveal**:
   * Staggered fade-in/up of `.hero-element` components (`y: 28, opacity: 0, duration: 0.9s, stagger: 0.12s, ease: power3.out`).
   * Leaf image wrapper crops slide horizontally (`xPercent: -100` to `0`, `duration: 1.2s, ease: power3.inOut`).

2. **Circle Clip-Path Page Transition**:
   * Clicking `"WHO AM I →"` on the home page triggers an expanding circular overlay (`clipPath: circle(0% at click_x click_y)` to `circle(150%)`).
   * Background turns Accent Orange (`#FF6E00`), text animates from click position to screen center while swapping content (`"WHO AM I →"` to `"wHo aM ililililili"`).

3. **Interactive Mouse Depth Parallax (Skills Poster)**:
   * `stageRef` tracks real-time mouse coordinates relative to the container center.
   * DOM elements with `data-depth` attributes translate along X/Y axes proportional to depth (`x: mouse_x * depth * 24`, `y: mouse_y * depth * 14`).
   * Smooth reset on `mouseleave` with `power3.out`.

4. **Organic Floating Sine Movement**:
   * Stickers on `/skills` (Grad Cap, Eyes, Peace Hand, Squiggle) and social cards on `/coffee` execute infinite gentle floating/rotation via GSAP (`yoyo: true, repeat: -1, ease: sine.inOut`).

5. **Contact Timer & Pulse**:
   * Contact page (`/reply`) features a numeric GSAP counter tweening from `10:00` down to `0:00`, switching text to `"NOW"`, followed by infinite scaling pulse (`scale: 1.02`).

6. **Music Visualizer Bars**:
   * Header music toggle contains CSS animated equalizer bars oscillating between 3px and 12px (`animate-[music-bar_*]`).

7. **Spinning Ticker Asterisk**:
   * Marquee sections feature an asterisk icon spinning continuously at 8s per revolution (`animate-spin-slow`).

---

## 5. Audio & Multi-Language Subsystems

### 5.1 Global Music System (`MusicContext.tsx`)
* Persistent background audio state managing playlist progression across routes.
* Integrated audio tracks (from Epidemic Sound):
  1. *Godspeed* — Zorro (Default Track)
  2. *PRESSURE!* — Nyck Caution
  3. *Not Gonna Wake Up* — Mindme
  4. *Let Me Go* — Snake City
  5. *Pretty* — Flux Vortex
  6. *Kill These Butterflies* — Cospe
* Audio player widget on the homepage bottom grid displays track navigation (Skip Prev/Next, Play/Pause) alongside 6 pill-shaped album art indicators containing grayscale childhood photos.

### 5.2 Multi-Language Context (`LanguageContext.tsx`)
* Supports instant site-wide string translation across 5 languages:
  * **English (`en`)** \| **Spanish (`es`)** \| **French (`fr`)** \| **Japanese (`ja`)** \| **Hindi (`hi`)**
* Accessible modal dialog (`LanguageModal.tsx`) triggered via header or bottom grid `あ乙` button.

### 5.3 Custom Cursor (`CustomCursor.tsx`)
* Replaces browser pointer with custom finger cursor image (`/finger.png`, 96px x 96px, `z-[999999]`).
* Positions tracked smoothly using GSAP `to` with short duration (0.1s).

---

## 6. Route & Component Architecture

```
src/
├── app/
│   ├── layout.tsx             # Root layout: Fonts, Language & Music Providers, Cursor, Sound, Analytics
│   ├── globals.css            # Tailwind directives, CSS variables, keyframe utility classes
│   ├── page.tsx               # Home route: Header + Hero + BottomGrid
│   ├── who-am-i/page.tsx      # About route: WhoAmIContent
│   ├── skills/page.tsx        # Skills route: SkillsContent + SkillsCatalog
│   ├── passion-projects/page.tsx # Projects route: ProjectGrid
│   ├── coffee/page.tsx        # Social Canvas route: CoffeeContent
│   ├── reply/page.tsx         # Contact route: ReplyContent
│   └── flashback/page.tsx     # Archive route: FlashbackContent
├── components/
│   ├── Header.tsx             # Dynamic route-aware sticky navigation bar & music status
│   ├── Hero.tsx               # Landing hero with leaf reveal & crop marks
│   ├── BottomGrid.tsx         # 3-column bottom bar with translation, WHO AM I transition, music player, ticker
│   ├── WhoAmIContent.tsx      # Photo story wall with rotated frames & dot matrixes
│   ├── SkillsContent.tsx      # 3D parallax poster stage with floating stickers
│   ├── SkillsCatalog.tsx      # 9-category detailed skill cards grid
│   ├── CoffeeContent.tsx      # Interactive floating social cards canvas
│   ├── ReplyContent.tsx       # Countdown contact page & social links
│   ├── FlashbackContent.tsx   # Archive timeline component
│   ├── CustomCursor.tsx       # GSAP-powered custom finger pointer
│   ├── LanguageModal.tsx      # Language selector modal dialog
│   ├── NavigationProgress.tsx # Top progress indicator bar
│   ├── SoundEffects.tsx       # Interactive audio feedback engine
│   └── PassionProjects/
│       ├── ProjectGrid.tsx    # Category tab selector grid
│       └── ProjectContents.tsx# Category content renderers & wallpaper download engine
└── context/
    ├── LanguageContext.tsx    # Global translation state (en, es, fr, ja, hi)
    └── MusicContext.tsx       # Global audio playlist state controller
```

---

## 7. Summary of Design Tokens

| Category | Token / Value | Application |
| :--- | :--- | :--- |
| **Fonts** | Cabinet Grotesk, Space Mono, Roboto, Inter | Display titles, Mono labels, Nav/Captions, Body text |
| **Primary Colors** | `#EEEEEE` (BG), `#000000` (FG), `#FF4D00` (Orange) | Background, Text, Primary Accent |
| **Secondary Accents** | `#FFE600` (Yellow), `#0055FF` (Blue), `#3F85FF` (Cobalt) | Skill poster, Stickers, Coffee canvas |
| **Accent Green** | `#B4FF00` (Acid Green), `#3DFF8A` (Mint) | Dot matrixes, skill card highlights |
| **Shadows** | `shadow-[7px_7px_0_#111]`, `shadow-[8px_8px_0_#001A66]` | Retro brutalist photo frames & skill cards |
| **Borders** | `1px solid border-neutral-300` / `border-black` | Compartment dividers & section grid lines |
| **Animations** | GSAP (`power3.out`, `power3.inOut`, `back.out(1.7)`) | Smooth, bouncy, high-polish transitions |
