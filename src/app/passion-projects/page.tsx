import Header from "@/components/Header";
import ProjectGrid from "@/components/PassionProjects/ProjectGrid";

export default function PassionProjectsPage() {
  return (
    <main className="min-h-screen bg-[#EEEEEE] flex flex-col pt-48 text-black w-full overflow-x-hidden">
      <Header />
      <div className="w-full flex-1 flex flex-col">
        <ProjectGrid />
      </div>
    </main>
  );
}
