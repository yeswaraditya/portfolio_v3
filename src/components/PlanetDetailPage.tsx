import Link from "next/link";
import PlanetRealmNav from "@/components/PlanetRealmNav";
import LifeTimelineSection from "@/components/LifeTimelineSection";

type Project = { label: string; title: string; summary: string; contribution: string; tools: string[] };
type PlanetDetailPageProps = { index: string; title: string; discipline: string; intro: string; principle: string; projects: Project[]; notes: string[]; currentPlanet: "ui-ux" | "development" | "cybersecurity" };

export default function PlanetDetailPage({ index, title, discipline, intro, principle, projects, notes, currentPlanet }: PlanetDetailPageProps) {
  return (
    <div className="min-h-screen bg-[#eeeeee] text-black selection:bg-[#ff4d00] selection:text-white">
      <PlanetRealmNav currentPlanet={currentPlanet} />
      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-32 md:px-10 md:pt-40 lg:px-16">
        <section className="grid border-b-2 border-black pb-12 lg:grid-cols-12 lg:gap-10">
          <div className="mb-10 flex items-start justify-between lg:col-span-4 lg:mb-0"><p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">Orbit {index} / Selected work</p><span className="text-5xl leading-none text-[#ff4d00]">●</span></div>
          <div className="lg:col-span-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-black/55">{discipline}</p>
            <h1 className="max-w-4xl whitespace-pre-line font-[family-name:var(--font-cabinet)] text-6xl font-black uppercase leading-[0.84] tracking-[-0.065em] sm:text-8xl lg:text-[9.5rem]">{title}</h1>
            <div className="mt-10 grid gap-6 border-t border-black pt-5 md:grid-cols-2"><p className="max-w-md text-lg leading-snug md:text-xl">{intro}</p><p className="font-mono text-sm leading-relaxed text-black/65"><span className="text-black">Working principle / </span>{principle}</p></div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="mb-6 flex items-baseline justify-between border-b border-black pb-3"><h2 className="font-mono text-xs font-bold uppercase tracking-[0.18em]">Selected work</h2><span className="font-mono text-xs text-black/55">{String(projects.length).padStart(2, "0")} entries</span></div>
          <div className="border-t-2 border-black">{projects.map((project, projectIndex) => <article key={project.title} className="group grid border-b border-black py-7 transition-colors hover:bg-black hover:text-[#eeeeee] md:grid-cols-12 md:gap-8 md:py-10"><div className="mb-5 flex items-start justify-between md:col-span-2 md:mb-0"><span className="font-mono text-xs">{String(projectIndex + 1).padStart(2, "0")}</span><span className="font-mono text-[10px] uppercase tracking-[0.16em] md:hidden">{project.label}</span></div><div className="md:col-span-6"><p className="mb-3 hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[#ff4d00] md:block">{project.label}</p><h3 className="max-w-2xl font-[family-name:var(--font-cabinet)] text-3xl font-black uppercase leading-[0.94] tracking-[-0.04em] md:text-5xl">{project.title}</h3><p className="mt-5 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">{project.summary}</p></div><div className="mt-6 flex flex-col justify-between md:col-span-4 md:mt-0"><p className="border-l-2 border-[#ff4d00] pl-4 font-mono text-xs leading-relaxed opacity-80">{project.contribution}</p><div className="mt-8 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.1em] opacity-65">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div></article>)}</div>
        </section>
        <section className="grid border-y-2 border-black py-8 md:grid-cols-12 md:gap-8 md:py-10"><div className="mb-5 md:col-span-3 md:mb-0"><p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">Practice notes</p></div><div className="grid gap-6 md:col-span-9 md:grid-cols-3">{notes.map((note, noteIndex) => <p key={note} className="border-t border-black pt-3 text-sm leading-relaxed md:text-base"><span className="mr-2 font-mono text-xs text-[#ff4d00]">0{noteIndex + 1}</span>{note}</p>)}</div></section>
        <LifeTimelineSection />
        <footer className="flex flex-col items-start justify-between gap-8 pt-12 md:flex-row md:items-end"><p className="max-w-sm font-[family-name:var(--font-cabinet)] text-3xl font-black uppercase leading-none tracking-[-0.04em]">Three disciplines. One curious practice.</p><div className="flex flex-wrap gap-3">{currentPlanet === "ui-ux" && <Link href="/skills#interface" className="inline-flex border-2 border-black px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-[#ff4d00] hover:text-[#ff4d00]">Complete UI/UX journey</Link>}<Link href="/planets" className="inline-flex border-2 border-black bg-black px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#eeeeee] transition-colors hover:border-[#ff4d00] hover:bg-[#ff4d00]">Back to all orbits</Link></div></footer>
      </main>
    </div>
  );
}
