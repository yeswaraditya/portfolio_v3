import PlanetRealmNav from "@/components/PlanetRealmNav";
import SkillsContent from "@/components/SkillsContent";
import LifeTimelineSection from "@/components/LifeTimelineSection";

export default function SkillsPage() {
  return (
    <main className="min-h-svh w-full">
      <PlanetRealmNav currentPlanet="ui-ux" />
      <SkillsContent />
      <div className="bg-[#eeeeee] px-6 md:px-10">
        <div className="mx-auto max-w-[1180px]">
          <LifeTimelineSection />
        </div>
      </div>
    </main>
  );
}
