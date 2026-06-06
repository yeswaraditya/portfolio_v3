import Header from "@/components/Header";
import SkillsContent from "@/components/SkillsContent";

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-[#EEEEEE] flex flex-col pt-32 md:pt-40 text-black w-full overflow-x-hidden">
      <Header />
      <div className="w-full flex-1 flex flex-col">
        <SkillsContent />
      </div>
    </main>
  );
}
