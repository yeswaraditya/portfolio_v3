"use client";

import { useEffect, useRef } from "react";

const CLICK_SOUND_SRC = "/sounds/click.mp3";

function playAudioClone(template: HTMLAudioElement) {
  const audio = template.cloneNode() as HTMLAudioElement;
  audio.volume = template.volume;
  audio.play().catch(() => {});
}

export default function SoundEffects() {
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const clickAudio = new Audio(CLICK_SOUND_SRC);
    clickAudio.preload = "auto";
    clickAudio.volume = 0.55;
    clickAudioRef.current = clickAudio;

    const handleClickSound = () => {
      const template = clickAudioRef.current;
      if (!template) return;
      playAudioClone(template);
    };

    document.addEventListener("click", handleClickSound, true);

    return () => {
      document.removeEventListener("click", handleClickSound, true);
      clickAudioRef.current = null;
    };
  }, []);

  return null;
}
