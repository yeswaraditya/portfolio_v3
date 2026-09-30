import Link from "next/link";
import { ArrowUpRight, Award, GraduationCap, Users } from "lucide-react";

const leadership = [
  {
    period: "Oct 2025 – Aug 2026",
    role: "UI/UX & Graphic Design Domain Master",
    organization: "Google Developer Groups On Campus — PVPSIT",
    detail: "Recognized twice for leadership in UI/UX and Graphic Design. Mentored members, designed key digital assets, and led visual identity workflows.",
    color: "#B4FF00",
    text: "text-black",
  },
  {
    period: "Jan 2024 – Aug 2026",
    role: "President",
    organization: "Innovation Club — PVPSIT",
    detail: "Led innovation events, workshops, hackathons, and student-driven technical initiatives across campus.",
    color: "#FFE600",
    text: "text-black",
  },
  {
    period: "Dec 2024 – Aug 2026",
    role: "Member of Lead Council",
    organization: "Notion Student Clubs — PVPSIT",
    detail: "Led the design team and oversaw workflows, content systems, and productivity tool coordination.",
    color: "#FF4D00",
    text: "text-black",
  },
  {
    period: "Aug 2024 – Aug 2026",
    role: "NEC Lead",
    organization: "ED-CELL — PVPSIT",
    detail: "Spearheaded entrepreneurship initiatives and national competition representation.",
    color: "#0055FF",
    text: "text-white",
  },
];

const education = [
  {
    period: "2022 – 2026",
    label: "Undergraduate",
    qualification: "B.Tech in Computer Science & Engineering",
    institution: "Prasad V Potluri Siddhartha Institute of Technology (JNTUK)",
    result: "CGPA: 7.84 / 10",
  },
  {
    period: "2020 – 2022",
    label: "Higher Secondary",
    qualification: "12th Standard (MPC — Intermediate)",
    institution: "Narayana Junior College (Board of Intermediate Education)",
    result: "Final Grade: 71%",
  },
  {
    period: "2019 – 2020",
    label: "Secondary School",
    qualification: "10th Standard (CBSE)",
    institution: "Kennedy High School",
    result: "Final Grade: 75%",
  },
];

const awards = [
  {
    organization: "National Hackathon Competition",
    title: "HackVyuha'25 National Hackathon",
    outcome: "2nd Place Finalist (out of 250+ teams)",
    className: "bg-[#0055FF] text-white",
  },
  {
    organization: "IIT Bombay",
    title: "IIT Bombay NEC'25",
    outcome: "National Finalist",
    className: "bg-[#FF4D00] text-white",
  },
  {
    organization: "National Entrepreneurship Challenge",
    title: "NEC '24 Advanced Track",
    outcome: "Top 20 Selection",
    className: "bg-[#B4FF00] text-black",
  },
];

export default function ExperienceContent() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 pb-28 pt-32 text-black md:px-10 md:pt-40">
      <header className="grid gap-8 border-b-2 border-black pb-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-black/55">Career archive / 2026</p>
          <h1 className="mt-4 text-[clamp(3.6rem,9vw,8.5rem)] font-bold uppercase leading-[0.8] tracking-[-0.06em]" style={{ fontFamily: "var(--font-cabinet)" }}>
            Experience<br />&amp; orbit
          </h1>
        </div>
        <p className="max-w-[32ch] text-base leading-relaxed text-black/70 md:col-span-4 md:pb-1">
          A focused record of leadership, education, and competitive work behind the three portfolio realms.
        </p>
      </header>

      <section className="mt-12 grid gap-6 md:grid-cols-12 md:items-stretch">
        <div className="rounded-2xl border-2 border-black bg-[#FFE600] p-6 shadow-[8px_8px_0_#111] md:col-span-8 md:p-9">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">Overview &amp; focus</p>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-[-0.04em] md:text-5xl" style={{ fontFamily: "var(--font-cabinet)" }}>
            Software engineering,<br />ML &amp; cybersecurity
          </h2>
          <p className="mt-5 max-w-3xl text-base font-medium leading-relaxed md:text-lg">
            Computer Science graduate with expertise in software development and machine learning, currently expanding into cybersecurity through practical work in network reconnaissance, ethical hacking, and Security Operations Center analysis. Dedicated to building visually compelling, user-centered digital experiences and intelligent systems.
          </p>
        </div>
        <div className="flex flex-col justify-between rounded-2xl border-2 border-black bg-black p-6 text-white shadow-[8px_8px_0_#B4FF00] md:col-span-4 md:p-8">
          <Users size={30} className="text-[#B4FF00]" />
          <div className="mt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Leadership record</p>
            <p className="mt-2 text-4xl font-bold tracking-tight">4 roles</p>
            <p className="mt-2 text-sm leading-relaxed text-white/65">Design, innovation, student community, and entrepreneurship leadership.</p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-end justify-between gap-4 border-b-2 border-black pb-4">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/55">01 / Leadership</p>
            <h2 className="mt-2 text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase leading-none tracking-[-0.05em]" style={{ fontFamily: "var(--font-cabinet)" }}>Leadership &amp; experience</h2>
          </div>
          <Users className="mb-1 hidden md:block" size={32} />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {leadership.map((item) => (
            <article key={item.role} className={`rounded-2xl border-2 border-black p-6 shadow-[6px_6px_0_#111] ${item.text}`} style={{ backgroundColor: item.color }}>
              <p className="inline-flex rounded-full bg-black/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">{item.period}</p>
              <h3 className="mt-4 text-2xl font-bold uppercase leading-[0.95] tracking-[-0.03em]" style={{ fontFamily: "var(--font-cabinet)" }}>{item.role}</h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] opacity-80">{item.organization}</p>
              <p className="mt-5 text-sm leading-relaxed opacity-95">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="flex items-end justify-between gap-4 border-b-2 border-black pb-4">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/55">02 / Education</p>
              <h2 className="mt-2 text-[clamp(2.3rem,5vw,4rem)] font-bold uppercase leading-none tracking-[-0.05em]" style={{ fontFamily: "var(--font-cabinet)" }}>Academic track</h2>
            </div>
            <GraduationCap className="mb-1" size={30} />
          </div>
          <div className="mt-6 space-y-5">
            {education.map((item) => (
              <article key={item.qualification} className="rounded-xl border-2 border-black bg-white p-5 shadow-[5px_5px_0_#111]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-black/55">{item.period} • {item.label}</p>
                  <span className="rounded bg-[#B4FF00] px-2 py-1 text-xs font-bold">{item.result}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold uppercase leading-tight tracking-[-0.025em]" style={{ fontFamily: "var(--font-cabinet)" }}>{item.qualification}</h3>
                <p className="mt-2 text-sm font-medium text-black/60">{item.institution}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="flex items-end justify-between gap-4 border-b-2 border-black pb-4">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/55">03 / Recognition</p>
              <h2 className="mt-2 text-[clamp(2.3rem,5vw,4rem)] font-bold uppercase leading-none tracking-[-0.05em]" style={{ fontFamily: "var(--font-cabinet)" }}>Honours</h2>
            </div>
            <Award className="mb-1" size={30} />
          </div>
          <div className="mt-6 space-y-5">
            {awards.map((item) => (
              <article key={item.title} className={`rounded-xl border-2 border-black p-5 shadow-[5px_5px_0_#111] ${item.className}`}>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] opacity-75">{item.organization}</p>
                <h3 className="mt-3 text-xl font-bold uppercase leading-tight tracking-[-0.025em]" style={{ fontFamily: "var(--font-cabinet)" }}>{item.title}</h3>
                <p className="mt-3 text-sm font-bold">{item.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 flex flex-col items-start justify-between gap-6 border-t-2 border-black pt-8 md:flex-row md:items-center">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/55">Continue exploring</p>
          <p className="mt-2 text-2xl font-bold uppercase tracking-[-0.03em]" style={{ fontFamily: "var(--font-cabinet)" }}>See the work across all three realms.</p>
        </div>
        <Link href="/planets" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5">
          Explore planets <ArrowUpRight size={16} />
        </Link>
      </section>
    </div>
  );
}
