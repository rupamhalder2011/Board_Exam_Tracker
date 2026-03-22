"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import CountdownTimer from "@/components/CountdownTimer";
import SubjectCard from "@/components/SubjectCard";

interface SubjectConfig {
  name: string;
  icon: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  initialLevel: number;
}

const SUBJECT_CONFIG: SubjectConfig[] = [
  {
    name: "Mathematics",
    icon: "📐",
    color: "#00d4ff",
    gradientFrom: "#00d4ff",
    gradientTo: "#0088cc",
    initialLevel: 7,
  },
  {
    name: "Science",
    icon: "🔬",
    color: "#b347ea",
    gradientFrom: "#b347ea",
    gradientTo: "#8a2bd4",
    initialLevel: 5,
  },
  {
    name: "English",
    icon: "📖",
    color: "#00ffd5",
    gradientFrom: "#00ffd5",
    gradientTo: "#00b89c",
    initialLevel: 8,
  },
  {
    name: "Hindi",
    icon: "📝",
    color: "#ff6b6b",
    gradientFrom: "#ff6b6b",
    gradientTo: "#cc4444",
    initialLevel: 6,
  },
  {
    name: "Social Science",
    icon: "🌍",
    color: "#ffd700",
    gradientFrom: "#ffd700",
    gradientTo: "#ccaa00",
    initialLevel: 4,
  },
  {
    name: "Marathi",
    icon: "✍️",
    color: "#ff8c42",
    gradientFrom: "#ff8c42",
    gradientTo: "#cc6d2e",
    initialLevel: 7,
  },
];

interface SubjectState {
  xp: number;
  level: number;
}

interface GameState {
  [key: string]: SubjectState;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("boardquest_state");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse game state", e);
        }
      }
    }

    // Default state
    const initialState: GameState = {};
    SUBJECT_CONFIG.forEach((s) => {
      initialState[s.name] = { xp: 0, level: s.initialLevel };
    });
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem("boardquest_state", JSON.stringify(gameState));
  }, [gameState]);

  const gainXP = (subjectName: string) => {
    setGameState((prev) => {
      const current = prev[subjectName];
      let newXP = current.xp + 10;
      let newLevel = current.level;

      if (newXP >= 100) {
        newLevel += Math.floor(newXP / 100);
        newXP = newXP % 100;
      }

      return {
        ...prev,
        [subjectName]: {
          xp: newXP,
          level: newLevel,
        },
      };
    });
  };

  const avgProgress = useMemo(() => {
    const totalXP = Object.keys(gameState).reduce((sum, key) => sum + gameState[key].xp, 0);
    return Math.round(totalXP / SUBJECT_CONFIG.length);
  }, [gameState]);

  const rank = useMemo(() => {
    if (avgProgress >= 90) return "S";
    if (avgProgress >= 80) return "A+";
    if (avgProgress >= 70) return "A";
    if (avgProgress >= 60) return "B+";
    if (avgProgress >= 50) return "B";
    if (avgProgress >= 40) return "C";
    return "D";
  }, [avgProgress]);

  return (
    <div className="relative z-10 flex flex-col min-h-screen bg-[#0a0b0d]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        {/* ── Hero / Countdown ── */}
        <div className="mb-12 md:mb-16">
          <CountdownTimer />
        </div>

        {/* ── Overall Progress ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-neon-purple text-lg">⚡</span>
              <h2 className="font-heading text-lg md:text-xl font-bold tracking-wide text-foreground">
                Subject Progress
              </h2>
            </div>
            <p className="text-muted text-sm tracking-wide">
              Track your mastery across all subjects
            </p>
          </div>

          {/* Overall badge */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neon-blue/20 bg-card-bg">
              <span className="text-muted text-xs uppercase tracking-widest font-heading">
                Overall
              </span>
              <span className="font-heading text-xl font-bold text-neon-blue glow-text-blue">
                {avgProgress}%
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neon-purple/20 bg-card-bg">
              <span className="text-muted text-xs uppercase tracking-widest font-heading">
                Rank
              </span>
              <span className="font-heading text-xl font-bold text-neon-purple glow-text-purple">
                {rank}
              </span>
            </div>
          </div>
        </div>

        {/* ── Subject Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBJECT_CONFIG.map((subject) => {
            const state = gameState[subject.name] || { xp: 0, level: subject.initialLevel };
            return (
              <SubjectCard
                key={subject.name}
                name={subject.name}
                icon={subject.icon}
                color={subject.color}
                gradientFrom={subject.gradientFrom}
                gradientTo={subject.gradientTo}
                xp={state.xp}
                level={state.level}
                onGainXP={() => gainXP(subject.name)}
              />
            );
          })}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-card-border bg-card-bg/40 backdrop-blur-sm mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="font-heading text-sm md:text-base text-neon-blue/80 tracking-wider glow-text-blue italic">
            &quot;Right Here and Now, I&apos;ll Push Past My Limits&quot;
          </p>
          <p className="text-muted text-xs mt-2 tracking-widest uppercase">
            BoardQuest · Class X · 2027
          </p>
        </div>
      </footer>
    </div>
  );
}
