"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Send, Github, Linkedin, ArrowUpRight } from "lucide-react";

export default function ReplyContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // Staggered reveal of elements
    gsap.from(".reply-element", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.2,
    });

    // Animate the clock countdown
    const digits = { val: 10 };
    gsap.to(digits, {
      val: 0,
      duration: 3,
      delay: 1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (clockRef.current) {
          clockRef.current.textContent = `${Math.round(digits.val)}:00`;
        }
      },
      onComplete: () => {
        if (clockRef.current) {
          clockRef.current.textContent = "NOW";
        }
      },
    });

    // Pulse the timer after completion
    gsap.to(".timer-pulse", {
      scale: 1.02,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 4.5,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full flex-1 flex flex-col pt-32 md:pt-40">

      {/* Hero Section */}
      <div className="w-full border-b border-gray-300 px-6 md:px-12 lg:px-20 pb-12 md:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="flex-1">
            <p className="reply-element font-mono text-[10px] md:text-sm uppercase tracking-widest opacity-60 mb-4">
              Contact
            </p>
            <h1 className="reply-element text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none">
              REPLY YOU IN
            </h1>
            <div className="reply-element timer-pulse flex items-baseline gap-4 mt-2">
              <span
                ref={clockRef}
                className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-accent-orange leading-none"
              >
                10:00
              </span>
              <span className="font-mono text-sm md:text-lg uppercase tracking-widest opacity-50">
                min
              </span>
            </div>
          </div>

          {/* Quick status */}
          <div className="reply-element lg:pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-xs md:text-sm uppercase tracking-wider">
                Available for work
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="w-full flex flex-col lg:flex-row flex-1">

        {/* Left - Primary Contact */}
        <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-300 p-6 md:p-12 lg:p-16 flex flex-col justify-between">
          <div>
            <p className="reply-element font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-50 mb-8">
              Reach out directly
            </p>

            <a
              href="mailto:eswaraditya.y@gmail.com"
              className="reply-element group flex items-center gap-4 py-6 border-b border-gray-300 hover:border-accent-orange transition-colors"
            >
              <Mail size={20} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="text-lg md:text-2xl font-medium tracking-tight group-hover:text-accent-orange transition-colors">
                eswaraditya.y@gmail.com
              </span>
              <ArrowUpRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="https://t.me/eswaraditya"
              target="_blank"
              rel="noopener noreferrer"
              className="reply-element group flex items-center gap-4 py-6 border-b border-gray-300 hover:border-accent-orange transition-colors"
            >
              <Send size={20} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="text-lg md:text-2xl font-medium tracking-tight group-hover:text-accent-orange transition-colors">
                Telegram @eswaraditya
              </span>
              <ArrowUpRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <p className="reply-element font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-40 mt-12">
            I check messages obsessively. You&apos;ll hear back fast.
          </p>
        </div>

        {/* Right - Socials & Info */}
        <div className="lg:w-[420px] flex flex-col">

          {/* Socials */}
          <div className="flex-1 p-6 md:p-12 border-b border-gray-300">
            <p className="reply-element font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-50 mb-8">
              Find me elsewhere
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="https://github.com/eswaraditya"
                target="_blank"
                rel="noopener noreferrer"
                className="reply-element group flex items-center gap-4 p-4 border border-gray-300 hover:border-black hover:bg-white transition-all"
              >
                <Github size={22} />
                <div className="flex flex-col">
                  <span className="font-medium text-sm md:text-base">GitHub</span>
                  <span className="font-mono text-[10px] opacity-50">@eswaraditya</span>
                </div>
                <ArrowUpRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="https://linkedin.com/in/eswaraditya"
                target="_blank"
                rel="noopener noreferrer"
                className="reply-element group flex items-center gap-4 p-4 border border-gray-300 hover:border-black hover:bg-white transition-all"
              >
                <Linkedin size={22} />
                <div className="flex flex-col">
                  <span className="font-medium text-sm md:text-base">LinkedIn</span>
                  <span className="font-mono text-[10px] opacity-50">Eswar Aditya</span>
                </div>
                <ArrowUpRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Bottom note */}
          <div className="p-6 md:p-12 flex flex-col gap-4">
            <p className="reply-element font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-50">
              Based in
            </p>
            <p className="reply-element text-xl md:text-2xl font-bold tracking-tight">
              Hyderabad, India
            </p>
            <p className="reply-element font-mono text-[10px] md:text-xs opacity-40 uppercase tracking-wider">
              IST (UTC+5:30)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
