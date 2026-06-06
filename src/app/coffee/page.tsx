import Header from "@/components/Header";
import CoffeeContent from "@/components/CoffeeContent";

export default function CoffeePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: "#3F85FF" }}>
      <Header />
      <div className="pt-24 md:pt-28">
        <CoffeeContent />
      </div>
    </main>
  );
}
