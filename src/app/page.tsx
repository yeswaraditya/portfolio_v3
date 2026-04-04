import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BottomGrid from "@/components/BottomGrid";
import UpdatesSection from "@/components/UpdatesSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#EEEEEE] flex flex-col">
      <Header />
      <div className="h-screen flex flex-col flex-shrink-0">
          <Hero />
          <BottomGrid />
      </div>
      <UpdatesSection />
    </main>
  );
}
