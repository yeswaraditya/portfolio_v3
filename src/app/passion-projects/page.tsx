import Header from "@/components/Header";
import ProjectGrid from "@/components/PassionProjects/ProjectGrid";

export default function PassionProjectsPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col pt-24 text-white">
      <Header />
      
      <div className="px-6 py-12 md:px-12 flex flex-col gap-8">
        <div className="flex justify-between items-end border-b border-white/20 pb-4">
            <h1 className="text-4xl md:text-6xl font-bold">Passion Projects</h1>
        </div>
        
        <ProjectGrid />
      </div>
    </main>
  );
}
