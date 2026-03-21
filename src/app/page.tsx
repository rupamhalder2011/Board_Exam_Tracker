import Header from "@/components/Header";
import CountdownTimer from "@/components/CountdownTimer";
import SubjectCard from "@/components/SubjectCard";

const subjects = [
  {
    name: "Mathematics",
    icon: "📐",
    progress: 62,
    color: "#00d4ff",
    gradientFrom: "#00d4ff",
    gradientTo: "#0088cc",
    level: 7,
  },
  {
    name: "Science",
    icon: "🔬",
    progress: 45,
    color: "#b347ea",
    gradientFrom: "#b347ea",
    gradientTo: "#8a2bd4",
    level: 5,
  },
  {
    name: "English",
    icon: "📖",
    progress: 78,
    color: "#00ffd5",
    gradientFrom: "#00ffd5",
    gradientTo: "#00b89c",
    level: 8,
  },
  {
    name: "Hindi",
    icon: "📝",
    progress: 55,
    color: "#ff6b6b",
    gradientFrom: "#ff6b6b",
    gradientTo: "#cc4444",
    level: 6,
  },
  {
    name: "Social Science",
    icon: "🌍",
    progress: 38,
    color: "#ffd700",
    gradientFrom: "#ffd700",
    gradientTo: "#ccaa00",
    level: 4,
  },
  {
    name: "Marathi",
    icon: "✍️",
    progress: 70,
    color: "#ff8c42",
    gradientFrom: "#ff8c42",
    gradientTo: "#cc6d2e",
    level: 7,
  },
];

export default function Home() {
  /* Overall stats */
  const avgProgress = Math.round(
    subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length
  );

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
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
                B+
              </span>
            </div>
          </div>
        </div>

        {/* ── Subject Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((subject) => (
            <SubjectCard key={subject.name} {...subject} />
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-card-border bg-card-bg/40 backdrop-blur-sm mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="font-heading text-sm md:text-base text-neon-blue/80 tracking-wider glow-text-blue italic">
            &quot;Right Here and Now, I&apos;ll Push Pass My Limits&quot;
          </p>
          <p className="text-muted text-xs mt-2 tracking-widest uppercase">
            BoardQuest · Class X · 2027
          </p>
        </div>
      </footer>
    </div>
  );
}
