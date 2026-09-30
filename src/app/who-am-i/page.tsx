import Header from "@/components/Header";
import WhoAmIContent from "@/components/WhoAmIContent";

export const metadata = {
  title: "Who Am I — Life & Work | Eswar Aditya",
  description: "Eswar Aditya's story, from childhood in Khammam to design, computer science, community leadership, and cybersecurity.",
};

export default function WhoAmIPage() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#F2F2EE] text-[#171717]">
      <Header />
      <WhoAmIContent />
    </main>
  );
}
