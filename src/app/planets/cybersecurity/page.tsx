import PlanetDetailPage from "@/components/PlanetDetailPage";

export const metadata = { title: "Security Orbit | Eswar Aditya", description: "Cybersecurity learning, reconnaissance, and defensive-analysis practice by Eswar Aditya." };

export default function CybersecurityPlanetPage() {
  return <PlanetDetailPage currentPlanet="cybersecurity" index="03" title={"Security\nOrbit"} discipline="Reconnaissance, threat intelligence & SOC analysis" intro="Cybersecurity is the newest orbit in my practice. I’m learning by tracing how systems expose themselves, fail, and get defended—always in safe, authorized environments." principle="Observe carefully. Verify the evidence. Document what changes the risk."
    projects={[
      { label: "Recon practice", title: "Attack-surface mapping", summary: "A lab-based reconnaissance workflow for understanding exposed services, identifying what they are, and recording findings with useful context.", contribution: "Practiced controlled discovery, service fingerprinting, and structured reporting in authorized environments.", tools: ["Nmap", "Linux", "Networking", "Reporting"] },
      { label: "Threat intelligence", title: "OSINT workflows", summary: "Open-source research exercises that connect publicly available clues into a defensible picture of a digital footprint.", contribution: "Explored passive collection methods, source validation, and how to separate signal from assumption.", tools: ["OSINT", "Maigret", "DNS", "Research"] },
      { label: "Defensive operations", title: "SOC triage", summary: "Hands-on practice reading alerts, correlating log activity, and deciding what deserves escalation rather than noise.", contribution: "Worked through incident-analysis scenarios, evidence collection, and concise investigation notes.", tools: ["SIEM concepts", "Log analysis", "MITRE ATT&CK", "IR"] },
      { label: "Network privacy", title: "Traffic routing labs", summary: "A controlled look at proxies, tunnels, and encrypted traffic—how routing decisions affect visibility, privacy, and operational risk.", contribution: "Studied network pathing and authenticated proxy configuration in isolated lab exercises.", tools: ["ProxyChains", "SOCKS", "Tor", "Network labs"] },
    ]}
    notes={["Security practice is only meaningful when the scope is explicit and permission is real.", "The output of an investigation should be a clear next decision, not a dramatic terminal screenshot.", "I am deliberately building foundations in networking, Linux, and operational analysis before claiming expertise."]}
  />;
}
