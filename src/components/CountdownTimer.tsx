"use client";

import { useEffect, useState } from "react";

const BOARD_EXAM_DATE = new Date("2027-03-02T09:00:00+05:30");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const diff = BOARD_EXAM_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(calculateTimeLeft());
    const id = setInterval(() => setTime(calculateTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const blocks: { label: string; value: number }[] = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  const isUrgent = mounted && time.days < 30;

  return (
    <section className="relative text-center py-12 px-4">
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-neon-blue text-2xl">⚔️</span>
        <h2
          className="font-heading text-sm md:text-base uppercase tracking-[0.3em] text-muted"
        >
          Countdown to Boards
        </h2>
        <span className="text-neon-purple text-2xl">🛡️</span>
      </div>

      <p className="text-muted text-xs mb-8 tracking-widest uppercase">
        March 2, 2027 · Final Boss Raid
      </p>

      {/* Timer Blocks */}
      <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
        {blocks.map((block) => (
          <div
            key={block.label}
            className={`
              relative flex flex-col items-center justify-center
              w-20 h-24 md:w-28 md:h-32
              rounded-xl border
              ${isUrgent ? "border-red-500/40" : "border-neon-blue/20"}
              bg-card-bg backdrop-blur-sm
              transition-all duration-300
              hover:scale-105 hover:border-neon-purple/50
              ${isUrgent ? "glow-purple" : "glow-blue"}
            `}
          >
            {/* Value */}
            <span
              className={`
                font-heading text-3xl md:text-5xl font-bold
                ${isUrgent ? "text-red-400" : "text-neon-blue"}
                ${!mounted ? "opacity-0" : "opacity-100"}
                transition-opacity duration-500
              `}
            >
              {mounted ? String(block.value).padStart(2, "0") : "00"}
            </span>

            {/* Label */}
            <span className="text-muted text-[10px] md:text-xs uppercase tracking-widest mt-1">
              {block.label}
            </span>

            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neon-blue/30 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neon-purple/30 rounded-br-xl" />
          </div>
        ))}
      </div>

      {/* Urgency badge */}
      {isUrgent && mounted && (
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-heading uppercase tracking-widest animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          Critical Phase — Less than 30 Days
        </div>
      )}
    </section>
  );
}
