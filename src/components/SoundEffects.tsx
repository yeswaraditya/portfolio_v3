"use client";

import { useEffect, useRef } from "react";

const SCROLL_END_DELAY_MS = 200;
const SCROLL_DEDUPE_MS = 80;
const MIN_WHEEL_DELTA_PX = 35;
const MIN_SCROLL_PX = 22;
const MIN_TOUCH_PX = 25;
const CLICK_SOUND_SRC = "/sounds/click.mp3";
const SCROLL_SOUND_SRC = "/sounds/scroll.mp3";

function playAudioClone(template: HTMLAudioElement) {
  const audio = template.cloneNode() as HTMLAudioElement;
  audio.volume = template.volume;
  audio.play().catch(() => {});
}

function getWheelDeltaMagnitude(event: WheelEvent): number {
  let { deltaX, deltaY, deltaMode } = event;

  if (deltaMode === 1) {
    deltaX *= 16;
    deltaY *= 16;
  } else if (deltaMode === 2) {
    const page = window.innerHeight;
    deltaX *= page;
    deltaY *= page;
  }

  return Math.max(Math.abs(deltaX), Math.abs(deltaY));
}

export default function SoundEffects() {
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const scrollAudioRef = useRef<HTMLAudioElement | null>(null);
  const scrollSessionActiveRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollActivityRef = useRef(0);
  const lastScrollPositionRef = useRef({ x: 0, y: 0 });
  const lastTouchPositionRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastScrollPositionRef.current = {
      x: window.scrollX,
      y: window.scrollY,
    };

    const clickAudio = new Audio(CLICK_SOUND_SRC);
    clickAudio.preload = "auto";
    clickAudio.volume = 0.55;
    clickAudioRef.current = clickAudio;

    const scrollAudio = new Audio(SCROLL_SOUND_SRC);
    scrollAudio.preload = "auto";
    scrollAudio.volume = 0.5;
    scrollAudioRef.current = scrollAudio;

    const handleClickSound = () => {
      const template = clickAudioRef.current;
      if (!template) return;
      playAudioClone(template);
    };

    const handleScrollActivity = () => {
      const now = Date.now();

      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
      scrollEndTimerRef.current = setTimeout(() => {
        scrollSessionActiveRef.current = false;
      }, SCROLL_END_DELAY_MS);

      if (scrollSessionActiveRef.current) return;

      if (now - lastScrollActivityRef.current < SCROLL_DEDUPE_MS) return;
      lastScrollActivityRef.current = now;

      scrollSessionActiveRef.current = true;

      const template = scrollAudioRef.current;
      if (!template) return;
      playAudioClone(template);
    };

    const handleWheel = (event: WheelEvent) => {
      if (getWheelDeltaMagnitude(event) < MIN_WHEEL_DELTA_PX) return;
      handleScrollActivity();
    };

    const handleScroll = () => {
      const x = window.scrollX;
      const y = window.scrollY;
      const deltaX = Math.abs(x - lastScrollPositionRef.current.x);
      const deltaY = Math.abs(y - lastScrollPositionRef.current.y);

      if (deltaX < MIN_SCROLL_PX && deltaY < MIN_SCROLL_PX) return;

      lastScrollPositionRef.current = { x, y };
      handleScrollActivity();
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return;

      const touch = event.touches[0];
      const current = { x: touch.clientX, y: touch.clientY };

      if (!lastTouchPositionRef.current) {
        lastTouchPositionRef.current = current;
        return;
      }

      const deltaX = current.x - lastTouchPositionRef.current.x;
      const deltaY = current.y - lastTouchPositionRef.current.y;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < MIN_TOUCH_PX) return;

      lastTouchPositionRef.current = current;
      handleScrollActivity();
    };

    const handleTouchEnd = () => {
      lastTouchPositionRef.current = null;
    };

    const handleKeyScroll = (event: KeyboardEvent) => {
      const scrollKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];
      if (!scrollKeys.includes(event.key)) return;
      handleScrollActivity();
    };

    const listenerOptions: AddEventListenerOptions = { capture: true, passive: true };

    document.addEventListener("click", handleClickSound, true);
    document.addEventListener("wheel", handleWheel, listenerOptions);
    document.addEventListener("scroll", handleScroll, true);
    document.addEventListener("touchmove", handleTouchMove, listenerOptions);
    document.addEventListener("touchend", handleTouchEnd, listenerOptions);
    document.addEventListener("touchcancel", handleTouchEnd, listenerOptions);
    document.addEventListener("keydown", handleKeyScroll, true);

    return () => {
      document.removeEventListener("click", handleClickSound, true);
      document.removeEventListener("wheel", handleWheel, listenerOptions);
      document.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("touchmove", handleTouchMove, listenerOptions);
      document.removeEventListener("touchend", handleTouchEnd, listenerOptions);
      document.removeEventListener("touchcancel", handleTouchEnd, listenerOptions);
      document.removeEventListener("keydown", handleKeyScroll, true);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
      clickAudioRef.current = null;
      scrollAudioRef.current = null;
    };
  }, []);

  return null;
}
