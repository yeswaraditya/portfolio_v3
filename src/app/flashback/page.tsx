import Header from "@/components/Header";
import FlashbackContent from "@/components/FlashbackContent";

export default function FlashbackPage() {
  return (
    <main className="min-h-screen bg-[#EEEEEE] flex flex-col text-black w-full overflow-x-hidden">
      <Header />
      <FlashbackContent />
    </main>
  );
}