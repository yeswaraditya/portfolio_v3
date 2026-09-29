import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BottomGrid from "@/components/BottomGrid";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden bg-[#EEEEEE] flex flex-col">
      <Header />
      <div className="flex min-h-0 flex-1 flex-col pt-16">
        <Hero />
        <BottomGrid />
      </div>
    </main>
  );
}
