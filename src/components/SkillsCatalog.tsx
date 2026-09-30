const GROUPS = [
  {
    id: "interface",
    index: "01",
    title: "Interface Design & Visual Branding",
    skills: [
      {
        name: "UI/UX Design",
        detail:
          "Wireframing, rapid prototyping, user journey mapping, and high-fidelity interface design for web and mobile platforms.",
        tags: ["Wireframes", "Prototypes", "Journeys", "Web", "Mobile"],
      },
      {
        name: "Design Tooling",
        detail:
          "Advanced proficiency in Figma, Adobe Illustrator, Adobe Photoshop, Adobe XD, Sketch, and OnyX.",
        tags: ["Figma", "Illustrator", "Photoshop", "Adobe XD", "Sketch", "OnyX"],
      },
      {
        name: "Brand Identity",
        detail:
          "End-to-end brand system design (including specific naming conventions like NO-TEMPLATE), logo creation, typography selection (including Google Fonts integration), and color theory.",
        tags: ["Brand systems", "NO-TEMPLATE", "Logos", "Type", "Color"],
      },
      {
        name: "Visual Assets",
        detail:
          "Digital mockups, social media asset creation, wallpaper collection design, and vector graphics.",
        tags: ["Mockups", "Social", "Wallpapers", "Vectors"],
      },
      {
        name: "Design Systems",
        detail:
          "Building reusable component libraries, responsive layout structuring, and maintaining visual consistency across digital products.",
        tags: ["Components", "Responsive", "Consistency"],
      },
    ],
  },
  {
    id: "frontend",
    index: "02",
    title: "Frontend Web Development",
    skills: [
      {
        name: "Languages",
        detail: "JavaScript (ES6+), HTML5, CSS3.",
        tags: ["JavaScript", "HTML5", "CSS3"],
      },
      {
        name: "Frameworks & Libraries",
        detail: "React.js, Next.js.",
        tags: ["React.js", "Next.js"],
      },
      {
        name: "Styling & Animation",
        detail:
          "Tailwind CSS for utility-first responsive design, GSAP (GreenSock Animation Platform) for complex, high-performance UI animations and scroll effects.",
        tags: ["Tailwind CSS", "GSAP"],
      },
      {
        name: "Architecture",
        detail:
          "Component-driven development, state management, and responsive web integration.",
        tags: ["Components", "State", "Responsive"],
      },
    ],
  },
  {
    id: "ios",
    index: "03",
    title: "iOS & Mobile Engineering",
    skills: [
      {
        name: "Core Frameworks",
        detail: "Native iOS development using Swift and SwiftUI.",
        tags: ["Swift", "SwiftUI"],
      },
      {
        name: "Data & Storage",
        detail: "Local data persistence and schema modeling with SwiftData.",
        tags: ["SwiftData"],
      },
      {
        name: "Advanced iOS Features",
        detail:
          "Data visualization using Swift Charts, optical character recognition integration using Apple's Vision OCR, and implementing Firebase Cloud Messaging for push notifications.",
        tags: ["Swift Charts", "Vision OCR", "Firebase Cloud Messaging"],
      },
      {
        name: "Mobile Tooling",
        detail: "Xcode environment configuration, iOS simulator testing, and mobile UI debugging.",
        tags: ["Xcode", "Simulator", "UI debugging"],
      },
    ],
  },
  {
    id: "backend",
    index: "04",
    title: "Backend Engineering & API Development",
    skills: [
      {
        name: "Languages",
        detail: "Python, Java, C, C++.",
        tags: ["Python", "Java", "C", "C++"],
      },
      {
        name: "Web Frameworks",
        detail: "Django, Flask.",
        tags: ["Django", "Flask"],
      },
      {
        name: "Architecture",
        detail:
          "RESTful API design, server-side routing, and connecting frontend clients to scalable backend services.",
        tags: ["REST", "Routing", "Client integration"],
      },
    ],
  },
  {
    id: "data",
    index: "05",
    title: "Database Architecture & Data Modeling",
    skills: [
      {
        name: "Relational & NoSQL",
        detail: "SQL database management and MongoDB for document-based storage.",
        tags: ["SQL", "MongoDB"],
      },
      {
        name: "Advanced & Specialized Databases",
        detail:
          "Qdrant for vector indexing and embeddings, Neo4j for complex graph database modeling and relationships.",
        tags: ["Qdrant", "Neo4j"],
      },
    ],
  },
  {
    id: "ai",
    index: "06",
    title: "Artificial Intelligence & Agentic Workflows",
    skills: [
      {
        name: "AI Architecture",
        detail:
          "Designing hybrid Retrieval-Augmented Generation (RAG) pipelines combining vector search and knowledge graphs (e.g., xenRAG).",
        tags: ["RAG", "Vector search", "Knowledge graphs", "xenRAG"],
      },
      {
        name: "LLM Integration",
        detail:
          "Building conversational workflows, explainability frameworks, and customer feedback analysis systems.",
        tags: ["Conversational UI", "Explainability", "Feedback analysis"],
      },
      {
        name: "Agentic Tooling",
        detail:
          "Configuring and utilizing AI coding assistants and command-line agents including Claude Code, OpenCode, and Clawdbot.",
        tags: ["Claude Code", "OpenCode", "Clawdbot"],
      },
    ],
  },
  {
    id: "web3",
    index: "07",
    title: "Web3 & Blockchain Technology",
    skills: [
      {
        name: "Smart Contracts",
        detail: "Programming decentralized logic using the Move language on the Aptos blockchain.",
        tags: ["Move", "Aptos"],
      },
      {
        name: "dApp Architecture",
        detail:
          "Designing decentralized applications, specifically focusing on project funding platforms and blockchain-based state management.",
        tags: ["dApps", "Funding platforms", "On-chain state"],
      },
    ],
  },
  {
    id: "cloud",
    index: "08",
    title: "Cloud, DevOps & Server Administration",
    skills: [
      {
        name: "Version Control & CI/CD",
        detail: "Git, GitHub repository management, and automated deployment pipelines using Vercel.",
        tags: ["Git", "GitHub", "Vercel"],
      },
      {
        name: "Containerization",
        detail: "Docker image creation, container orchestration, and deploying isolated services.",
        tags: ["Docker"],
      },
      {
        name: "Server Management",
        detail:
          "Ubuntu Server administration, CasaOS deployment, and home server hardware configuration (managing multi-terabyte storage pools).",
        tags: ["Ubuntu Server", "CasaOS", "Storage pools"],
      },
      {
        name: "Cloud Infrastructure",
        detail: "Microsoft Azure cloud services (AZ-900 Fundamentals Certified).",
        tags: ["Azure", "AZ-900"],
      },
      {
        name: "Development Environments",
        detail: "Environment configuration using uv, VS Code, Cursor, and Google Antigravity IDE.",
        tags: ["uv", "VS Code", "Cursor", "Antigravity"],
      },
    ],
  },
  {
    id: "security",
    index: "09",
    title: "Cybersecurity & Network Analysis",
    skills: [
      {
        name: "Operating Systems",
        detail: "Penetration testing environments using Kali Linux.",
        tags: ["Kali Linux"],
      },
      {
        name: "Reconnaissance & OSINT",
        detail:
          "Information gathering and digital footprint tracking using theHarvester and Maigret.",
        tags: ["theHarvester", "Maigret"],
      },
      {
        name: "Network Security",
        detail:
          "Network mapping and port scanning with Nmap, and securing/routing traffic through ProxyChains.",
        tags: ["Nmap", "ProxyChains"],
      },
      {
        name: "Methodology",
        detail:
          "Ethical hacking concepts, vulnerability assessment, network reconnaissance, SOC analysis, and open-source intelligence gathering.",
        tags: ["Ethical Hacking", "SOC Analysis", "Reconnaissance", "OSINT"],
      },
    ],
  },
  {
    id: "certifications",
    index: "10",
    title: "Certifications & Industry Credentials",
    skills: [
      {
        name: "Cloud & Infrastructure",
        detail: "Microsoft Azure Fundamentals (AZ-900 Certified).",
        tags: ["Microsoft Azure", "AZ-900"],
      },
      {
        name: "Agile & Enterprise Tools",
        detail: "Agile with Atlassian Jira (Coursera) & Red Hat Enterprise Linux Fundamentals.",
        tags: ["Atlassian Jira", "Red Hat Linux", "Agile"],
      },
      {
        name: "Productivity & Badges",
        detail: "Notion Advanced Badge, Notion Workflows Badge, Prompt Engineering & Data Visualisation.",
        tags: ["Notion Advanced", "Workflows", "Prompt Engineering", "Data Viz"],
      },
    ],
  },
] as const;

const ACCENTS = ["#FFE600", "#FF4D00", "#3DFF8A"];

const dotGrid = {
  backgroundColor: "#0055FF",
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.95) 1.15px, transparent 1.2px)",
  backgroundSize: "18px 18px",
};

export default function SkillsCatalog() {
  return (
    <section className="relative text-white" style={dotGrid}>
      <div className="mx-auto max-w-[1180px] px-6 pb-6 pt-16 md:px-10 md:pt-24">
        <p
          className="text-[12px] font-bold uppercase tracking-[0.34em] text-[#FFE600]"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          01 — 10
        </p>
        <h2
          className="mt-3 max-w-[12ch] text-[clamp(3.2rem,8vw,7rem)] font-bold uppercase leading-[0.82] tracking-[-0.05em]"
          style={{ fontFamily: "var(--font-cabinet)" }}
        >
          Skill set.
        </h2>
        <nav className="mt-10 flex gap-2 overflow-x-auto pb-2" aria-label="Skill categories">
          {GROUPS.map((group, index) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="shrink-0 rounded-full border-2 border-white bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-transform hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-roboto)",
                backgroundColor: index % 3 === 1 ? "#FFE600" : "#FFFFFF",
              }}
            >
              {group.index} {group.title.split("&")[0].trim()}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 pb-24 md:px-10 md:pb-32">
        {GROUPS.map((group, index) => {
          const accent = ACCENTS[index % ACCENTS.length];
          return (
            <article
              key={group.id}
              id={group.id}
              className="scroll-mt-28 overflow-hidden rounded-[28px] border-2 border-white/80 bg-white text-black shadow-[8px_8px_0_#001A66]"
            >
              <header
                className="flex items-end justify-between gap-6 px-6 py-6 md:px-8 md:py-8"
                style={{ backgroundColor: accent }}
              >
                <h3
                  className="max-w-[16ch] text-[clamp(1.8rem,3.4vw,3.1rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]"
                  style={{ fontFamily: "var(--font-cabinet)" }}
                >
                  {group.title}
                </h3>
                <p
                  className="text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-none tracking-[-0.06em]"
                  style={{ fontFamily: "var(--font-cabinet)" }}
                >
                  {group.index}
                </p>
              </header>

              {group.id === "interface" && (
                <div className="flex items-center justify-between gap-5 border-t-2 border-black bg-[#FFE600] px-6 py-4 md:px-8">
                  <p className="max-w-xl text-sm font-medium leading-snug md:text-base">This is the complete UI/UX journey: the skills, tools, and systems behind the selected work.</p>
                  <Link href="/planets/ui-ux" className="shrink-0 border-2 border-black bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#ff4d00] hover:border-[#ff4d00]" style={{ fontFamily: "var(--font-roboto)" }}>Selected design work</Link>
                </div>
              )}

              <div className="grid gap-px bg-black/10 md:grid-cols-2">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="bg-white px-6 py-6 md:px-8 md:py-7">
                    <h4
                      className="text-xl font-bold uppercase tracking-[-0.03em]"
                      style={{ fontFamily: "var(--font-cabinet)" }}
                    >
                      {skill.name}
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-black/70">
                      {skill.detail}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {skill.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-black"
                          style={{
                            fontFamily: "var(--font-roboto)",
                            backgroundColor: accent,
                          }}
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
import Link from "next/link";
