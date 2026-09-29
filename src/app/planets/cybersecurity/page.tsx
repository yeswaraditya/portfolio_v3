"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PlanetRealmNav from "@/components/PlanetRealmNav";
import {
  Shield,
  Terminal,
  Radio,
  Lock,
  Search,
  Server,
  Activity,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Key,
  Flame,
} from "lucide-react";

export default function CybersecurityPlanetPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "terminal" | "radar" | "arsenal">("projects");
  const [activeProject, setActiveProject] = useState<number | null>(0);

  // Terminal Simulator State
  const [terminalHistory, setTerminalHistory] = useState<
    { command: string; output: string | React.ReactNode; isError?: boolean }[]
  >([
    {
      command: "sys_status --realm=cyber",
      output: (
        <span className="text-purple-300">
          [+] OBSIDIAN SOC KERNEL v4.19-kali ONLINE<br />
          [+] RECON ENGINE: INITIALIZED (Nmap, theHarvester, Maigret, ProxyChains)<br />
          [+] ZERO-TRUST INTEGRITY: 100% VERIFIED
        </span>
      ),
    },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [terminalHistory]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode;

    if (trimmed === "clear") {
      setTerminalHistory([]);
      return;
    } else if (trimmed.startsWith("nmap")) {
      response = (
        <div className="space-y-1 text-xs font-mono text-purple-200">
          <span className="text-yellow-400">Starting Nmap 7.94 ( https://nmap.org ) at 00:32 UTC</span><br />
          Nmap scan report for gateway.sec-ops.local (10.0.4.1)<br />
          Host is up (0.0012s latency).<br />
          PORT     STATE SERVICE       VERSION<br />
          22/tcp   open  ssh           OpenSSH 8.9p1 Ubuntu (Protocol 2.0)<br />
          80/tcp   open  http          nginx 1.24.0 (Reverse Proxy)<br />
          443/tcp  open  ssl/https     nginx 1.24.0 (TLSv1.3 Strong Cipher)<br />
          8080/tcp open  http-proxy    Qdrant Vector Cluster v1.8<br />
          <span className="text-green-400">✓ Nmap done: 1 IP address (1 host up) scanned in 1.48 seconds</span>
        </div>
      );
    } else if (trimmed.startsWith("theharvester")) {
      response = (
        <div className="space-y-1 text-xs font-mono text-purple-200">
          <span className="text-cyan-400">[*] Target: domain.io | Passive OSINT Reconnaissance</span><br />
          [+] Searching Bing, Brave, Censys, Certspotter, DuckDuckGo...<br />
          [+] Found 6 Subdomains:<br />
          &nbsp;&nbsp;api.domain.io (104.21.48.12)<br />
          &nbsp;&nbsp;auth.domain.io (104.21.48.13)<br />
          &nbsp;&nbsp;vault.domain.io (104.21.48.14)<br />
          &nbsp;&nbsp;soc.domain.io (104.21.48.15)<br />
          [+] Extracted 14 PGP keys and 8 verified developer emails.<br />
          <span className="text-green-400">✓ OSINT sweep complete. Digital footprint mapped.</span>
        </div>
      );
    } else if (trimmed.startsWith("maigret")) {
      response = (
        <div className="space-y-1 text-xs font-mono text-purple-200">
          <span className="text-purple-400">[*] Scanning username across 250+ online platforms...</span><br />
          [+] GitHub: https://github.com/yeswaraditya (Found - Verified)<br />
          [+] LinkedIn: Profile Located (Verified)<br />
          [+] Dribbble: Portfolio Located<br />
          [+] Keybase: GPG Public Key Fingerprint Matched<br />
          <span className="text-green-400">✓ 4 platforms identified with positive signature.</span>
        </div>
      );
    } else if (trimmed.startsWith("proxychains")) {
      response = (
        <div className="space-y-1 text-xs font-mono text-purple-200">
          [ProxyChains-4.14] Dynamic chain: 127.0.0.1:9050 (Tor) ... 198.51.100.4:1080 (SOCKS5) ... OK<br />
          [+] Request dispatched through 3 encrypted hops.<br />
          [+] Egress Node IP: 185.220.101.5 (Zurich, Switzerland)<br />
          <span className="text-green-400">✓ Multi-hop traffic successfully obfuscated.</span>
        </div>
      );
    } else if (trimmed === "help") {
      response = (
        <div className="text-xs font-mono text-purple-300 space-y-1">
          Available Recon Commands:<br />
          • <span className="text-yellow-400">nmap -sV -p 1-1000 10.0.4.1</span> (Port & service scanner)<br />
          • <span className="text-cyan-400">theharvester -d target.io</span> (Passive OSINT & subdomains)<br />
          • <span className="text-purple-400">maigret username</span> (Digital footprint discovery)<br />
          • <span className="text-pink-400">proxychains curl ip</span> (Encrypted multi-hop routing)<br />
          • <span className="text-green-400">clear</span> (Clear terminal console)
        </div>
      );
    } else {
      response = (
        <span className="text-red-400 font-mono text-xs">
          Command not recognized: &quot;{cmd}&quot;. Type &quot;help&quot; for available reconnaissance commands.
        </span>
      );
    }

    setTerminalHistory((prev) => [
      ...prev,
      { command: cmd, output: response },
    ]);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    runCommand(terminalInput);
    setTerminalInput("");
  };

  const projects = [
    {
      id: 0,
      title: "Network Reconnaissance & Port Scanning Infrastructure",
      subtitle: "Service Fingerprinting & Attack Surface Mapping",
      category: "Offensive Security",
      badge: "Recon & Nmap",
      accent: "#8B5CF6",
      description:
        "Engineered scripted network reconnaissance workflows utilizing Nmap, NSE (Nmap Scripting Engine), and Wireshark to map active attack surfaces, identify misconfigured service daemons, and isolate unpatched vulnerabilities across internal subnets.",
      deliverables: [
        "Automated NSE Vulnerability Scan Scripts",
        "Deep Packet Inspection with Wireshark",
        "Service Version Fingerprinting & CVE Correlation",
        "Attack Surface Topology Mapping",
      ],
      tech: ["Kali Linux", "Nmap", "Wireshark", "NSE", "Bash", "Python"],
      metrics: ["1000+ Ports Scanned / sec", "Zero False Alarms", "CVE Database Grounding"],
    },
    {
      id: 1,
      title: "Open Source Intelligence (OSINT) & Digital Footprinting",
      subtitle: "Passive Target Reconnaissance & Identity Correlation",
      category: "Threat Intelligence",
      badge: "OSINT Analysis",
      accent: "#EC4899",
      description:
        "Conducted end-to-end passive reconnaissance operations using theHarvester, Maigret, and metadata extraction tools. Extracted public DNS records, employee email vectors, exposed cloud buckets, and digital identities across hundreds of web properties.",
      deliverables: [
        "Automated theHarvester Multi-Engine Harvester",
        "Cross-Platform Identity Enumeration with Maigret",
        "Metadata Stripping & Document Forensics",
        "Comprehensive Threat Intelligence Dossiers",
      ],
      tech: ["theHarvester", "Maigret", "Maltego", "ExifTool", "OSINT Framework"],
      metrics: ["250+ Platforms Queried", "Passive Non-Intrusive", "100% Trace Anonymity"],
    },
    {
      id: 2,
      title: "Security Operations Center (SOC) Analysis & Triage",
      subtitle: "Log Correlation, Anomaly Detection & Incident Response",
      category: "Defensive Operations",
      badge: "SOC Defense",
      accent: "#C084FC",
      description:
        "Analyzed system telemetry and authentication audit logs to detect brute-force attempts, unauthorized privilege escalations, and anomalous traffic spikes. Established rapid incident triage workflows for active containment.",
      deliverables: [
        "Syslog & Auditd Log Correlation Pipelines",
        "Real-Time Anomaly Alert Rule Sets",
        "Incident Triage & Playbook Execution",
        "Threat Containment & Post-Mortem Reports",
      ],
      tech: ["SOC Analysis", "Syslog", "Auditd", "SIEM Concepts", "Linux Hardening"],
      metrics: ["Sub-5min Incident Triage", "99.8% Log Ingestion", "Proactive Hardening"],
    },
    {
      id: 3,
      title: "Encrypted Traffic Routing & Multi-Hop Anonymity",
      subtitle: "ProxyChains, SOCKS5 Tunnels & Tor Layering",
      category: "Network Privacy",
      badge: "ProxyChains / Privacy",
      accent: "#F472B6",
      description:
        "Configured secure multi-hop proxy chains routing offensive testing payloads through distributed encrypted SOCKS5 proxies and Tor circuits to ensure anonymity and simulate geographically distributed threat actors.",
      deliverables: [
        "Dynamic Multi-Hop ProxyChains Architecture",
        "Tor SOCKS5 Layering & DNS Leak Prevention",
        "Encrypted SSH Port Forwarding & Tunnels",
        "Automated IP Rotation Scripts",
      ],
      tech: ["ProxyChains", "Tor", "SOCKS5", "SSH Tunneling", "iptables"],
      metrics: ["Zero DNS Leaks", "3-Hop Minimum Redundancy", "Dynamic Failover"],
    },
  ];

  const arsenal = [
    { name: "Kali Linux", role: "Primary Penetration Testing & Security OS", level: 95, badge: "Core Platform" },
    { name: "Nmap & NSE", role: "Network Discovery, Port Scanning & Scripting", level: 92, badge: "Reconnaissance" },
    { name: "theHarvester", role: "Open-Source Intelligence & Subdomain Discovery", level: 90, badge: "OSINT" },
    { name: "Maigret", role: "Username & Digital Identity Correlation", level: 88, badge: "OSINT" },
    { name: "ProxyChains & Tor", role: "Anonymity, SOCKS5 Multi-Hop Tunneling", level: 86, badge: "Traffic Routing" },
    { name: "Microsoft Azure (AZ-900)", role: "Cloud Security, Identity & Governance Certified", level: 90, badge: "Certified" },
  ];

  return (
    <div className="relative min-h-screen bg-[#06020e] text-white selection:bg-[#8B5CF6] selection:text-white overflow-x-hidden font-sans">
      <PlanetRealmNav currentPlanet="cybersecurity" />

      {/* Atmospheric Ultraviolet Nebula Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 right-1/4 h-[550px] w-[550px] rounded-full bg-[#8B5CF6]/15 blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 -right-20 h-[450px] w-[450px] rounded-full bg-[#EC4899]/10 blur-[130px]" />
        <div className="absolute bottom-10 left-10 h-[400px] w-[400px] rounded-full bg-[#6D28D9]/15 blur-[140px]" />
        {/* Scanline texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #8B5CF6 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-20 md:px-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl border border-[#8B5CF6]/30 bg-gradient-to-b from-[#8B5CF6]/[0.1] via-black/60 to-black/95 p-8 md:p-14 backdrop-blur-2xl shadow-[0_0_80px_rgba(139,92,246,0.18)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C4B5FD]">
              <span className="h-2 w-2 rounded-full bg-[#8B5CF6] animate-ping" />
              OBSIDIAN SOC REALM // 03
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <span>SECURITY PROTOCOL: ZERO TRUST</span>
              <span>•</span>
              <span className="text-[#8B5CF6]">DEFENSE IN DEPTH</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
                Cybersecurity, OSINT &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#C084FC] to-[#EC4899]">
                  Threat Operations
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
                Network reconnaissance, digital footprint intelligence, vulnerability identification, 
                and security operations center analysis executed with ethical rigor.
              </p>
            </div>

            {/* Telemetry Metrics */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#8B5CF6] font-mono">250+</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">OSINT Platforms</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#EC4899] font-mono">100%</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">Zero-Trust Posture</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#C084FC] font-mono">&lt;5 min</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">Incident Triage</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <span className="text-2xl sm:text-3xl font-bold text-[#F472B6] font-mono">AZ-900</span>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-1">Security Certified</p>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {[
              { id: "projects", label: "Security Projects & Audits", icon: Shield },
              { id: "terminal", label: "Live Recon Terminal Simulator", icon: Terminal },
              { id: "radar", label: "Threat Radar & Attack Surface", icon: Radio },
              { id: "arsenal", label: "Security Tooling Arsenal", icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isCurrent = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                    isCurrent
                      ? "bg-[#8B5CF6] text-white shadow-[0_0_25px_rgba(139,92,246,0.5)]"
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

        {/* SECTION 1: Security Projects & Audits */}
        {activeTab === "projects" && (
          <section className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Security Operations & Reconnaissance
                </h2>
                <p className="text-sm text-white/50 mt-1">
                  Click any project card to inspect reconnaissance methodology, defense playbooks, and deliverables.
                </p>
              </div>
              <span className="hidden sm:inline-block font-mono text-xs text-[#8B5CF6]">
                [ 04 THREAT VECTORS AUDITED ]
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
                        ? "border-[#8B5CF6] bg-black/85 shadow-[0_0_40px_rgba(139,92,246,0.25)] ring-1 ring-[#8B5CF6]/50"
                        : "border-white/10 bg-black/40 hover:border-white/25 hover:bg-white/[0.04]"
                    } p-7 backdrop-blur-xl`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white font-mono"
                        style={{ backgroundColor: proj.accent }}
                      >
                        {proj.badge}
                      </span>
                      <span className="text-xs font-mono uppercase text-white/40">{proj.category}</span>
                    </div>

                    <h3 className="mt-5 text-2xl font-bold uppercase text-white group-hover:text-[#C084FC] transition-colors leading-tight">
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
                          <p className="text-xs font-bold uppercase tracking-wider text-[#C084FC] font-mono mb-2">
                            Operational Specifications:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {proj.deliverables.map((del) => (
                              <div key={del} className="flex items-start gap-2 text-xs text-white/80">
                                <CheckCircle2 size={14} className="text-[#8B5CF6] shrink-0 mt-0.5" />
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
                              className="rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-3 py-1 text-xs font-mono text-[#E9D5FF]"
                            >
                              🛡️ {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between text-xs font-mono text-white/40 pt-4 border-t border-white/5">
                      <span>{isExpanded ? "COLLAPSE SPEC" : "EXPAND METHODOLOGY"}</span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform duration-300 ${isExpanded ? "rotate-90 text-[#8B5CF6]" : "group-hover:translate-x-1 text-white/40"}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 2: Live Recon Terminal Simulator */}
        {activeTab === "terminal" && (
          <section className="mt-12 rounded-3xl border border-white/10 bg-black/80 p-8 md:p-12 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} /> LIVE RECONNAISSANCE CLI CONSOLE
                </span>
                <h2 className="mt-2 text-3xl font-bold uppercase text-white">
                  Simulated Offensive Security Terminal
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Execute simulated recon commands or click quick-action presets below to trigger live network scans and OSINT harvesting.
                </p>
              </div>

              {/* Quick Command Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "nmap port scan", cmd: "nmap -sV -p 1-1000 10.0.4.1" },
                  { label: "theharvester OSINT", cmd: "theharvester -d domain.io -b all" },
                  { label: "maigret footprint", cmd: "maigret username" },
                  { label: "proxychains route", cmd: "proxychains curl target" },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => runCommand(preset.cmd)}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-purple-300 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/15 transition-all"
                  >
                    <Play size={10} />
                    <span>{preset.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => runCommand("clear")}
                  className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-mono text-red-300 hover:bg-red-500/20 transition-all"
                >
                  <RotateCcw size={10} />
                  <span>clear</span>
                </button>
              </div>
            </div>

            {/* Terminal Window Box */}
            <div className="mt-8 rounded-2xl border border-purple-500/25 bg-neutral-950/95 overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)]">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-white/50">root@kali-soc:~#</span>
                </div>
                <span className="text-[11px] font-mono text-purple-400/70 uppercase">
                  ACTIVE SHELL // TTY-1
                </span>
              </div>

              {/* Terminal Output Area */}
              <div className="p-6 font-mono text-xs sm:text-sm space-y-4 max-h-[420px] overflow-y-auto">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-purple-400">
                      <span className="text-pink-400 font-bold">┌──[root@kali-soc]</span>
                      <span className="text-white/40">─</span>
                      <span className="text-yellow-400">~</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-pink-400 font-bold">└─$</span>
                      <span className="text-white font-semibold">{item.command}</span>
                    </div>
                    <div className="pl-4 border-l-2 border-purple-500/30 pt-1 text-white/90">
                      {item.output}
                    </div>
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>

              {/* Interactive Input Form */}
              <form
                onSubmit={handleTerminalSubmit}
                className="flex items-center border-t border-white/10 bg-black/60 px-4 py-3"
              >
                <span className="text-pink-400 font-mono font-bold mr-3">└─$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type a command (e.g. 'nmap', 'theharvester', 'help', 'clear')..."
                  className="w-full bg-transparent font-mono text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#8B5CF6] px-3 py-1 text-xs font-mono text-white hover:bg-[#8B5CF6]/90 transition-all ml-2"
                >
                  Send
                </button>
              </form>
            </div>
          </section>
        )}

        {/* SECTION 3: Threat Radar & Attack Surface */}
        {activeTab === "radar" && (
          <section className="mt-12 rounded-3xl border border-white/10 bg-black/60 p-8 md:p-12 backdrop-blur-2xl">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest flex items-center gap-2">
                <Radio size={14} /> CONTINUOUS ATTACK SURFACE MONITORING
              </span>
              <h2 className="mt-2 text-3xl font-bold uppercase text-white">
                Threat Radar & Anomaly Matrix
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Multi-layer monitoring nodes identifying perimeter anomalies, exposed telemetry, and defensive status.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  node: "NODE ALPHA // EDGE GATEWAY",
                  status: "SECURE",
                  latency: "1.2ms",
                  cve: "0 Open Vulnerabilities",
                  desc: "Reverse proxy TLS 1.3 encryption with strict HSTS headers and rate-limiting enabled.",
                  accent: "#10B981",
                },
                {
                  node: "NODE BETA // OSINT PERIMETER",
                  status: "MONITORED",
                  latency: "14ms",
                  cve: "Passive Defense Active",
                  desc: "Regular automated theHarvester & Maigret sweeps scanning for exposed credentials.",
                  accent: "#8B5CF6",
                },
                {
                  node: "NODE GAMMA // SOC CORRELATION",
                  status: "ACTIVE",
                  latency: "4.8ms",
                  cve: "Audit Logs Verified",
                  desc: "Centralized syslog monitoring detecting unauthorized login spikes and brute-force events.",
                  accent: "#EC4899",
                },
              ].map((n) => (
                <div
                  key={n.node}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-white/40">{n.node}</span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold"
                        style={{
                          backgroundColor: `${n.accent}20`,
                          color: n.accent,
                          border: `1px solid ${n.accent}50`,
                        }}
                      >
                        {n.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-white uppercase">{n.cve}</h3>
                    <p className="mt-2 text-xs text-white/60 leading-relaxed">{n.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                    <span>LATENCY: {n.latency}</span>
                    <span className="text-green-400">✓ NORMAL</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: Security Tooling Arsenal */}
        {activeTab === "arsenal" && (
          <section className="mt-12 rounded-3xl border border-white/10 bg-black/60 p-8 md:p-12 backdrop-blur-2xl">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-[#8B5CF6] tracking-widest">
                ARSENAL & PROFICIENCY
              </span>
              <h2 className="mt-2 text-3xl font-bold uppercase text-white">
                Cybersecurity Tooling & Platforms
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Tooling proficiency for ethical reconnaissance, network scanning, log auditing, and cloud security governance.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {arsenal.map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md hover:border-[#8B5CF6]/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white uppercase">{tool.name}</h3>
                    <span className="rounded-md border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-2.5 py-0.5 text-xs font-mono text-[#C4B5FD]">
                      {tool.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-white/60">{tool.role}</p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
                        style={{ width: `${tool.level}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-white/80">{tool.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA to Return to Galactic Map */}
        <section className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-black via-black/80 to-[#8B5CF6]/15 p-8 md:p-12 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest">
              MISSION COMPLETE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white mt-1">
              Return to Galactic Orbit Overview?
            </h3>
            <p className="text-sm text-white/60 mt-1">
              Navigate back to the interactive 3D solar canvas to observe all 3 planetary biospheres in active orbit.
            </p>
          </div>

          <Link
            href="/planets"
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)] shrink-0"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            <span>Return to Orbit View</span>
            <ChevronRight size={18} />
          </Link>
        </section>
      </main>
    </div>
  );
}
