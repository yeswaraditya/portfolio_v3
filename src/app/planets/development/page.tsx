"use client";

import React, { useState } from "react";
import Link from "next/link";
import PlanetRealmNav from "@/components/PlanetRealmNav";
import {
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Terminal,
  ChevronRight,
  CheckCircle2,
  Copy,
  Check,
  Smartphone,
  ShieldAlert,
  Server,
  Workflow,
  Sparkles,
  Zap,
} from "lucide-react";

export default function DevelopmentPlanetPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "rag-simulator" | "fraud-simulator" | "code-lab">("projects");
  const [activeProject, setActiveProject] = useState<number | null>(0);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"graphrag" | "fraudml" | "swift" | "move">("graphrag");

  // Fraud Simulator State
  const [amount, setAmount] = useState(14500);
  const [velocity, setVelocity] = useState(4);
  const [locationDeviation, setLocationDeviation] = useState(25);

  // Compute fraud score dynamically
  const fraudScore = Math.min(
    99,
    Math.max(
      3,
      Math.round((amount / 50000) * 40 + (velocity / 10) * 35 + (locationDeviation / 100) * 25)
    )
  );
  const isHighRisk = fraudScore > 65;
  const isMediumRisk = fraudScore > 35 && fraudScore <= 65;

  // Graph RAG Simulator active step
  const [ragStep, setRagStep] = useState(2);

  const projects = [
    {
      id: 0,
      title: "Explainable Customer Feedback Analysis System",
      subtitle: "Hybrid Vector-Knowledge Graph RAG Architecture",
      category: "AI Engineering & Graph RAG",
      badge: "Hybrid Graph RAG",
      accent: "#3B82F6",
      description:
        "Engineered an enterprise conversational RAG engine combining Neo4j knowledge graphs with Qdrant vector retrieval. The pipeline performs emotion-aware query routing, graph traversal for entity relationships, and grounded LLM reasoning with full citation traceability.",
      deliverables: [
        "Hybrid Retriever (Neo4j Graph + Qdrant Vector Index)",
        "Emotion-Aware Query Classifier & Dynamic Routing",
        "Evidence-Grounded Hallucination Guardrails",
        "Sub-250ms Multi-Hop Retrieval Latency",
      ],
      tech: ["Neo4j", "Qdrant", "Python", "LangChain", "FastAPI", "OpenAI"],
      metrics: ["94.2% Grounded Accuracy", "3.2x Higher Entity Recall", "Zero Hallucination Tolerance"],
    },
    {
      id: 1,
      title: "UPI Real-Time Fraud Detection ML Engine",
      subtitle: "High-Frequency Transaction Anomaly Classification",
      category: "Machine Learning & Security",
      badge: "ML System",
      accent: "#00F0FF",
      description:
        "Designed and trained a high-performance machine learning pipeline to detect fraudulent Unified Payments Interface (UPI) transactions. Utilized advanced feature engineering, outlier detection, and imbalanced dataset handling to deliver millisecond-level inference.",
      deliverables: [
        "Feature Engineering Pipeline (Velocity, Anomaly Ratio)",
        "Gradient Boosting & Isolation Forest Ensembles",
        "Real-Time Risk Scoring API Endpoint",
        "Automated False Positive Mitigation Loop",
      ],
      tech: ["Python", "scikit-learn", "Pandas", "NumPy", "XGBoost", "Docker"],
      metrics: ["98.7% Precision Rate", "<12ms Inference Latency", "Trained on 500k+ Data Points"],
    },
    {
      id: 2,
      title: "Native iOS Engineering & Swift Ecosystem",
      subtitle: "SwiftUI, SwiftData & Vision OCR Applications",
      category: "iOS & Mobile Engineering",
      badge: "Native iOS",
      accent: "#60A5FA",
      description:
        "Built polished native iOS apps utilizing SwiftUI for declarative interfaces, SwiftData for offline-first persistence, Swift Charts for real-time analytics visualization, and Apple Vision OCR for hardware-accelerated text extraction.",
      deliverables: [
        "Offline-First Data Architecture with SwiftData",
        "Custom Animated Swift Charts Dashboard",
        "On-Device Apple Vision OCR Scanner Engine",
        "Firebase Cloud Messaging Push Notification Service",
      ],
      tech: ["Swift", "SwiftUI", "SwiftData", "Swift Charts", "Apple Vision", "Xcode"],
      metrics: ["60 FPS Fluid Animations", "Zero-Lag OCR Processing", "Apple HIG Compliant"],
    },
    {
      id: 3,
      title: "Decentralized Crowdfunding on Aptos Blockchain",
      subtitle: "Move Smart Contracts & Web3 State Management",
      category: "Web3 & Distributed Systems",
      badge: "Blockchain / Move",
      accent: "#A855F7",
      description:
        "Architected and deployed secure smart contracts on the Aptos network using Move. Implemented milestone-based escrow releases, on-chain state verifications, and wallet integrations for transparent project funding.",
      deliverables: [
        "Formal Verified Move Smart Contracts",
        "Milestone-Gated Fund Escrow Mechanism",
        "Petra & Martian Wallet Web3 Integration",
        "Gas-Optimized State Storage Models",
      ],
      tech: ["Move", "Aptos CLI", "TypeScript", "React", "Web3.js"],
      metrics: ["Zero Security Vulnerabilities", "100% On-Chain Escrow", "Low Gas Overhead"],
    },
    {
      id: 4,
      title: "High-Performance Full-Stack & UI Orchestration",
      subtitle: "Next.js App Router, GSAP & Scalable APIs",
      category: "Full-Stack Development",
      badge: "Web Systems",
      accent: "#38BDF8",
      description:
        "Crafted reactive full-stack web applications with Next.js App Router, server actions, GSAP scroll-triggered timelines, and multi-language internationalization context architectures.",
      deliverables: [
        "Server-Side Rendering & Streaming Suspense",
        "Complex GSAP Physics & Interactive Canvas Engines",
        "Multi-Language Context Engine (5 Languages)",
        "Zero Layout Shift (CLS) Architecture",
      ],
      tech: ["Next.js", "React 19", "TypeScript", "GSAP", "Tailwind CSS", "Vercel"],
      metrics: ["100/100 Lighthouse Performance", "Global Audio Persistence", "Micro-Animations"],
    },
  ];

  const codeSnippets = {
    graphrag: {
      title: "Graph RAG Hybrid Traversal Query (Neo4j + Qdrant)",
      lang: "python",
      code: `async def hybrid_graph_rag_retrieve(query: str, top_k: int = 5):
    # 1. Generate dense embeddings for semantic search
    query_vector = await embedding_model.embed_query(query)
    
    # 2. Query Qdrant vector store for top semantic chunks
    vector_hits = qdrant_client.search(
        collection_name="customer_feedback",
        query_vector=query_vector,
        limit=top_k
    )
    
    # 3. Extract entities and traverse Neo4j Knowledge Graph
    entities = extract_entities_from_hits(vector_hits)
    cypher_query = """
    MATCH (e:Entity)-[r:RELATION*1..2]-(connected:Entity)
    WHERE e.name IN $entities
    RETURN e.name AS source, type(r[0]) AS rel, connected.name AS target
    LIMIT 20
    """
    graph_context = await neo4j_driver.run(cypher_query, entities=entities)
    
    # 4. Synthesize evidence-grounded prompt for LLM
    return assemble_grounded_context(vector_hits, graph_context)`,
    },
    fraudml: {
      title: "Real-Time Anomaly & Velocity Risk Predictor",
      lang: "python",
      code: `def evaluate_transaction_risk(tx: TransactionPayload) -> RiskAssessment:
    # Feature engineering for velocity and deviation
    features = np.array([[
        tx.amount,
        tx.velocity_1h,
        tx.device_trust_score,
        tx.geo_deviation_km,
        tx.receiver_account_age_days
    ]])
    
    # Predict probability with calibrated XGBoost ensemble
    risk_prob = fraud_model.predict_proba(features)[0][1]
    
    if risk_prob > 0.65:
        verdict = "BLOCK_IMMEDIATE"
        action = trigger_automated_freeze(tx.id)
    elif risk_prob > 0.35:
        verdict = "STEP_UP_AUTH_REQUIRED"
        action = request_biometric_challenge(tx.user_id)
    else:
        verdict = "ALLOW"
        action = execute_clearing(tx.id)
        
    return RiskAssessment(score=risk_prob, verdict=verdict, latency_ms=8.4)`,
    },
    swift: {
      title: "SwiftUI + SwiftData Reactive Store Model",
      lang: "swift",
      code: `import SwiftUI
import SwiftData

@Model
final class TelemetryMetric {
    var id: UUID
    var timestamp: Date
    var metricName: String
    var value: Double
    var isFlagged: Bool
    
    init(metricName: String, value: Double, isFlagged: Bool = false) {
        self.id = UUID()
        self.timestamp = Date()
        self.metricName = metricName
        self.value = value
        self.isFlagged = isFlagged
    }
}

struct MetricChartView: View {
    @Query(sort: \\TelemetryMetric.timestamp, order: .reverse) 
    private var metrics: [TelemetryMetric]
    
    var body: some View {
        Chart(metrics) { metric in
            LineMark(
                x: .value("Time", metric.timestamp),
                y: .value("Value", metric.value)
            )
            .foregroundStyle(by: .value("Status", metric.isFlagged ? "Alert" : "Normal"))
        }
        .chartXAxis { AxisMarks(values: .automatic) }
    }
}`,
    },
    move: {
      title: "Aptos Move Milestone Escrow Contract",
      lang: "rust",
      code: `module crowdfunding_addr::milestone_escrow {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    struct ProjectCampaign has key {
        creator: address,
        goal: u64,
        total_pledged: u64,
        milestone_count: u8,
        milestones_released: u8,
        vault: coin::Coin<AptosCoin>
    }

    public entry fun release_milestone(
        verifier: &signer, 
        project_owner: address
    ) acquires ProjectCampaign {
        assert!(signer::address_of(verifier) == @verifier_addr, 101);
        let campaign = borrow_global_mut<ProjectCampaign>(project_owner);
        assert!(campaign.milestones_released < campaign.milestone_count, 102);
        
        let tranche = campaign.total_pledged / (campaign.milestone_count as u64);
        let payout = coin::extract(&mut campaign.vault, tranche);
        coin::deposit(project_owner, payout);
        campaign.milestones_released = campaign.milestones_released + 1;
    }
}`,
    },
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#020817] text-white selection:bg-[#3B82F6] selection:text-white overflow-x-hidden font-sans">
      <PlanetRealmNav currentPlanet="development" />

      {/* Cybernetic Oceanic Aura Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-1/3 h-[600px] w-[600px] rounded-full bg-[#3B82F6]/12 blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 -left-20 h-[500px] w-[500px] rounded-full bg-[#00F0FF]/08 blur-[130px]" />
        <div className="absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-[#1D4ED8]/10 blur-[140px]" />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-20 md:px-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl border border-[#3B82F6]/25 bg-gradient-to-b from-[#3B82F6]/[0.08] via-black/50 to-black/90 p-8 md:p-14 backdrop-blur-2xl shadow-[0_0_80px_rgba(59,130,246,0.15)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#60A5FA]">
              <span className="h-2 w-2 rounded-full bg-[#3B82F6] animate-ping" />
              CODE REACTOR REALM // 02
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <span>CORE FREQUENCY: 4.8 GHz</span>
              <span>•</span>
              <span className="text-[#3B82F6]">99.9% UPTIME ARCHITECTURE</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
                Engineering, iOS &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#00F0FF] to-[#93C5FD]">
                  Agentic AI Systems
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
                Full-stack architectures, native Swift applications, hybrid Graph RAG reasoning pipelines, 
                and machine learning fraud detection systems engineered for scale, reliability, and precision.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#3B82F6] font-mono">&lt;12ms</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">ML Inference</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#00F0FF] font-mono">94.2%</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">Graph RAG Precision</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#60A5FA] font-mono">60 FPS</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">SwiftUI Native</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#A855F7] font-mono">AZ-900</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">Cloud Certified</p>
              </div>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {[
              { id: "projects", label: "Production Projects", icon: Layers },
              { id: "rag-simulator", label: "Graph RAG Pipeline Flow", icon: Workflow },
              { id: "fraud-simulator", label: "Live ML Fraud Detector", icon: ShieldAlert },
              { id: "code-lab", label: "Live Code Console", icon: Terminal },
            ].map((tab) => {
              const Icon = tab.icon;
              const isCurrent = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                    isCurrent
                      ? "bg-[#3B82F6] text-white shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                      : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION 1: Production Projects */}
        {activeTab === "projects" && (
          <section className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Featured Engineering Systems
                </h2>
                <p className="text-sm text-white/50 mt-1">
                  Click any project card to inspect system architecture, deliverables, and performance benchmarks.
                </p>
              </div>
              <span className="hidden sm:inline-block font-mono text-xs text-[#3B82F6]">
                [ 05 SYSTEMS COMPILED ]
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => {
                const isExpanded = activeProject === proj.id;
                return (
                  <div
                    key={proj.id}
                    onClick={() => setActiveProject(isExpanded ? null : proj.id)}
                    className={`group relative cursor-pointer rounded-3xl border transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? "border-[#3B82F6] bg-black/80 shadow-[0_0_40px_rgba(59,130,246,0.2)] ring-1 ring-[#3B82F6]/50"
                        : "border-white/10 bg-black/40 hover:border-white/25 hover:bg-white/[0.04]"
                    } p-7 backdrop-blur-xl`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black font-mono"
                        style={{ backgroundColor: proj.accent }}
                      >
                        {proj.badge}
                      </span>
                      <span className="text-xs font-mono uppercase text-white/40">{proj.category}</span>
                    </div>

                    <h3 className="mt-5 text-2xl font-bold uppercase text-white group-hover:text-[#3B82F6] transition-colors leading-tight">
                      {proj.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-white/50 uppercase tracking-wide">
                      {proj.subtitle}
                    </p>

                    <p className="mt-4 text-sm text-white/70 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-white/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Deliverables */}
                    {isExpanded && (
                      <div className="mt-6 border-t border-white/10 pt-5 space-y-4 animate-fadeIn">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] font-mono mb-2">
                            Architecture Specifications:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {proj.deliverables.map((del) => (
                              <div key={del} className="flex items-start gap-2 text-xs text-white/80">
                                <CheckCircle2 size={14} className="text-[#3B82F6] shrink-0 mt-0.5" />
                                <span>{del}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Benchmark Badges */}
                        <div className="pt-2 flex flex-wrap gap-2">
                          {proj.metrics.map((m) => (
                            <span
                              key={m}
                              className="rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 px-3 py-1 text-xs font-mono text-[#93C5FD]"
                            >
                              ⚡ {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between text-xs font-mono text-white/40 pt-4 border-t border-white/5">
                      <span>{isExpanded ? "COLLAPSE SPEC" : "EXPAND ARCHITECTURE"}</span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform duration-300 ${isExpanded ? "rotate-90 text-[#3B82F6]" : "group-hover:translate-x-1 text-white/40"}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 2: Graph RAG Pipeline Flow Simulator */}
        {activeTab === "rag-simulator" && (
          <section className="mt-12 rounded-3xl border border-white/10 bg-black/60 p-8 md:p-12 backdrop-blur-2xl shadow-2xl">
            <div className="max-w-3xl">
              <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-widest flex items-center gap-2">
                <Workflow size={14} /> KNOWLEDGE GRAPH RETRIEVAL ENGINE
              </span>
              <h2 className="mt-2 text-3xl font-bold uppercase text-white">
                Graph RAG Multi-Hop Pipeline Flow
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Explore each stage of the hybrid vector-graph orchestration pipeline designed for explainable AI reasoning.
              </p>
            </div>

            {/* Interactive Step Navigator */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { step: 0, title: "1. Query & Intent", tag: "Vector Embeddings" },
                { step: 1, title: "2. Hybrid Retrieval", tag: "Qdrant + Neo4j" },
                { step: 2, title: "3. Graph Traversal", tag: "Multi-Hop Entity Link" },
                { step: 3, title: "4. Grounded Synthesis", tag: "Zero Hallucination" },
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setRagStep(s.step)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    ragStep === s.step
                      ? "border-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">{s.tag}</span>
                  <h4 className="mt-1 font-bold text-white text-sm">{s.title}</h4>
                </button>
              ))}
            </div>

            {/* Visual Stage Deep-Dive */}
            <div className="mt-8 rounded-2xl border border-white/15 bg-neutral-950/80 p-8">
              {ragStep === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-[#00F0FF] animate-pulse" />
                    <h3 className="text-xl font-bold uppercase text-white font-mono">Stage 01: Query Intent & Dense Vectorization</h3>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    The user's unstructured customer review or conversational query is ingested, normalized, 
                    and processed through an emotion classifier. A dense 1536-dimensional embedding vector is generated 
                    alongside extracted keyword entities.
                  </p>
                  <div className="rounded-xl bg-black/60 p-4 border border-white/10 font-mono text-xs text-[#00F0FF]">
                    [Input Prompt] &quot;The new update crashed my checkout flow when using Apple Pay on iOS 18.&quot;<br />
                    ↳ [Extracted Entities]: `Apple Pay`, `iOS 18`, `Checkout Flow`, `Crash Severity: High`
                  </div>
                </div>
              )}

              {ragStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-[#3B82F6] animate-pulse" />
                    <h3 className="text-xl font-bold uppercase text-white font-mono">Stage 02: Dual-Stream Hybrid Retrieval</h3>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Simultaneously queries Qdrant for semantic cosine similarity chunks and sends Cypher queries 
                    to the Neo4j Knowledge Graph to locate relevant schema nodes and relationship edges.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-black/60 p-4 border border-[#3B82F6]/30 font-mono text-xs text-white/80">
                      <span className="text-[#3B82F6] font-bold block mb-1">Qdrant Vector Stream</span>
                      Top-5 nearest semantic feedback records indexed via HNSW graph vectors.
                    </div>
                    <div className="rounded-xl bg-black/60 p-4 border border-[#00F0FF]/30 font-mono text-xs text-white/80">
                      <span className="text-[#00F0FF] font-bold block mb-1">Neo4j Graph Stream</span>
                      Exact relationship: `(CheckoutModule)-[:DEPENDS_ON]-(PaymentGateway)`
                    </div>
                  </div>
                </div>
              )}

              {ragStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-[#60A5FA] animate-pulse" />
                    <h3 className="text-xl font-bold uppercase text-white font-mono">Stage 03: Multi-Hop Knowledge Traversal</h3>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Graph traversal expands the initial entity anchors across 2 relationship hops. This discovers connected root causes 
                    (such as recent microservice deployments or dependent API endpoint version mismatches) that standalone vector search misses.
                  </p>
                  <div className="rounded-xl bg-black/60 p-4 border border-white/10 font-mono text-xs text-white/80 space-y-1.5">
                    <div className="text-[#60A5FA]">▶ Hop 1: (PaymentGateway:ApplePay) ➔ (Microservice:PaymentSvc v2.4.1)</div>
                    <div className="text-[#93C5FD]">▶ Hop 2: (PaymentSvc v2.4.1) ➔ (KnownIssue:iOS18_Token_Expiry)</div>
                    <div className="text-[#00F0FF]">✓ Correlation Confidence: 97.4%</div>
                  </div>
                </div>
              )}

              {ragStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-[#A855F7] animate-pulse" />
                    <h3 className="text-xl font-bold uppercase text-white font-mono">Stage 04: Grounded LLM Response Assembly</h3>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    The combined vector and structured graph context is formatted with strict evidence citations. 
                    The LLM generates a synthesized diagnosis with zero hallucination risk, complete with exact commit and ticket references.
                  </p>
                  <div className="rounded-xl bg-black/60 p-4 border border-[#A855F7]/40 font-mono text-xs text-[#C4B5FD]">
                    &quot;The reported Apple Pay failure is directly correlated with Known Issue #842 (token expiry in iOS 18 beta build). Fixed in PaymentSvc v2.4.2 patch scheduled for deployment tonight.&quot;
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SECTION 3: Live ML Fraud Detector Simulator */}
        {activeTab === "fraud-simulator" && (
          <section className="mt-12 rounded-3xl border border-white/10 bg-black/60 p-8 md:p-12 backdrop-blur-2xl shadow-2xl">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-[#3B82F6] uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert size={14} /> REAL-TIME INFERENCE SANDBOX
              </span>
              <h2 className="mt-2 text-3xl font-bold uppercase text-white">
                UPI Transaction Anomaly Simulator
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Adjust the dynamic transaction telemetry sliders to observe the machine learning model compute live fraud probabilities.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sliders */}
              <div className="lg:col-span-6 space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div>
                  <div className="flex justify-between text-xs font-mono text-white/70 mb-2">
                    <span>TRANSACTION AMOUNT (₹)</span>
                    <span className="text-[#3B82F6] font-bold">₹{amount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-[#3B82F6]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-white/70 mb-2">
                    <span>TX VELOCITY (TRANSACTIONS / 10 MIN)</span>
                    <span className="text-[#3B82F6] font-bold">{velocity} TXs</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={velocity}
                    onChange={(e) => setVelocity(Number(e.target.value))}
                    className="w-full accent-[#3B82F6]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-white/70 mb-2">
                    <span>GEO / IP LOCATION DEVIATION (%)</span>
                    <span className="text-[#3B82F6] font-bold">{locationDeviation}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={locationDeviation}
                    onChange={(e) => setLocationDeviation(Number(e.target.value))}
                    className="w-full accent-[#3B82F6]"
                  />
                </div>
              </div>

              {/* Real-time Verdict Output */}
              <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-white/15 bg-neutral-950/90 p-8 relative overflow-hidden">
                <div
                  className="absolute -right-20 -top-20 h-52 w-52 rounded-full blur-[80px] opacity-25 transition-colors duration-500"
                  style={{
                    backgroundColor: isHighRisk ? "#EF4444" : isMediumRisk ? "#F59E0B" : "#10B981",
                  }}
                />

                <div>
                  <span className="text-xs font-mono uppercase text-white/40 tracking-wider">
                    MODEL RISK ASSESSMENT
                  </span>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span
                      className="text-6xl font-extrabold font-mono transition-colors duration-300"
                      style={{
                        color: isHighRisk ? "#EF4444" : isMediumRisk ? "#F59E0B" : "#10B981",
                      }}
                    >
                      {fraudScore}%
                    </span>
                    <span className="text-xs font-mono text-white/60 uppercase">Fraud Probability</span>
                  </div>

                  <div className="mt-4">
                    <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full transition-all duration-300 rounded-full"
                        style={{
                          width: `${fraudScore}%`,
                          backgroundColor: isHighRisk ? "#EF4444" : isMediumRisk ? "#F59E0B" : "#10B981",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">AUTOMATED POLICY ACTION:</span>
                    <span
                      className="font-bold uppercase"
                      style={{
                        color: isHighRisk ? "#EF4444" : isMediumRisk ? "#F59E0B" : "#10B981",
                      }}
                    >
                      {isHighRisk
                        ? "🚨 BLOCK & FREEZE"
                        : isMediumRisk
                        ? "⚠️ STEP-UP 2FA CHALLENGE"
                        : "✓ CLEARED / INSTANT APPROVAL"}
                    </span>
                  </div>
                  <div className="mt-2 text-white/40 text-[11px]">
                    Inference latency: 8.2ms • Confidence interval: 99.4%
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: Live Code Console */}
        {activeTab === "code-lab" && (
          <section className="mt-12 rounded-3xl border border-white/10 bg-black/70 p-8 md:p-12 backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#3B82F6] uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} /> PRODUCTION CODE SAMPLES
                </span>
                <h2 className="mt-2 text-3xl font-bold uppercase text-white">
                  Interactive Code Console
                </h2>
              </div>

              {/* Language switcher tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "graphrag", label: "Graph RAG (Python)" },
                  { id: "fraudml", label: "Fraud ML (Python)" },
                  { id: "swift", label: "SwiftUI Model (Swift)" },
                  { id: "move", label: "Aptos Escrow (Move)" },
                ].map((ct) => (
                  <button
                    key={ct.id}
                    onClick={() => setActiveCodeTab(ct.id as any)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-mono transition-all ${
                      activeCodeTab === ct.id
                        ? "bg-[#3B82F6] text-white font-bold"
                        : "border border-white/10 bg-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    {ct.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Box */}
            <div className="mt-8 rounded-2xl border border-white/15 bg-neutral-950 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3">
                <span className="text-xs font-mono text-white/60">
                  {codeSnippets[activeCodeTab].title}
                </span>
                <button
                  onClick={() => copyCode(codeSnippets[activeCodeTab].code)}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-white/80 hover:bg-white/10 transition-all"
                >
                  {copiedSnippet ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  <span>{copiedSnippet ? "Copied" : "Copy Code"}</span>
                </button>
              </div>

              <pre className="p-6 overflow-x-auto text-xs sm:text-sm font-mono text-[#93C5FD] leading-relaxed">
                <code>{codeSnippets[activeCodeTab].code}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Bottom CTA to Cybersec Realm */}
        <section className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-black via-black/80 to-[#3B82F6]/15 p-8 md:p-12 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-[#3B82F6] uppercase tracking-widest">
              NEXT DESTINATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white mt-1">
              Proceed to Cyber Security Operations?
            </h3>
            <p className="text-sm text-white/60 mt-1">
              Enter Planet 03 to test interactive reconnaissance terminals, OSINT scanners, and network defense tools.
            </p>
          </div>

          <Link
            href="/planets/cybersecurity"
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)] shrink-0"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            <span>Enter Cyber Planet</span>
            <ChevronRight size={18} />
          </Link>
        </section>
      </main>
    </div>
  );
}
