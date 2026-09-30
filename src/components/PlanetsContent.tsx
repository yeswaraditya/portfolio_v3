"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RotateCcw } from "lucide-react";

type Direction = "up" | "down" | "left" | "right";
type Position = { x: number; y: number };
type HoleId = (typeof HOLES)[number]["id"];
type Fall = { id: HoleId; startedAt: number; from: Position };

const START: Position = { x: 0.5, y: 0.78 };
const WORLD = { width: 1800, height: 1200 };
const BALL_RADIUS = 20;
const POND = { x: 198, y: 840, rx: 198, ry: 96, rotation: -0.25 };
const HOLES = [
  { id: "design", name: "UI/UX", subtitle: "Complete design journey", x: 0.22, y: 0.3, href: "/skills#interface", color: "#ff4d00" },
  { id: "build", name: "DEV", subtitle: "Software & AI systems", x: 0.67, y: 0.28, href: "/planets/development", color: "#0055ff" },
  { id: "security", name: "CYBER", subtitle: "Security practice", x: 0.78, y: 0.66, href: "/planets/cybersecurity", color: "#6b36ff" },
] as const;

const clamp = (value: number) => Math.max(0.04, Math.min(0.96, value));

function drawGround(canvas: HTMLCanvasElement, player: Position, nearHole: string | null, camera: Position, roll: number, fall: Fall | null, fallProgress: number) {
  const context = canvas.getContext("2d");
  if (!context) return;
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * ratio));
  const height = Math.max(1, Math.round(rect.height * ratio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.fillStyle = "#e4bd82";
  context.fillRect(0, 0, rect.width, rect.height);
  context.save();
  const zoom = rect.width < 640 ? 0.8 : 1;
  context.translate(rect.width / 2, rect.height * 0.55);
  context.scale(zoom, zoom);
  context.translate(-camera.x * WORLD.width, -camera.y * WORLD.height);
  const w = WORLD.width;
  const h = WORLD.height;

  context.fillStyle = "#91cf4f";
  context.fillRect(0, 0, w, h);

  context.fillStyle = "rgba(31, 105, 46, 0.14)";
  for (let x = 0; x < w; x += 44) context.fillRect(x, 0, 18, h);
  context.fillStyle = "rgba(255,255,255,0.12)";
  for (let y = 8; y < h; y += 54) context.fillRect(0, y, w, 8);
  context.strokeStyle = "#256332";
  context.lineWidth = 8;
  context.strokeRect(4, 4, w - 8, h - 8);
  // Small ground marks make the camera's movement easy to read.
  context.strokeStyle = "rgba(31, 105, 46, 0.3)";
  context.lineWidth = 2;
  for (let y = 35; y < h; y += 90) {
    for (let x = 30; x < w; x += 110) {
      const offset = (y % 180) * 0.3;
      context.beginPath();
      context.moveTo(x + offset, y);
      context.lineTo(x + offset - 3, y - 6);
      context.moveTo(x + offset, y);
      context.lineTo(x + offset + 4, y - 8);
      context.stroke();
    }
  }

  context.strokeStyle = "#e4bd82";
  context.lineCap = "round";
  context.lineWidth = Math.max(24, Math.min(w, h) * 0.045);
  context.beginPath();
  context.moveTo(w * 0.5, h * 0.92);
  context.bezierCurveTo(w * 0.5, h * 0.7, w * 0.67, h * 0.62, w * 0.78, h * 0.66);
  context.moveTo(w * 0.48, h * 0.72);
  context.bezierCurveTo(w * 0.38, h * 0.55, w * 0.23, h * 0.44, w * 0.22, h * 0.3);
  context.moveTo(w * 0.48, h * 0.72);
  context.bezierCurveTo(w * 0.51, h * 0.49, w * 0.61, h * 0.37, w * 0.67, h * 0.28);
  context.stroke();

  context.fillStyle = "#d4f0ff";
  context.beginPath();
  context.ellipse(POND.x, POND.y, POND.rx, POND.ry, POND.rotation, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "#0055ff";
  context.lineWidth = 3;
  context.stroke();
  context.strokeStyle = "rgba(0,85,255,0.35)";
  context.beginPath();
  context.ellipse(POND.x, POND.y, POND.rx * 0.7, POND.ry * 0.65, POND.rotation, 0, Math.PI * 2);
  context.stroke();

  context.fillStyle = "#ffe600";
  context.beginPath();
  context.arc(w * 0.53, h * 0.17, Math.max(18, w * 0.025), 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "#000";
  context.lineWidth = 3;
  context.stroke();

  HOLES.forEach((hole) => {
    const x = w * hole.x;
    const y = h * hole.y;
    const radius = Math.max(28, Math.min(w, h) * 0.045);
    const active = nearHole === hole.id;
    context.save();
    context.fillStyle = hole.color;
    context.beginPath();
    context.ellipse(x, y + 5, radius * 1.25, radius * 0.52, 0, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#101010";
    context.beginPath();
    context.ellipse(x, y, radius, radius * 0.55, 0, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = active ? "#ffe600" : "#000";
    context.lineWidth = active ? 5 : 3;
    context.stroke();
    context.fillStyle = "#000";
    context.fillRect(x - 1.5, y - radius * 1.5, 3, radius * 0.62);
    context.fillStyle = hole.color;
    context.beginPath();
    context.moveTo(x, y - radius * 1.5);
    context.lineTo(x + radius * 0.85, y - radius * 1.25);
    context.lineTo(x, y - radius);
    context.closePath();
    context.fill();
    context.fillStyle = "#000";
    context.font = "700 11px ui-monospace, monospace";
    context.textAlign = "center";
    context.fillText(hole.name, x, y + radius * 1.75);
    context.restore();
  });

  const px = w * player.x;
  const py = h * player.y;
  const avatar = BALL_RADIUS * (1 - fallProgress * 0.94);
  if (fallProgress < 1) {
    context.fillStyle = `rgba(0,0,0,${0.2 * (1 - fallProgress)})`;
    context.beginPath();
    context.ellipse(px, py + avatar * 1.25, avatar * 0.9, avatar * 0.35, 0, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#000";
    context.beginPath();
    context.arc(px, py, avatar + 2, 0, Math.PI * 2);
    context.fill();
    const ball = context.createRadialGradient(px - avatar * 0.35, py - avatar * 0.35, 1, px, py, Math.max(avatar, 1));
    ball.addColorStop(0, "#ffe600");
    ball.addColorStop(0.45, "#ff4d00");
    ball.addColorStop(1, "#9c2200");
    context.fillStyle = ball;
    context.beginPath();
    context.arc(px, py, avatar, 0, Math.PI * 2);
    context.fill();
    context.save();
    context.beginPath();
    context.arc(px, py, avatar, 0, Math.PI * 2);
    context.clip();
    context.translate(px, py);
    context.rotate(roll * 0.45);
    context.strokeStyle = "rgba(255,243,217,0.7)";
    context.lineWidth = 3;
    context.beginPath();
    const seam = Math.sin(roll) * avatar * 0.7;
    context.ellipse(seam, 0, avatar * 0.3, avatar, 0, 0, Math.PI * 2);
    context.stroke();
    context.restore();
    if (!fall) {
      context.fillStyle = "#000";
      context.font = "700 10px ui-monospace, monospace";
      context.textAlign = "center";
      context.fillText("YOU", px, py - avatar * 1.55);
    }
  }
  if (fall) {
    const hole = HOLES.find((item) => item.id === fall.id)!;
    const hx = w * hole.x;
    const hy = h * hole.y;
    const radius = Math.max(28, Math.min(w, h) * 0.045);
    // The near edge of the rim masks the ball as it drops below ground level.
    context.save();
    context.beginPath();
    context.rect(hx - radius * 1.3, hy, radius * 2.6, radius);
    context.clip();
    context.strokeStyle = hole.color;
    context.lineWidth = 9;
    context.beginPath();
    context.ellipse(hx, hy, radius * 1.1, radius * 0.57, 0, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }
  context.restore();

  // Overview remains fixed while the field scrolls under the ball.
  const mapWidth = Math.min(156, rect.width * 0.32);
  const mapHeight = mapWidth * WORLD.height / WORLD.width;
  const mapX = rect.width - mapWidth - 20;
  const mapY = 88;
  context.fillStyle = "#eeeeee";
  context.fillRect(mapX - 6, mapY - 6, mapWidth + 12, mapHeight + 12);
  context.fillStyle = "#91cf4f";
  context.fillRect(mapX, mapY, mapWidth, mapHeight);
  context.strokeStyle = "#000";
  context.lineWidth = 2;
  context.strokeRect(mapX - 6, mapY - 6, mapWidth + 12, mapHeight + 12);
  HOLES.forEach((hole) => {
    context.fillStyle = hole.color;
    context.beginPath();
    context.arc(mapX + hole.x * mapWidth, mapY + hole.y * mapHeight, 4, 0, Math.PI * 2);
    context.fill();
  });
  context.fillStyle = "#000";
  context.beginPath();
  context.arc(mapX + player.x * mapWidth, mapY + player.y * mapHeight, 3, 0, Math.PI * 2);
  context.fill();
  context.font = "700 10px ui-monospace, monospace";
  context.textAlign = "center";
  context.fillText("FIELD MAP", mapX + mapWidth / 2, mapY + mapHeight + 22);
}

export default function PlanetsContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<Position>(START);
  const nearRef = useRef<string | null>(null);
  const targetRef = useRef<Position | null>(null);
  const velocityRef = useRef<Position>({ x: 0, y: 0 });
  const cameraRef = useRef<Position>({ ...START });
  const rollRef = useRef(0);
  const keysRef = useRef(new Set<string>());
  const controlRef = useRef<Direction | null>(null);
  const fallRef = useRef<Fall | null>(null);
  const navigatedRef = useRef(false);
  const router = useRouter();
  const [nearHole, setNearHole] = useState<string | null>(null);

  const redraw = useCallback((position: Position, holeId: string | null) => {
    if (canvasRef.current) drawGround(canvasRef.current, position, holeId, cameraRef.current, rollRef.current, fallRef.current, 0);
  }, []);

  useEffect(() => {
    const onResize = () => redraw(playerRef.current, nearRef.current);
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [redraw]);

  const placeBall = useCallback((next: Position) => {
    const destination = HOLES.find((hole) => Math.hypot((next.x - hole.x) * WORLD.width, (next.y - hole.y) * WORLD.height) < 80)?.id ?? null;
    playerRef.current = next;
    nearRef.current = destination;
    setNearHole((previous) => previous === destination ? previous : destination);
  }, []);

  const beginFall = useCallback((id: HoleId, time: number) => {
    if (fallRef.current) return;
    fallRef.current = { id, startedAt: time, from: { ...playerRef.current } };
    targetRef.current = null;
    velocityRef.current = { x: 0, y: 0 };
    keysRef.current.clear();
    controlRef.current = null;
    nearRef.current = id;
    setNearHole(id);
  }, []);

  const enterHole = useCallback(() => {
    const destination = HOLES.find((hole) => hole.id === nearRef.current);
    if (destination) beginFall(destination.id, performance.now());
  }, [beginFall]);

  const reset = useCallback(() => {
    targetRef.current = null;
    fallRef.current = null;
    navigatedRef.current = false;
    velocityRef.current = { x: 0, y: 0 };
    keysRef.current.clear();
    controlRef.current = null;
    playerRef.current = START;
    cameraRef.current = { ...START };
    rollRef.current = 0;
    nearRef.current = null;
    setNearHole(null);
  }, []);

  useEffect(() => {
    let frame = 0;
    let previousTime = 0;
    const animate = (time: number) => {
      const dt = Math.min((time - (previousTime || time)) / 1000, 0.033);
      previousTime = time;
      const falling = fallRef.current;
      if (falling) {
        const hole = HOLES.find((item) => item.id === falling.id)!;
        const progress = Math.min(1, (time - falling.startedAt) / 850);
        const ease = 1 - Math.pow(1 - progress, 3);
        const next = {
          x: falling.from.x + (hole.x - falling.from.x) * ease,
          y: falling.from.y + (hole.y - falling.from.y) * ease,
        };
        playerRef.current = next;
        cameraRef.current.x += (next.x - cameraRef.current.x) * (1 - Math.exp(-7 * dt));
        cameraRef.current.y += (next.y - cameraRef.current.y) * (1 - Math.exp(-7 * dt));
        rollRef.current += dt * 5 * (1 - progress);
        if (canvasRef.current) drawGround(canvasRef.current, next, falling.id, cameraRef.current, rollRef.current, falling, progress);
        if (progress === 1 && !navigatedRef.current) {
          navigatedRef.current = true;
          router.push(hole.href);
        }
        frame = window.requestAnimationFrame(animate);
        return;
      }
      const width = WORLD.width;
      const height = WORLD.height;
      const current = playerRef.current;
      const keys = keysRef.current;
      const control = controlRef.current;
      let dx = Number(keys.has("ArrowRight") || keys.has("KeyD") || control === "right") - Number(keys.has("ArrowLeft") || keys.has("KeyA") || control === "left");
      let dy = Number(keys.has("ArrowDown") || keys.has("KeyS") || control === "down") - Number(keys.has("ArrowUp") || keys.has("KeyW") || control === "up");
      let speed = 350;
      if (dx || dy) targetRef.current = null;
      const target = targetRef.current;
      if (target) {
        dx = (target.x - current.x) * width;
        dy = (target.y - current.y) * height;
        const distance = Math.hypot(dx, dy);
        speed = Math.min(speed, distance * 4);
        if (distance < 0.7) {
          targetRef.current = null;
          dx = 0;
          dy = 0;
        }
      }
      const length = Math.hypot(dx, dy);
      const desiredX = length ? dx / length * speed : 0;
      const desiredY = length ? dy / length * speed : 0;
      const velocity = velocityRef.current;
      // Finite acceleration, rolling resistance, and a strong optional brake.
      if (length) {
        const forceX = (desiredX - velocity.x) * 6;
        const forceY = (desiredY - velocity.y) * 6;
        const force = Math.hypot(forceX, forceY);
        const limit = force > 1150 ? 1150 / force : 1;
        velocity.x += forceX * limit * dt;
        velocity.y += forceY * limit * dt;
      }
      const onSand = Math.hypot(current.x * width - width * 0.53, current.y * height - height * 0.17) < 45;
      const resistance = keys.has("Space") ? 16 : onSand ? 6 : length ? 0.35 : 3.5;
      const friction = Math.exp(-resistance * dt);
      velocity.x *= friction;
      velocity.y *= friction;
      if (Math.hypot(velocity.x, velocity.y) < 0.15) {
        velocity.x = 0;
        velocity.y = 0;
      }
      let x = current.x * width + velocity.x * dt;
      let y = current.y * height + velocity.y * dt;
      const margin = BALL_RADIUS + 8;
      if (x < margin || x > width - margin) {
        x = Math.max(margin, Math.min(width - margin, x));
        velocity.x *= -0.55;
        targetRef.current = null;
      }
      if (y < margin || y > height - margin) {
        y = Math.max(margin, Math.min(height - margin, y));
        velocity.y *= -0.55;
        targetRef.current = null;
      }
      // Resolve the pond in its rotated local coordinates, then reflect velocity.
      const cos = Math.cos(POND.rotation);
      const sin = Math.sin(POND.rotation);
      const localX = cos * (x - POND.x) + sin * (y - POND.y);
      const localY = -sin * (x - POND.x) + cos * (y - POND.y);
      const rx = POND.rx + BALL_RADIUS;
      const ry = POND.ry + BALL_RADIUS;
      const ellipseDistance = Math.hypot(localX / rx, localY / ry);
      if (ellipseDistance < 1) {
        const angle = Math.atan2(localY / ry, localX / rx);
        const surfaceX = Math.cos(angle) * rx;
        const surfaceY = Math.sin(angle) * ry;
        x = POND.x + cos * surfaceX - sin * surfaceY;
        y = POND.y + sin * surfaceX + cos * surfaceY;
        const gradientX = surfaceX / (rx * rx);
        const gradientY = surfaceY / (ry * ry);
        const norm = Math.hypot(gradientX, gradientY);
        const nx = (cos * gradientX - sin * gradientY) / norm;
        const ny = (sin * gradientX + cos * gradientY) / norm;
        const impact = velocity.x * nx + velocity.y * ny;
        if (impact < 0) {
          velocity.x -= 1.55 * impact * nx;
          velocity.y -= 1.55 * impact * ny;
        }
        targetRef.current = null;
      }
      const next = { x: x / width, y: y / height };
      const capturedHole = HOLES.find((hole) => Math.hypot(x - hole.x * width, y - hole.y * height) < 57);
      if (capturedHole) {
        playerRef.current = next;
        beginFall(capturedHole.id, time);
      }
      rollRef.current += Math.hypot(x - current.x * width, y - current.y * height) / BALL_RADIUS;
      const cameraEase = 1 - Math.exp(-7 * dt);
      cameraRef.current.x += (next.x + velocity.x * 0.12 / width - cameraRef.current.x) * cameraEase;
      cameraRef.current.y += (next.y + velocity.y * 0.12 / height - cameraRef.current.y) * cameraEase;
      if (!capturedHole) placeBall(next);
      if (canvasRef.current) drawGround(canvasRef.current, next, nearRef.current, cameraRef.current, rollRef.current, fallRef.current, 0);
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [beginFall, placeBall, router]);

  const moveToPointer = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (fallRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const zoom = rect.width < 640 ? 0.8 : 1;
    targetRef.current = {
      x: clamp(cameraRef.current.x + (event.clientX - rect.left - rect.width / 2) / zoom / WORLD.width),
      y: clamp(cameraRef.current.y + (event.clientY - rect.top - rect.height * 0.55) / zoom / WORLD.height),
    };
  };

  const startControl = (direction: Direction) => {
    if (fallRef.current) return;
    targetRef.current = null;
    controlRef.current = direction;
  };

  const stopControl = () => {
    controlRef.current = null;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (fallRef.current) return;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD", "Space"].includes(event.code)) {
        event.preventDefault();
        keysRef.current.add(event.code);
        targetRef.current = null;
      }
      if (event.key === "Enter" && nearRef.current) {
        event.preventDefault();
        enterHole();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => keysRef.current.delete(event.code);
    const clearInput = () => {
      keysRef.current.clear();
      controlRef.current = null;
      targetRef.current = null;
      velocityRef.current = { x: 0, y: 0 };
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", clearInput);
    window.addEventListener("pointerup", stopControl);
    window.addEventListener("pointercancel", stopControl);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", clearInput);
      window.removeEventListener("pointerup", stopControl);
      window.removeEventListener("pointercancel", stopControl);
    };
  }, [enterHole]);

  const nearby = HOLES.find((hole) => hole.id === nearHole);

  return (
    <div className="relative h-svh overflow-hidden bg-[#91cf4f] text-black">
      <canvas ref={canvasRef} onPointerDown={moveToPointer} className="absolute inset-0 h-full w-full touch-none cursor-crosshair" aria-label="Interactive career playground. Click or tap to move the ball; use arrow keys or WASD to roll and Space to brake." />
      <header className="relative z-10 flex items-center justify-between border-b-2 border-black bg-[#eeeeee]/95 px-5 py-4 backdrop-blur md:px-10">
        <Link href="/" className="font-[family-name:var(--font-cabinet)] text-2xl font-black uppercase tracking-[-0.06em]">YEA</Link>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] sm:text-xs">Career Playground / 03 destinations</p>
        <Link href="/experience" className="hidden font-mono text-xs font-bold uppercase tracking-[0.12em] hover:text-[#ff4d00] md:block">Experience</Link>
      </header>

      <section className="pointer-events-none relative z-10 mx-auto max-w-[1440px] px-5 pt-5 md:px-10 md:pt-6">
        <div className="max-w-[55%] md:max-w-sm">
          <h1 className="font-[family-name:var(--font-cabinet)] text-3xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-4xl">Career<br />Playground</h1>
          <p className="mt-3 hidden max-w-xs text-sm leading-relaxed sm:block">Roll with WASD or arrows. Space to brake. Reach a hole to drop in.</p>
        </div>
      </section>

      <aside className="absolute bottom-5 left-5 z-20 w-[calc(100%-205px)] max-w-xs border-2 border-black bg-[#eeeeee] p-3 shadow-[6px_6px_0_#000] sm:w-auto sm:p-4 md:bottom-8 md:left-10">
        {nearby ? <><p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#ff4d00]">Destination ahead</p><h2 className="mt-1 font-[family-name:var(--font-cabinet)] text-3xl font-black uppercase tracking-[-0.05em]">{nearby.name}</h2><p className="mt-1 text-sm">{nearby.subtitle}</p><p className="mt-2 text-xs">Roll onto the hole to drop in.</p><button onClick={enterHole} className="mt-3 border-2 border-black bg-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-[#ff4d00] hover:border-[#ff4d00]">Enter {nearby.name}</button></> : <><p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-black/55">Controls</p><p className="mt-2 text-sm leading-relaxed">Roll toward UI/UX, DEV, or CYBER. Tap the field to move. Hold Space to brake.</p></>}
      </aside>

      <div className="absolute bottom-5 right-5 z-20 grid touch-none grid-cols-3 gap-1 border-2 border-black bg-[#eeeeee] p-2 shadow-[6px_6px_0_#000] md:bottom-8 md:right-10" aria-label="On-screen movement controls">
        <span /><button onPointerDown={() => startControl("up")} onPointerUp={stopControl} onPointerLeave={stopControl} className="grid h-11 w-11 place-items-center border-2 border-black hover:bg-[#ffe600]" aria-label="Move up"><ArrowUp size={18} /></button><span />
        <button onPointerDown={() => startControl("left")} onPointerUp={stopControl} onPointerLeave={stopControl} className="grid h-11 w-11 place-items-center border-2 border-black hover:bg-[#ffe600]" aria-label="Move left"><ArrowLeft size={18} /></button><button onClick={reset} className="grid h-11 w-11 place-items-center border-2 border-black hover:bg-[#ff4d00] hover:text-white" aria-label="Reset playground position"><RotateCcw size={17} /></button><button onPointerDown={() => startControl("right")} onPointerUp={stopControl} onPointerLeave={stopControl} className="grid h-11 w-11 place-items-center border-2 border-black hover:bg-[#ffe600]" aria-label="Move right"><ArrowRight size={18} /></button>
        <span /><button onPointerDown={() => startControl("down")} onPointerUp={stopControl} onPointerLeave={stopControl} className="grid h-11 w-11 place-items-center border-2 border-black hover:bg-[#ffe600]" aria-label="Move down"><ArrowDown size={18} /></button><span />
      </div>
    </div>
  );
}
