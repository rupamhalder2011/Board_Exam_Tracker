"use client";

import React from "react";

export interface SubjectCardProps {
  name: string;
  icon: string;
  xp: number;           // 0–99
  level: number;
  color: string;           // Tailwind-compatible HEX
  gradientFrom: string;
  gradientTo: string;
  onGainXP: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  name,
  icon,
  xp,
  level,
  color,
  gradientFrom,
  gradientTo,
  onGainXP,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, xp));

  return (
    <div
      onClick={onGainXP}
      className="
        group relative p-5 rounded-2xl
        border border-card-border
        bg-card-bg backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:border-card-hover-border
        hover:translate-y-[-4px]
        cursor-pointer
        active:scale-[0.98]
      "
      style={{
        boxShadow: `0 0 30px ${color}15`
      }}
    >
      {/* Top Row: Icon + Name + Level */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Icon container */}
          <div
            className="
              w-10 h-10 rounded-lg flex items-center justify-center
              text-xl border border-white/5
              transition-transform duration-300 group-hover:scale-110
            "
            style={{ backgroundColor: `${color}15` }}
          >
            {icon}
          </div>

          {/* Name */}
          <h3 className="font-heading text-sm md:text-base font-semibold tracking-wide text-foreground">
            {name}
          </h3>
        </div>

        {/* Level badge */}
        <div
          className="
            px-2.5 py-0.5 rounded-full text-[10px] font-heading uppercase tracking-widest
            border
          "
          style={{
            borderColor: `${color}40`,
            color: color,
            backgroundColor: `${color}10`,
          }}
        >
          Lv. {level}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 rounded-full bg-surface overflow-hidden border border-white/5">
        {/* Filled portion */}
        <div
          className="
            absolute inset-y-0 left-0 rounded-full
            progress-bar-animated
            transition-all duration-700 ease-out
          "
          style={{
            width: `${clampedProgress}%`,
            backgroundImage: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo}, ${gradientFrom})`,
          }}
        />

        {/* Shine overlay */}
        <div
          className="absolute inset-y-0 left-0 rounded-full opacity-30"
          style={{
            width: `${clampedProgress}%`,
            background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Bottom: Percentage + XP */}
      <div className="flex items-center justify-between mt-2.5">
        <span
          className="font-heading text-lg font-bold"
          style={{ color }}
        >
          {clampedProgress}%
        </span>
        <span className="text-muted text-xs tracking-wider">
          {xp} / 100 XP
        </span>
      </div>

      {/* Hover corner glow */}
      <div
        className="
          absolute -top-px -right-px w-16 h-16 rounded-tr-2xl
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          pointer-events-none
        "
        style={{
          background: `radial-gradient(circle at top right, ${color}20, transparent 70%)`,
        }}
      />
      <div
        className="
          absolute -bottom-px -left-px w-16 h-16 rounded-bl-2xl
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          pointer-events-none
        "
        style={{
          background: `radial-gradient(circle at bottom left, ${color}20, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default SubjectCard;
