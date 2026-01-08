import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BottomGrid from "@/components/BottomGrid";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden bg-[#EEEEEE] flex flex-col">
      <Header />
      <Hero />
      <BottomGrid />
    </main>
  );
}
