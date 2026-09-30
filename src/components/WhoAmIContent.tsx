"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: "2004", title: "The beginning", detail: "Born on 15 June in Khammam, Telangana." },
  { year: "Childhood", title: "What makes a product work?", detail: "Growing up in Vijayawada, I was eager to understand how things were made. I would unscrew my RC car and explore what was inside." },
  { year: "2019–2020", title: "School years", detail: "10th standard at Kennedy High School, CBSE." },
  { year: "During COVID", title: "Time to explore computers", detail: "The pandemic gave me more time to explore computers and follow my curiosity." },
  { year: "2020–2022", title: "Finding a direction", detail: "MPC intermediate studies at Narayana Junior College." },
  { year: "2022–2026", title: "Computer science", detail: "B.Tech in Computer Science & Engineering at PVPSIT, affiliated with JNTUK." },
  { year: "Second year of college", title: "Teaching myself UI/UX", detail: "I started learning UI/UX on my own, adding interface and visual design to my interest in how products work." },
  { year: "2024", title: "Building communities", detail: "Innovation Club President, ED-CELL NEC Lead, and Notion Student Clubs Lead Council member." },
  { year: "2025", title: "Design & recognition", detail: "UI/UX & Graphic Design Domain Master at GDG On Campus. HackVyuha’25 and IIT Bombay NEC’25 recognition." },
  { year: "Today", title: "Three paths, one practice", detail: "Software engineering and machine learning, visual design, and a growing focus on cybersecurity." },
] as const;

function Chapter({ number, title, children, id }: { number: string; title: string; children: React.ReactNode; id: string }) {
  return (
    <header id={id} className="wai-block mt-20 grid scroll-mt-28 gap-5 border-t border-black/20 pt-6 md:mt-28 md:grid-cols-12 md:gap-8">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-black/50 md:col-span-3">{number} / Life notes</p>
      <div className="md:col-span-9">
        <h2 className="font-[family-name:var(--font-cabinet)] text-4xl font-bold uppercase leading-[0.95] tracking-[-0.04em] md:text-6xl">{title}</h2>
        <div className="mt-5 max-w-2xl text-base leading-relaxed text-black/70 md:text-lg">{children}</div>
      </div>
    </header>
  );
}

function GreenDots({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-1.5 ${className}`} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-5 w-5 bg-[#B4FF00] md:h-7 md:w-7" />
      ))}
    </div>
  );
}

function Frame({
  src,
  alt,
  caption,
  className = "",
  aspect = "aspect-[4/3]",
  rotate = 0,
  fit = "cover",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspect?: string;
  rotate?: number;
  fit?: "cover" | "contain";
}) {
  return (
    <figure
      className={`wai-block border border-black/10 bg-white p-2 shadow-[4px_5px_0_rgba(0,0,0,0.14)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className={`relative w-full overflow-hidden bg-neutral-100 ${aspect}`}>
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 550px" className={fit === "contain" ? "object-contain" : "object-cover"} />
      </div>
      {caption ? (
        <figcaption
          className="px-1 pt-2 text-[11px] font-bold uppercase tracking-[0.16em]"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function WhoAmIContent() {
  const ref = useRef<HTMLDivElement>(null);
  const { translate } = useLanguage();

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".wai-intro", {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.utils.toArray<HTMLElement>(".wai-block").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="mx-auto w-full max-w-[1180px] px-5 pb-28 pt-28 md:px-10 md:pt-32">
      <header className="wai-intro grid items-end gap-10 border-b border-black/20 pb-10 md:grid-cols-12 md:pb-14">
        <div className="min-w-0 md:col-span-8">
          <p
            className="text-[12px] font-bold uppercase tracking-[0.32em]"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Eswar Aditya / A personal archive
          </p>
          <h1
            className="mt-3 max-w-full text-[clamp(3.2rem,8.5vw,7.2rem)] font-bold uppercase leading-[0.82] tracking-[-0.05em]"
            style={{ fontFamily: "var(--font-cabinet)" }}
          >
            {translate("whoAmI")}
          </h1>
          <p className="mt-5 max-w-[36ch] text-base leading-relaxed md:text-lg">
            I’m Eswar Aditya. A designer, developer, and Computer Science graduate, exploring how things look, how they work, and how to make them safer.
          </p>
        </div>
        <div className="flex flex-col gap-5 md:col-span-4 md:border-l md:border-black/20 md:pl-8">
          <GreenDots className="w-fit" />
          <dl className="space-y-3 text-sm">
            <div><dt className="font-mono text-xs uppercase tracking-wider text-black/45">Born</dt><dd className="mt-1">15 June 2004 · Khammam, Telangana</dd></div>
            <div><dt className="font-mono text-xs uppercase tracking-wider text-black/45">Education</dt><dd className="mt-1">Computer Science & Engineering · PVPSIT</dd></div>
            <div><dt className="font-mono text-xs uppercase tracking-wider text-black/45">Grew up in</dt><dd className="mt-1">Vijayawada, Andhra Pradesh</dd></div>
            <div><dt className="font-mono text-xs uppercase tracking-wider text-black/45">My practice</dt><dd className="mt-1">Design · Development · Cybersecurity</dd></div>
          </dl>
        </div>
      </header>

      <nav aria-label="Personal story chapters" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wide">
        {[["#beginnings", "01 Beginnings"], ["#campus", "02 Campus life"], ["#today", "03 Today"], ["#timeline", "Life & work timeline"]].map(([href, label]) => (
          <a key={href} href={href} className="border-b border-transparent pb-1 transition-colors hover:border-[#FF4D00] hover:text-[#FF4D00]">{label}</a>
        ))}
      </nav>

      <Chapter number="01" title="Every story starts somewhere." id="beginnings">
        <p>{translate("born")}. I grew up in Vijayawada, curious about what makes a product work. A car was a complete product to me, and I wanted to understand the parts behind it. I would unscrew my RC car and explore what was inside.</p>
        <p className="mt-4">During COVID, I had more time to explore computers. That gave my curiosity another place to grow.</p>
      </Chapter>

      <div className="mt-14 grid grid-cols-12 items-end gap-4 md:mt-20 md:gap-6">
        <Frame
          src="/about/baby.jpg"
          alt="Day one"
          caption="The beginning / Family archive"
          rotate={-2}
          aspect="aspect-[4/3]"
          className="col-span-7 md:col-span-5"
        />
        <Frame
          src="/about/childhood-suit.jpg"
          alt="Childhood"
          caption="Childhood / Family archive"
          rotate={2}
          aspect="aspect-[3/4]"
          className="col-span-5 md:col-span-3 md:col-start-9"
        />
      </div>

      <div className="mt-8 grid grid-cols-12 items-start gap-4 md:mt-12 md:gap-6">
        <Frame
          src="/about/childhood-wall-2.jpg"
          alt="Childhood event"
          rotate={-2}
          aspect="aspect-[3/4]"
          className="col-span-6 md:col-span-4"
        />
        <Frame
          src="/about/childhood-wall-1.jpg"
          alt="Childhood event"
          rotate={1.5}
          aspect="aspect-[3/4]"
          className="col-span-6 md:col-span-3 md:mt-16"
        />
        <Frame
          src="/about/childhood-wall-3.jpg"
          alt="Childhood event"
          rotate={-1}
          aspect="aspect-[4/5]"
          className="col-span-8 md:col-span-3 md:mt-6"
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-12 md:gap-6">
        <Frame
          src="/about/childhood-face-1.jpg"
          alt="Portrait"
          rotate={-1}
          aspect="aspect-[4/3]"
          className="md:col-span-4"
        />
        <Frame
          src="/about/childhood-face-2.jpg"
          alt="Portrait smiling"
          rotate={1}
          aspect="aspect-[4/3]"
          className="md:col-span-4 md:col-start-6 md:mt-10"
        />
        <GreenDots className="col-span-2 mt-2 justify-self-end md:col-span-2 md:col-start-11 md:mt-24" />
      </div>

      <Chapter number="02" title="Learning. Making. Sharing." id="campus">
        <p>From Kennedy High School and Narayana Junior College to studying Computer Science at PVPSIT, the journey grew beyond the classroom. Design workshops, student clubs, and entrepreneurship became part of it.</p>
        <p className="mt-4">In my second year of college, I started teaching myself UI/UX. My interest in how products work grew to include how people experience them. I also worked as a designer with GDG On Campus from 2023 to 2026.</p>
        <p className="mt-4">I served as President of the Innovation Club, NEC Lead at ED-CELL, a Lead Council member at Notion Student Clubs, and UI/UX & Graphic Design Domain Master at GDG On Campus.</p>
      </Chapter>

      <div className="mt-14 grid grid-cols-12 items-end gap-4 md:mt-20 md:gap-8">
        <Frame
          src="/about/speaking.jpg"
          alt="Speaking at institute"
          caption={translate("siddhartha")}
          rotate={-1.5}
          aspect="aspect-[3/4]"
          className="col-span-12 sm:col-span-5"
        />
        <Frame
          src="/about/figma-workshop-1.jpg"
          alt="Figma workshop"
          caption={translate("figmaWorkshop")}
          rotate={1}
          aspect="aspect-[4/3]"
          className="col-span-12 sm:col-span-7"
        />
      </div>

      <div className="mt-14 grid grid-cols-12 items-end gap-4 md:mt-20 md:gap-8">
        <Frame
          src="/about/notion-club.jpg"
          alt="Notion club"
          caption={translate("notionClub")}
          rotate={-1}
          fit="contain"
          aspect="aspect-[5/4]"
          className="col-span-12 bg-white md:col-span-6"
        />
        <Frame
          src="/about/google-dev.jpg"
          alt="Google Developer Groups"
          caption={translate("googleDev")}
          aspect="aspect-[16/10]"
          className="col-span-12 md:col-span-6"
        />
      </div>

      <Chapter number="03" title="Still curious. Still building." id="today">
        <p>My work spans visual identity and interface design, software engineering, and machine learning. I’m now expanding into cybersecurity through network reconnaissance, ethical hacking, and SOC analysis.</p>
        <p className="mt-4">Away from the screen, cooking is my hobby.</p>
        <p className="mt-4">The career archive holds the detailed record. Here, the photos and milestones tell the personal story behind it.</p>
        <Link href="/planets" className="mt-6 inline-block border-b-2 border-[#FF4D00] pb-1 font-mono text-sm font-bold uppercase tracking-wide text-black hover:text-[#FF4D00]">Explore my Career Playground</Link>
      </Chapter>

      <section aria-labelledby="career-notes-heading" className="wai-block mt-12">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-black/50">The work so far</p>
        <h2 id="career-notes-heading" className="mt-3 font-[family-name:var(--font-cabinet)] text-3xl font-bold uppercase tracking-tight md:text-4xl">Three sides of my practice.</h2>
        <div className="mt-6 grid border-y border-black/20 md:grid-cols-3">
          {[
            { name: "UI/UX & design", href: "/skills#interface", detail: "Self-taught since my second year of college. My work includes TrackCode’s contest dashboards, component systems, graphic design, and branding. I delivered two hands-on Figma workshops and led design work in GDG and Notion Student Clubs.", learning: "Wireframing, user journeys, prototyping, visual identity, and reusable components." },
            { name: "Development & ML", href: "/planets/development", detail: "I built AskIt, an anonymous Q&A platform, and MarkMe, an event-management app. My ML work includes UPI fraud detection and an explainable customer-feedback RAG system using graph-based orchestration and hybrid retrieval.", learning: "Real-time web applications, mobile development, APIs, data preprocessing, feature engineering, and model evaluation." },
            { name: "Cybersecurity", href: "/planets/cybersecurity", detail: "I’m expanding into cybersecurity with a practical focus on network reconnaissance, ethical hacking, and SOC analysis. My current toolkit includes Kali Linux, Nmap, theHarvester, Maigret, and ProxyChains.", learning: "Network mapping, open-source intelligence, vulnerability-assessment concepts, and defensive analysis." },
          ].map((area, index) => (
            <article key={area.name} className="border-b border-black/15 py-6 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0 md:[&:not(:last-child)]:border-r">
              <p className="font-mono text-xs text-[#FF4D00]">0{index + 1}</p>
              <h3 className="mt-3 font-[family-name:var(--font-cabinet)] text-2xl font-bold">{area.name}</h3>
              <p className="mt-4 text-base leading-relaxed text-black/70">{area.detail}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/60"><span className="font-semibold text-black">Learning &amp; practice: </span>{area.learning}</p>
              <Link href={area.href} className="mt-5 inline-block border-b border-black pb-1 font-mono text-xs font-bold uppercase tracking-wide hover:border-[#FF4D00] hover:text-[#FF4D00]">Explore this journey</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="timeline" className="wai-block mt-20 scroll-mt-28 border-t border-black/20 pt-6 md:mt-28">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs uppercase tracking-wide text-[#FF4D00]">2004 — today</p>
            <h2 className="mt-4 font-[family-name:var(--font-cabinet)] text-4xl font-bold uppercase leading-[0.9] tracking-[-0.04em] md:text-5xl">Life &amp; work<br />timeline</h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-black/60">The milestones so far. More memories and events will be added as this personal archive grows.</p>
          </div>
          <ol className="border-l border-black/20 md:col-span-8">
            {MILESTONES.map((event) => (
              <li key={event.year} className="relative border-b border-black/10 pb-7 pl-6 pt-5 first:pt-0 last:border-0 [&:first-child>span]:top-1">
                <span aria-hidden className="absolute -left-[5px] top-6 h-[9px] w-[9px] rounded-full bg-[#FF4D00]" />
                <p className="font-mono text-xs uppercase tracking-wide text-black/50">{event.year}</p>
                <h3 className="mt-2 font-[family-name:var(--font-cabinet)] text-2xl font-bold tracking-tight">{event.title}</h3>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-black/65">{event.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wai-block mt-12 grid gap-8 border-t border-black/20 pt-6 md:grid-cols-2">
        <div>
          <h2 className="font-[family-name:var(--font-cabinet)] text-3xl font-bold uppercase tracking-tight">Learning beyond class.</h2>
          <p className="mt-4 text-base leading-relaxed text-black/70">Alongside my degree, I completed Microsoft Azure Fundamentals (AZ-900), Agile with Atlassian Jira, and Red Hat Enterprise Linux Fundamentals. My profile also includes Notion Advanced and Workflows badges, prompt engineering, and data visualisation.</p>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-cabinet)] text-3xl font-bold uppercase tracking-tight">Working with people.</h2>
          <p className="mt-4 text-base leading-relaxed text-black/70">As NEC Lead, I led a 24-member team through strategy, coordination, and execution. The competitive journey includes NEC ’24 Advanced Track Top 20 selection, IIT Bombay NEC ’25 national finalist recognition, second place among 250+ teams at HackVyuha ’25, and first prize in an E-Cell startup-ideation competition.</p>
        </div>
      </section>

      <section className="wai-block mt-16 border-l-4 border-[#FF4D00] bg-white p-6 text-black md:mt-24 md:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ fontFamily: "var(--font-roboto)" }}>
          Beyond the photos
        </p>
        <h2 className="mt-2 text-2xl font-bold uppercase tracking-[-0.03em] md:text-4xl" style={{ fontFamily: "var(--font-cabinet)" }}>
          The work behind the person
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed md:text-lg font-medium text-black/90">
          Leadership, education, honours, and the work I&apos;ve built live in a dedicated career archive.
        </p>
        <Link
          href="/experience"
          className="mt-6 inline-flex items-center bg-black px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#FF4D00]"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          Open career archive
        </Link>
      </section>

      <div className="mt-16 flex justify-center md:mt-24">
        <Frame
          src="/about/flow-work.gif"
          alt="Music and work"
          caption="Music & work / The everyday rhythm"
          fit="contain"
          aspect="aspect-[3/4]"
          className="w-full max-w-[380px] bg-black"
        />
      </div>
    </div>
  );
}
