import Link from "next/link";

interface PlanetNavProps { currentPlanet: "ui-ux" | "development" | "cybersecurity"; }

const realms = [
  { id: "ui-ux", label: "01 Design", href: "/skills#interface" },
  { id: "development", label: "02 Build", href: "/planets/development" },
  { id: "cybersecurity", label: "03 Security", href: "/planets/cybersecurity" },
] as const;

export default function PlanetRealmNav({ currentPlanet }: PlanetNavProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#eeeeee] text-black">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4 md:px-10 lg:px-16">
        <Link href="/planets" className="font-[family-name:var(--font-cabinet)] text-xl font-black uppercase tracking-[-0.05em] transition-colors hover:text-[#ff4d00]">YEA / Orbits</Link>
        <nav className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] sm:gap-4 sm:text-xs">
          {realms.map((realm) => {
            const selected = realm.id === currentPlanet;
            return <Link key={realm.id} href={realm.href} className={`border-b-2 px-1 py-1 transition-colors ${selected ? "border-[#ff4d00] text-black" : "border-transparent text-black/45 hover:text-black"}`}>{realm.label}</Link>;
          })}
        </nav>
        <Link href="/who-am-i#timeline" className="order-last w-full border-t border-black/15 pt-2 text-center font-mono text-xs font-bold uppercase tracking-[0.08em] transition-colors hover:text-[#ff4d00] sm:order-none sm:w-auto sm:border-0 sm:pt-0">Life &amp; Work Timeline</Link>
        <Link href="/" className="hidden font-mono text-xs font-bold uppercase tracking-[0.1em] text-black/60 transition-colors hover:text-[#ff4d00] md:block">Home</Link>
      </div>
    </header>
  );
}
