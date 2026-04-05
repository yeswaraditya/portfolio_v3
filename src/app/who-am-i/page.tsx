import Header from "@/components/Header";
import WhoAmIContent from "@/components/WhoAmIContent";

export default function WhoAmIPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-accent-orange text-black relative">
      <Header />
      <WhoAmIContent />
    </main>
  );
}
