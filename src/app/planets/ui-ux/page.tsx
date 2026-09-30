import PlanetDetailPage from "@/components/PlanetDetailPage";

export const metadata = { title: "Design Orbit | Eswar Aditya", description: "Selected visual systems, product design, and creative direction by Eswar Aditya." };

export default function UIUXPlanetPage() {
  return <PlanetDetailPage currentPlanet="ui-ux" index="01" title={"Design\nOrbit"} discipline="Visual systems, interfaces & creative direction" intro="I make identity and interface work that is direct, legible, and built to survive beyond the first presentation." principle="Start with a clear point of view. Turn it into a system people can actually use."
    projects={[
      { label: "Identity system", title: "NO-TEMPLATE", summary: "An anti-generic identity system with a loud typographic voice, clear rules, and enough range to live across social, web, and event material.", contribution: "Built the visual language, wordmark direction, type hierarchy, layout rules, and rollout assets.", tools: ["Identity", "Typography", "Illustrator", "Figma"] },
      { label: "Product design", title: "Native iOS flows", summary: "Mobile journeys designed around real touch targets, readable information, and the quiet details that make a native product feel considered.", contribution: "Mapped key flows and translated interface decisions into implementation-ready SwiftUI specifications.", tools: ["UX flows", "Prototyping", "iOS HIG", "SwiftUI"] },
      { label: "Design infrastructure", title: "Component libraries", summary: "Reusable interface foundations that reduce one-off decisions while keeping the product’s character intact.", contribution: "Defined component anatomy, responsive behavior, interaction states, and handoff documentation.", tools: ["Design systems", "Variables", "Auto layout", "Handoff"] },
      { label: "Community direction", title: "GDG on Campus", summary: "Event visuals and learning material for a student community where the design needs to invite participation before it explains itself.", contribution: "Led visual output, supported workshops, and helped make design practice approachable for members.", tools: ["Art direction", "Events", "Mentorship", "Campaigns"] },
    ]}
    notes={["A design system is only useful when it speeds up good judgment, not when it turns every screen into the same screen.", "I prefer contrast, restraint, and memorable type over decoration that competes with the work.", "The best handoff is a shared understanding—not a pile of perfectly named layers."]}
  />;
}
