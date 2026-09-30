import PlanetDetailPage from "@/components/PlanetDetailPage";

export const metadata = { title: "Engineering Orbit | Eswar Aditya", description: "Selected software, machine learning, and product engineering work by Eswar Aditya." };

export default function DevelopmentPlanetPage() {
  return <PlanetDetailPage currentPlanet="development" index="02" title={"Build\nOrbit"} discipline="Software engineering, machine learning & product systems" intro="I like software that makes complicated things feel calm: clear inputs, honest outputs, and an architecture that holds up when the idea gets real." principle="Build the smallest useful system first. Then make every layer explainable."
    projects={[
      { label: "Applied AI", title: "Feedback analysis with Graph RAG", summary: "A retrieval workflow for exploring customer feedback through both semantic similarity and relationships between the things people mention.", contribution: "Worked on the retrieval approach, knowledge-graph context, query routing, and evidence-led response design.", tools: ["Python", "Neo4j", "Qdrant", "FastAPI"] },
      { label: "Machine learning", title: "UPI fraud signals", summary: "A fraud-detection exploration focused on the signals that make a payment feel unusual: velocity, amount, location context, and behavioral patterns.", contribution: "Built the feature pipeline and evaluation workflow for transaction-risk classification.", tools: ["Python", "scikit-learn", "Pandas", "XGBoost"] },
      { label: "Mobile engineering", title: "Native iOS experiments", summary: "SwiftUI product work that combines on-device capabilities, persistent data, and interfaces designed to feel at home on iPhone.", contribution: "Prototyped the client architecture, interaction patterns, and device-first information flows.", tools: ["Swift", "SwiftUI", "SwiftData", "Vision"] },
      { label: "Web systems", title: "Interactive web products", summary: "Full-stack web experiences where motion and visual craft are part of the product, supported by a practical React and Next.js foundation.", contribution: "Designed and built responsive interfaces, interaction systems, and front-end architecture.", tools: ["Next.js", "React", "TypeScript", "Tailwind"] },
    ]}
    notes={["The machine-learning work is about decision support and careful evaluation—not pretending a model is magic.", "I care about performance because waiting makes an otherwise good interaction feel careless.", "A good prototype exposes the hard questions early enough to change direction."]}
  />;
}
