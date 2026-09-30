import Link from "next/link";

export default function LifeTimelineSection() {
  return (
    <section aria-labelledby="life-timeline-heading" className="border-b-2 border-black bg-[#eeeeee] py-10 text-black md:py-14">
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ff4d00] md:col-span-3">
          From the beginning
        </p>
        <div className="md:col-span-9">
          <h2 id="life-timeline-heading" className="font-[family-name:var(--font-cabinet)] text-4xl font-black uppercase leading-none tracking-[-0.04em] md:text-5xl">
            Life &amp; Work Timeline
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-black/70">
            The full story, from birth to today: the experiences, people, learning, and milestones that shaped my journey.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-black/55">
            Full timeline coming later
          </p>
          <Link href="/who-am-i#timeline" className="mt-6 inline-block border-2 border-black bg-black px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#ff4d00] hover:bg-[#ff4d00]">
            Read my story
          </Link>
        </div>
      </div>
    </section>
  );
}
