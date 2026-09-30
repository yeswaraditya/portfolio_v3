import Header from "@/components/Header";
import ExperienceContent from "@/components/ExperienceContent";

export const metadata = {
  title: "Experience & Orbit | Eswar Aditya",
  description: "Leadership, education, awards, and career focus of Eswar Aditya.",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#EEEEEE] text-black">
      <Header />
      <ExperienceContent />
    </main>
  );
}
