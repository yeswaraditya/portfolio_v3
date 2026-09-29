"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Palette, Code2, Shield, Sparkles, ChevronRight } from "lucide-react";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────────
   PLANET DEFINITIONS (unchanged navigation logic)
───────────────────────────────────────────────────────────────────────────── */
interface PlanetConfig {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  tagline: string;
  color: number;
  hexStr: string;
  atmosphereColor: number;
  atmosphereHex: string;
  glowHex: string;
  lightHex: string;
  orbitRadius: number;
  orbitTilt: number;
  speed: number;
  size: number;
  phaseOffset: number;
  link: string;
  icon: typeof Palette;
  skills: string[];
  metrics: string;
  ringSystem?: boolean;
}

const PLANETS: PlanetConfig[] = [
  {
    id: "uiux",
    name: "UI/UX PLANET",
    category: "DESIGN BIOSPHERE",
    subtitle: "DESIGN & VISUAL SYSTEMS",
    tagline: "Organic visual systems, brand identities, high-precision UI/UX & fluid interfaces.",
    color: 0x059669,
    hexStr: "#059669",
    atmosphereColor: 0x34d399,
    atmosphereHex: "#34d399",
    glowHex: "rgba(16,185,129,0.55)",
    lightHex: "#6EE7B7",
    orbitRadius: 7.5,
    orbitTilt: 0.08,
    speed: 0.18,
    size: 1.05,
    phaseOffset: 0.4,
    link: "/planets/ui-ux",
    icon: Palette,
    skills: ["Figma Systems", "NO-TEMPLATE Brand", "SwiftUI UX", "Design Tokens"],
    metrics: "120+ Components • 4 Design Systems",
  },
  {
    id: "dev",
    name: "DEV PLANET",
    category: "ENGINEERING REACTOR",
    subtitle: "FRONTEND, IOS & AI ENGINEERING",
    tagline: "Hybrid Graph RAG pipelines, real-time ML fraud detection, native iOS & full-stack systems.",
    color: 0x1d4ed8,
    hexStr: "#1d4ed8",
    atmosphereColor: 0x60a5fa,
    atmosphereHex: "#60a5fa",
    glowHex: "rgba(59,130,246,0.55)",
    lightHex: "#93C5FD",
    orbitRadius: 12.5,
    orbitTilt: -0.12,
    speed: 0.11,
    size: 1.35,
    phaseOffset: 2.1,
    link: "/planets/development",
    icon: Code2,
    skills: ["Graph RAG", "ML Pipelines", "Swift & SwiftUI", "Next.js", "Move Web3"],
    metrics: "94.2% RAG Recall • <12ms ML Inference",
  },
  {
    id: "cybersec",
    name: "CYBER PLANET",
    category: "OBSIDIAN SOC",
    subtitle: "SECURITY, NETWORKS & ETHICAL HACKING",
    tagline: "Offensive reconnaissance, OSINT intelligence, threat hunting & encrypted multi-hop tunneling.",
    color: 0x5b21b6,
    hexStr: "#5b21b6",
    atmosphereColor: 0x8b5cf6,
    atmosphereHex: "#8b5cf6",
    glowHex: "rgba(139,92,246,0.55)",
    lightHex: "#C4B5FD",
    orbitRadius: 18.5,
    orbitTilt: 0.18,
    speed: 0.07,
    size: 1.15,
    phaseOffset: 4.2,
    link: "/planets/cybersecurity",
    icon: Shield,
    skills: ["Nmap & NSE", "OSINT (theHarvester)", "SOC Analysis", "ProxyChains"],
    metrics: "Zero-Trust Architecture • AZ-900 Certified",
    ringSystem: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   GLSL SHADERS
───────────────────────────────────────────────────────────────────────────── */

// Photorealistic planet surface shader with procedural noise
const PLANET_VERT = `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec2 vUv;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vUv = uv;
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const PLANET_FRAG = `
  uniform vec3 uSunPos;
  uniform vec3 uBaseColor;
  uniform vec3 uHighColor;
  uniform vec3 uDarkColor;
  uniform float uTime;
  uniform float uRoughness;
  uniform float uAtmosphereStrength;
  uniform vec3 uAtmosphereColor;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec2 vUv;
  varying vec3 vViewDir;

  // Seamless noise helpers
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0*C.xxx;
    vec3 x3 = x0 - 0.5;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * vec3(2.0,1.0,-1.0) - vec3(0.0,0.5,0.0);
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 g0 = vec3(a0.xy, h.x);
    vec3 g1 = vec3(a0.zw, h.y);
    vec3 g2 = vec3(a1.xy, h.z);
    vec3 g3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(g0,g0), dot(g1,g1), dot(g2,g2), dot(g3,g3)));
    g0 *= norm.x; g1 *= norm.y; g2 *= norm.z; g3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(g0,x0), dot(g1,x1), dot(g2,x2), dot(g3,x3)));
  }

  float fbm(vec3 p, int octaves) {
    float val = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 6; i++) {
      if (i >= octaves) break;
      val += snoise(p * freq) * amp;
      amp *= 0.5;
      freq *= 2.1;
    }
    return val;
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 L = normalize(uSunPos - vWorldPos);
    vec3 V = normalize(vViewDir);

    // Procedural surface position (rotated by time for animation)
    float ct = cos(uTime * 0.035);
    float st = sin(uTime * 0.035);
    vec3 rotPos = vec3(
      vWorldPos.x * ct - vWorldPos.z * st,
      vWorldPos.y,
      vWorldPos.x * st + vWorldPos.z * ct
    );

    // Multi-octave FBM terrain
    float terrain = fbm(rotPos * 0.6 + vec3(0.0, 0.0, uTime * 0.005), 5);
    float detail  = fbm(rotPos * 1.8 + vec3(uTime * 0.003, 0.0, 0.0), 4);
    float combined = terrain * 0.65 + detail * 0.35;

    // Blend surface colours
    float t = clamp((combined + 0.5) * 1.4, 0.0, 1.0);
    vec3 surfaceColor = mix(uDarkColor, mix(uBaseColor, uHighColor, t * t), smoothstep(0.0, 0.6, t));

    // Diffuse + ambient lighting
    float NdotL = max(dot(N, L), 0.0);
    float ambient = 0.04;
    float diffuse = NdotL * 0.92;

    // Specular highlight (sun glint on wet/icy areas)
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 64.0) * uRoughness * NdotL;
    vec3 sunColor = vec3(1.0, 0.92, 0.8);

    vec3 lit = surfaceColor * (ambient + diffuse) + sunColor * spec * 0.4;

    // Terminator softening (darkside soft falloff)
    float terminator = smoothstep(-0.12, 0.25, NdotL);
    lit *= mix(0.02, 1.0, terminator);

    // Fresnel-based atmospheric scattering rim
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.5);
    float rimStrength = uAtmosphereStrength * smoothstep(0.05, 0.45, NdotL + 0.2);
    vec3 atm = uAtmosphereColor * fresnel * rimStrength;

    // Subtle cloud wisp layer on atmosphere side
    float cloud = fbm(rotPos * 0.9 + vec3(uTime * 0.008, uTime * 0.004, 0.0), 3);
    float cloudMask = smoothstep(0.15, 0.55, cloud) * NdotL * 0.25;
    lit = mix(lit, lit + vec3(0.22, 0.22, 0.22), cloudMask);

    gl_FragColor = vec4(lit + atm, 1.0);
  }
`;

// Solar shader: granulated, emissive, animated corona
const SUN_VERT = `
  varying vec3 vNormal;
  varying vec3 vPos;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SUN_FRAG = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0*C.xxx;
    vec3 x3 = x0 - 0.5;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * vec3(2.0,1.0,-1.0) - vec3(0.0,0.5,0.0);
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 g0 = vec3(a0.xy, h.x);
    vec3 g1 = vec3(a0.zw, h.y);
    vec3 g2 = vec3(a1.xy, h.z);
    vec3 g3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(g0,g0), dot(g1,g1), dot(g2,g2), dot(g3,g3)));
    g0 *= norm.x; g1 *= norm.y; g2 *= norm.z; g3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(g0,x0), dot(g1,x1), dot(g2,x2), dot(g3,x3)));
  }

  void main() {
    // Animated plasma surface
    float n1 = snoise(vPos * 1.8 + vec3(uTime * 0.15, uTime * 0.08, 0.0));
    float n2 = snoise(vPos * 4.2 + vec3(-uTime * 0.10, 0.0, uTime * 0.12));
    float n3 = snoise(vPos * 9.0 + vec3(0.0, uTime * 0.20, -uTime * 0.06));

    float plasma = n1 * 0.55 + n2 * 0.30 + n3 * 0.15;

    // Core colour: yellow-white hotspot, orange-gold midtone, deep orange edge
    vec3 coreWhite = vec3(1.0, 0.98, 0.92);
    vec3 yellow    = vec3(1.0, 0.92, 0.35);
    vec3 orange    = vec3(1.0, 0.55, 0.08);
    vec3 deepOrange= vec3(0.9, 0.30, 0.02);

    float t = clamp(plasma * 0.5 + 0.5, 0.0, 1.0);
    vec3 baseColor = mix(deepOrange, mix(orange, mix(yellow, coreWhite, t*t), t), smoothstep(0.0, 0.8, t));

    // Limb darkening
    float limb = pow(max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 0.4);
    baseColor *= mix(0.65, 1.0, limb);

    gl_FragColor = vec4(baseColor, 1.0);
  }
`;

// Atmosphere glow (Fresnel rim only — the glowing halo around planets)
const ATM_VERT = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATM_FRAG = `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDir))), 2.8);
    gl_FragColor = vec4(uColor, fresnel * uIntensity);
  }
`;

// Star field instanced
const STAR_VERT = `
  attribute float aSize;
  attribute float aBrightness;
  varying float vBrightness;
  void main() {
    vBrightness = aBrightness;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mv.z);
    gl_PointSize = clamp(gl_PointSize, 0.4, 3.5);
    gl_Position = projectionMatrix * mv;
  }
`;

const STAR_FRAG = `
  uniform float uTime;
  varying float vBrightness;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float alpha = (1.0 - dist * 2.0) * vBrightness;
    // subtle twinkle
    alpha *= 0.75 + 0.25 * sin(uTime * (vBrightness * 3.0 + 1.5));
    gl_FragColor = vec4(1.0, 0.97, 0.95, alpha);
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function PlanetsContent() {
  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);
  const clockRef = useRef(new THREE.Clock());
  const mouseRef = useRef(new THREE.Vector2());
  const raycasterRef = useRef(new THREE.Raycaster());

  // Track planet meshes and states
  const planetMeshesRef = useRef<THREE.Mesh[]>([]);
  const planetGroupsRef = useRef<THREE.Group[]>([]);
  const orbitGroupsRef = useRef<THREE.Group[]>([]);
  const shaderMateriasRef = useRef<THREE.ShaderMaterial[]>([]);
  const sunMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const atmMaterialsRef = useRef<THREE.ShaderMaterial[]>([]);

  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetConfig | null>(null);
  const [isWarping, setIsWarping] = useState(false);
  const [warpTarget, setWarpTarget] = useState<PlanetConfig | null>(null);
  const [webGLError, setWebGLError] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Warp animation refs
  const warpProgressRef = useRef(0);
  const warpActiveRef = useRef(false);
  const warpPlanetIndexRef = useRef(-1);
  const originalCamPosRef = useRef(new THREE.Vector3());
  const targetCamPosRef = useRef(new THREE.Vector3());
  const warpCallbackRef = useRef<string | null>(null);

  const handlePlanetWarp = useCallback((planet: PlanetConfig, index: number) => {
    if (warpActiveRef.current) return;

    setWarpTarget(planet);
    setIsWarping(true);
    warpActiveRef.current = true;
    warpProgressRef.current = 0;
    warpPlanetIndexRef.current = index;
    warpCallbackRef.current = planet.link;

    if (cameraRef.current) {
      originalCamPosRef.current.copy(cameraRef.current.position);
    }
  }, []);

  /* ─────────────────────────────────────────────────────────────────────────
     SCENE SETUP
  ──────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!mountRef.current) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    // Check WebGL
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      setWebGLError(true);
      return;
    }

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x010209);
    sceneRef.current = scene;

    /* ── Camera ── */
    const isMobile = W < 768;
    const camera = new THREE.PerspectiveCamera(isMobile ? 65 : 55, W / H, 0.1, 2000);
    camera.position.set(0, isMobile ? 14 : 10, isMobile ? 36 : 32);
    camera.lookAt(0, 0, 0);
    originalCamPosRef.current.copy(camera.position);
    cameraRef.current = camera;

    /* ── Sun / Point Light ── */
    const SUN_POS = new THREE.Vector3(0, 0, 0);

    const sunGeo = new THREE.SphereGeometry(isMobile ? 1.8 : 2.2, 48, 48);
    const sunMat = new THREE.ShaderMaterial({
      vertexShader: SUN_VERT,
      fragmentShader: SUN_FRAG,
      uniforms: { uTime: { value: 0 } },
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunMesh);
    sunMaterialRef.current = sunMat;

    // Soft outer corona glow (billboard sphere, additive)
    const coronaGeo = new THREE.SphereGeometry(isMobile ? 3.0 : 3.8, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xffcc44,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(coronaGeo, coronaMat));

    // Point light emanating from sun
    const sunLight = new THREE.PointLight(0xfff5d0, 3.8, 120, 1.2);
    sunLight.position.copy(SUN_POS);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Soft ambient fill (very dim — only visible on dark side)
    const ambLight = new THREE.AmbientLight(0x111133, 0.18);
    scene.add(ambLight);

    /* ── Star Field (instanced points) ── */
    const STAR_COUNT = isMobile ? 3500 : 7000;
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const starSizes = new Float32Array(STAR_COUNT);
    const starBrightness = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      // Distribute on a giant sphere to avoid obvious seams
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 400 + Math.random() * 900;
      starPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);
      starSizes[i] = Math.random() * 1.8 + 0.4;
      starBrightness[i] = Math.random() * 0.7 + 0.3;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("aSize", new THREE.BufferAttribute(starSizes, 1));
    starGeo.setAttribute("aBrightness", new THREE.BufferAttribute(starBrightness, 1));

    const starMat = new THREE.ShaderMaterial({
      vertexShader: STAR_VERT,
      fragmentShader: STAR_FRAG,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(starGeo, starMat));

    // Subtle nebula backdrop (large dim sphere with radial gradient-like material)
    const nebGeo = new THREE.SphereGeometry(900, 16, 16);
    const nebMat = new THREE.MeshBasicMaterial({
      color: 0x070320,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.55,
    });
    scene.add(new THREE.Mesh(nebGeo, nebMat));

    /* ── Planets ── */
    const planetMeshes: THREE.Mesh[] = [];
    const planetGroups: THREE.Group[] = [];
    const orbitGroups: THREE.Group[] = [];
    const shaderMats: THREE.ShaderMaterial[] = [];
    const atmMats: THREE.ShaderMaterial[] = [];

    PLANETS.forEach((cfg, idx) => {
      // Orbit container (tilted at orbit inclination)
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.x = cfg.orbitTilt;
      scene.add(orbitGroup);
      orbitGroups.push(orbitGroup);

      // Orbit line (elliptical ring)
      const orbitPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 256; i++) {
        const a = (i / 256) * Math.PI * 2;
        orbitPoints.push(new THREE.Vector3(
          Math.cos(a) * cfg.orbitRadius,
          0,
          Math.sin(a) * cfg.orbitRadius
        ));
      }
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(cfg.atmosphereHex),
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      });
      orbitGroup.add(new THREE.Line(orbitGeo, orbitMat));

      // Orbital tracer dot
      const dotGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(cfg.atmosphereHex) });
      const orbitDot = new THREE.Mesh(dotGeo, dotMat);
      orbitGroup.add(orbitDot);

      // Planet container group (positioned along orbit)
      const planetGroup = new THREE.Group();
      orbitGroup.add(planetGroup);
      planetGroups.push(planetGroup);

      // Planet body — high-seg sphere for smooth shading
      const geo = new THREE.SphereGeometry(cfg.size, 96, 96);

      // Derive colour vectors from hex config
      const baseC = new THREE.Color(cfg.hexStr);
      const highC = baseC.clone().multiplyScalar(1.6).lerp(new THREE.Color(0xffffff), 0.25);
      const darkC = baseC.clone().multiplyScalar(0.22);
      const atmC  = new THREE.Color(cfg.atmosphereHex);

      const mat = new THREE.ShaderMaterial({
        vertexShader: PLANET_VERT,
        fragmentShader: PLANET_FRAG,
        uniforms: {
          uSunPos:            { value: SUN_POS.clone() },
          uBaseColor:         { value: new THREE.Vector3(baseC.r, baseC.g, baseC.b) },
          uHighColor:         { value: new THREE.Vector3(highC.r, highC.g, highC.b) },
          uDarkColor:         { value: new THREE.Vector3(darkC.r, darkC.g, darkC.b) },
          uAtmosphereColor:   { value: new THREE.Vector3(atmC.r, atmC.g, atmC.b) },
          uAtmosphereStrength:{ value: 1.6 },
          uRoughness:         { value: idx === 1 ? 0.35 : 0.18 },  // dev planet more specular
          uTime:              { value: 0 },
        },
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = false;
      mesh.userData.planetIndex = idx;
      planetGroup.add(mesh);
      planetMeshes.push(mesh);
      shaderMats.push(mat);

      // Atmospheric glow shell (slightly larger than planet, additive blend)
      const atmGeo = new THREE.SphereGeometry(cfg.size * 1.18, 40, 40);
      const atmMat = new THREE.ShaderMaterial({
        vertexShader: ATM_VERT,
        fragmentShader: ATM_FRAG,
        uniforms: {
          uColor:     { value: new THREE.Vector3(atmC.r, atmC.g, atmC.b) },
          uIntensity: { value: 0.85 },
        },
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      planetGroup.add(new THREE.Mesh(atmGeo, atmMat));
      atmMats.push(atmMat);

      // Cyber planet — Saturn ring system
      if (cfg.ringSystem) {
        const ringGeo = new THREE.TorusGeometry(cfg.size * 1.75, 0.06, 8, 200);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(cfg.atmosphereHex),
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.4;

        const ring2Geo = new THREE.TorusGeometry(cfg.size * 2.05, 0.03, 8, 200);
        const ring2 = new THREE.Mesh(ring2Geo, new THREE.MeshBasicMaterial({
          color: new THREE.Color(cfg.hexStr),
          transparent: true,
          opacity: 0.28,
          side: THREE.DoubleSide,
        }));
        ring2.rotation.x = Math.PI / 2.4;

        planetGroup.add(ring);
        planetGroup.add(ring2);
      }
    });

    planetMeshesRef.current = planetMeshes;
    planetGroupsRef.current = planetGroups;
    orbitGroupsRef.current = orbitGroups;
    shaderMateriasRef.current = shaderMats;
    atmMaterialsRef.current = atmMats;

    /* ── Render Loop ── */
    const clock = clockRef.current;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Update sun shader time
      if (sunMaterialRef.current) sunMaterialRef.current.uniforms.uTime.value = t;
      if (starMat) starMat.uniforms.uTime.value = t;

      // Animate planets along orbits
      PLANETS.forEach((cfg, idx) => {
        const orbitGroup = orbitGroups[idx];
        const planetGroup = planetGroups[idx];
        const mat = shaderMats[idx];
        if (!orbitGroup || !planetGroup || !mat) return;

        const angle = cfg.phaseOffset + t * cfg.speed;
        const px = Math.cos(angle) * cfg.orbitRadius;
        const pz = Math.sin(angle) * cfg.orbitRadius;

        planetGroup.position.set(px, 0, pz);

        // Slow axial rotation of planet
        const mesh = planetMeshes[idx];
        if (mesh) mesh.rotation.y += 0.0018;

        // Update planet shader time + compute world pos of sun relative to planet
        mat.uniforms.uTime.value = t;

        // Orbit tracer dot
        const dotAngle = angle + 0.5;
        const dotGroup = orbitGroup.children.find(c => c instanceof THREE.Mesh && c.geometry instanceof THREE.SphereGeometry && !(c instanceof THREE.Mesh && (c.material as THREE.ShaderMaterial).fragmentShader));
        if (dotGroup) {
          (dotGroup as THREE.Mesh).position.set(
            Math.cos(dotAngle) * cfg.orbitRadius,
            0,
            Math.sin(dotAngle) * cfg.orbitRadius
          );
        }

        // Hover atmosphere brightening
        const isHovered = hoveredPlanet?.id === cfg.id;
        const targetAtmIntensity = isHovered ? 1.6 : 0.85;
        const atmMat = atmMats[idx];
        if (atmMat) {
          atmMat.uniforms.uIntensity.value +=
            (targetAtmIntensity - atmMat.uniforms.uIntensity.value) * 0.08;
        }

        // Hover scale the planet group
        const targetScale = isHovered ? 1.12 : 1.0;
        planetGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      });

      // Warp camera animation
      if (warpActiveRef.current) {
        warpProgressRef.current += 0.022; // ~45 frames to full warp
        const p = Math.min(warpProgressRef.current, 1.0);

        if (camera && warpPlanetIndexRef.current >= 0) {
          const cfg = PLANETS[warpPlanetIndexRef.current];
          const orbitGroup = orbitGroups[warpPlanetIndexRef.current];
          const planetGroup = planetGroups[warpPlanetIndexRef.current];
          if (planetGroup && orbitGroup) {
            // World position of planet
            const worldPos = new THREE.Vector3();
            planetGroup.getWorldPosition(worldPos);

            // Camera flies towards planet from original position
            const eased = 1 - Math.pow(1 - p, 3); // ease-in cubic
            const dir = worldPos.clone().normalize();
            const targetPos = worldPos.clone().add(dir.multiplyScalar(cfg.size * 3.5 + 2));

            camera.position.lerp(targetPos, eased * 0.045);
            camera.lookAt(worldPos);
          }

          // Trigger route on completion
          if (p >= 1.0 && warpCallbackRef.current) {
            router.push(warpCallbackRef.current);
            warpCallbackRef.current = null;
          }
        }
      }

      // Subtle camera parallax from mouse
      if (!warpActiveRef.current && camera) {
        const targetX = mouseRef.current.x * 1.8;
        const targetY = -mouseRef.current.y * 1.2;
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (targetY + (isMobile ? 14 : 10) - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    /* ── Mouse Raycasting for hover ── */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (warpActiveRef.current) return;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const hits = raycasterRef.current.intersectObjects(planetMeshes, false);

      if (hits.length > 0) {
        const idx = (hits[0].object as THREE.Mesh).userData.planetIndex as number;
        setHoveredPlanet(PLANETS[idx]);
        renderer.domElement.style.cursor = "pointer";
      } else {
        setHoveredPlanet(null);
        renderer.domElement.style.cursor = "crosshair";
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (warpActiveRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      const clickNDC = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycasterRef.current.setFromCamera(clickNDC, camera);
      const hits = raycasterRef.current.intersectObjects(planetMeshes, false);
      if (hits.length > 0) {
        const idx = (hits[0].object as THREE.Mesh).userData.planetIndex as number;
        handlePlanetWarp(PLANETS[idx], idx);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (warpActiveRef.current || !e.touches[0]) return;
      const rect = renderer.domElement.getBoundingClientRect();
      const t = e.touches[0];
      const touchNDC = new THREE.Vector2(
        ((t.clientX - rect.left) / rect.width) * 2 - 1,
        -((t.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycasterRef.current.setFromCamera(touchNDC, camera);
      const hits = raycasterRef.current.intersectObjects(planetMeshes, false);
      if (hits.length > 0) {
        const idx = (hits[0].object as THREE.Mesh).userData.planetIndex as number;
        handlePlanetWarp(PLANETS[idx], idx);
      }
    };

    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("click", handleClick);
    renderer.domElement.addEventListener("touchstart", handleTouchStart, { passive: true });

    /* ── Resize ── */
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("click", handleClick);
      renderer.domElement.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [handlePlanetWarp, router]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setFocusedIndex(prev => prev === null ? 0 : (prev + 1) % PLANETS.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setFocusedIndex(prev => prev === null ? PLANETS.length - 1 : (prev - 1 + PLANETS.length) % PLANETS.length);
      } else if (e.key === "Enter" && focusedIndex !== null) {
        handlePlanetWarp(PLANETS[focusedIndex], focusedIndex);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [focusedIndex, handlePlanetWarp]);

  /* ── WebGL fallback ── */
  if (webGLError) {
    return (
      <div className="w-full h-screen bg-[#010209] flex items-center justify-center text-center text-white p-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Your browser doesn't support WebGL</h1>
          <p className="text-white/60 mb-6">Please use a modern browser to view the 3D solar system.</p>
          <Link href="/" className="underline text-blue-400">Return to Portfolio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#010209] text-white select-none">
      {/* Three.js Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* ── TOP NAV ─────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 md:px-8 md:py-4 pointer-events-none">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link
            href="/"
            className="pointer-events-auto group flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-xl hover:border-white/30 hover:bg-white/10 transition-all"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            <ArrowLeft size={14} className="text-white/70 group-hover:-translate-x-0.5 transition-transform" />
            PORTFOLIO
          </Link>

          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-xl font-mono text-[11px] text-white/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="hidden sm:inline">3 ACTIVE ORBITS // TELEMETRY ONLINE</span>
            <span className="sm:hidden">3 ORBITS</span>
          </div>
        </div>
      </header>

      {/* ── INTRO COPY ─────────────────────────────── */}
      <div className="absolute top-[76px] md:top-20 left-0 right-0 flex flex-col items-center pointer-events-none z-20 px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3.5 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-white/55 backdrop-blur-md mb-2">
          <Sparkles size={11} className="text-amber-300/80" />
          ESWAR ADITYA // UNIVERSE MAP
        </div>
        <h1
          className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white/90 leading-tight text-center drop-shadow-2xl"
          style={{ fontFamily: "var(--font-cabinet)" }}
        >
          EXPLORE MY UNIVERSE
        </h1>
        <p className="mt-1.5 text-[11px] md:text-xs font-mono text-white/50 tracking-wide text-center max-w-xs md:max-w-sm">
          <span className="text-white/80">THREE WORLDS. ONE MIND.</span>
          {" "}Choose a planet to explore.
        </p>
      </div>

      {/* ── HOVER INFO CARD (Desktop) ────────────── */}
      {hoveredPlanet && !isWarping && (
        <div className="hidden lg:block fixed right-8 bottom-24 z-30 pointer-events-none">
          <div
            className="w-76 rounded-2xl border border-white/12 bg-black/85 p-5 backdrop-blur-2xl"
            style={{ boxShadow: `0 0 40px ${hoveredPlanet.glowHex}` }}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-wider rounded-md px-2 py-0.5"
                style={{
                  backgroundColor: hoveredPlanet.atmosphereHex + "20",
                  color: hoveredPlanet.lightHex,
                  border: `1px solid ${hoveredPlanet.atmosphereHex}40`,
                }}
              >
                {hoveredPlanet.category}
              </span>
            </div>
            <h3 className="text-lg font-bold uppercase text-white mt-2 tracking-tight" style={{ fontFamily: "var(--font-cabinet)" }}>
              {hoveredPlanet.name}
            </h3>
            <p className="text-xs text-white/65 mt-1 leading-relaxed">{hoveredPlanet.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {hoveredPlanet.skills.map(s => (
                <span key={s} className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono text-white/75">{s}</span>
              ))}
            </div>
            <div className="mt-3 text-[11px] font-mono text-white/40 flex justify-between items-center border-t border-white/10 pt-2">
              <span>{hoveredPlanet.metrics}</span>
              <span className="text-white/90 font-bold tracking-wide">CLICK TO ENTER →</span>
            </div>
          </div>
        </div>
      )}

      {/* ── WARP OVERLAY (subtle flash vignette) ─── */}
      {isWarping && (
        <div
          className="fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000"
          style={{
            background: warpTarget
              ? `radial-gradient(ellipse at center, ${warpTarget.glowHex} 0%, transparent 70%)`
              : undefined,
            opacity: isWarping ? 0.35 : 0,
          }}
        />
      )}

      {/* ── BOTTOM NAVIGATION DOCK ───────────────── */}
      <footer className="fixed bottom-5 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 rounded-2xl border border-white/12 bg-black/80 p-1.5 sm:p-2 backdrop-blur-2xl shadow-2xl"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}
          aria-label="Planet navigation"
        >
          {PLANETS.map((planet, idx) => {
            const Icon = planet.icon;
            const isHov = hoveredPlanet?.id === planet.id;
            const isFocused = focusedIndex === idx;

            return (
              <button
                key={planet.id}
                onClick={() => handlePlanetWarp(planet, idx)}
                onMouseEnter={() => setHoveredPlanet(planet)}
                onMouseLeave={() => setHoveredPlanet(null)}
                aria-label={`Navigate to ${planet.name}`}
                className={`group relative flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold uppercase tracking-wide transition-all duration-200 outline-none ${
                  isHov || isFocused
                    ? "bg-white/15 text-white scale-105"
                    : "bg-white/[0.04] text-white/65 hover:bg-white/10 hover:text-white"
                }`}
                style={{
                  border: isHov || isFocused ? `1px solid ${planet.atmosphereHex}70` : "1px solid rgba(255,255,255,0.07)",
                  fontFamily: "var(--font-roboto)",
                  boxShadow: isHov ? `0 0 20px ${planet.glowHex}` : undefined,
                }}
              >
                <Icon size={14} style={{ color: isHov || isFocused ? planet.atmosphereHex : "currentColor" }} className="transition-colors" />
                <span className="font-bold text-[11px]">
                  {planet.id === "uiux" ? "UI/UX" : planet.id === "dev" ? "DEV" : "CYBER"}
                </span>
                <span className="hidden sm:inline text-white/35 text-[10px]">
                  {planet.id === "uiux" ? "Design" : planet.id === "dev" ? "Code" : "Security"}
                </span>
                {(isHov || isFocused) && (
                  <span
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3.5 h-0.5 rounded-full"
                    style={{ backgroundColor: planet.atmosphereHex }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}
