export default function Header() {
  return (
    <header className="relative z-10 border-b border-card-border bg-card-bg/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center text-lg">
            🎮
          </div>
          <div>
            <h1 className="font-heading text-base md:text-lg font-bold tracking-wider text-foreground">
              Board<span className="text-neon-blue">Quest</span>
            </h1>
            <p className="text-muted text-[10px] uppercase tracking-[0.2em] -mt-0.5">
              10th Grade · RPG Tracker
            </p>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-xs font-heading uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" />
            Active Quest
          </div>
          <div className="px-3 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-xs font-heading uppercase tracking-widest">
            Class X
          </div>
        </div>
      </div>
    </header>
  );
}
