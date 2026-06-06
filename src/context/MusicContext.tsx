"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface MusicContextType {
  isPlaying: boolean;
  currentTrackIndex: number;
  playlist: string[];
  trackName: string;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const playlist = [
  "/music/ES_PRESSURE! - Nyck Caution-1.mp3",
  "/music/ES_Godspeed - Zorro-2.mp3",
  "/music/ES_Not Gonna Wake Up - Mindme-3.mp3",
  "/music/ES_Let Me Go - Snake City-4.mp3",
  "/music/ES_Pretty - Flux Vortex-5.mp3",
  "/music/ES_Kill These Butterflies - Cospe-6.mp3",
];

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[currentTrackIndex]);
      
      const handleEnded = () => {
        playNext();
      };
      
      audioRef.current.addEventListener("ended", handleEnded);

      // Try autoplay on first mount
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Blocked by browser
        });
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleEnded);
        }
      };
    }
  }, []);

  // Sync track index
  useEffect(() => {
    if (!isMounted.current) {
        isMounted.current = true;
        return;
    }

    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrackIndex];
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const trackName = playlist[currentTrackIndex].split('/').pop()?.replace('.mp3', '').split(' - ')[0].replace('ES_', '') || "Track";

  return (
    <MusicContext.Provider value={{ isPlaying, currentTrackIndex, playlist, trackName, togglePlay, playNext, playPrev }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
