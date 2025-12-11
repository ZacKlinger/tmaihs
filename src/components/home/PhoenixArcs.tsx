export function PhoenixArcs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large background arc */}
      <svg
        className="absolute -right-20 -top-20 h-[600px] w-[600px] opacity-[0.04]"
        viewBox="0 0 200 100"
        fill="none"
      >
        <path
          d="M20 100 Q100 0 180 100"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />
        <path
          d="M40 100 Q100 20 160 100"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
        />
      </svg>

      {/* Wing sweep left */}
      <svg
        className="absolute -left-10 top-1/4 h-[400px] w-[400px] opacity-[0.03] rotate-[-20deg]"
        viewBox="0 0 100 50"
        fill="none"
      >
        <path
          d="M0 50 Q25 10 50 25 Q75 0 100 25"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
        />
      </svg>

      {/* Ember particles */}
      <div className="absolute right-1/4 top-20 h-3 w-3 rounded-full bg-accent/30 animate-pulse-soft" />
      <div className="absolute right-1/3 top-32 h-2 w-2 rounded-full bg-accent/20 animate-pulse-soft" style={{ animationDelay: "1s" }} />
      <div className="absolute left-1/4 top-40 h-2 w-2 rounded-full bg-primary/20 animate-pulse-soft" style={{ animationDelay: "2s" }} />

      {/* Feather-inspired lines */}
      <div className="absolute bottom-20 left-10 opacity-[0.05]">
        <div className="h-20 w-1 rotate-[30deg] rounded-full bg-gradient-to-t from-transparent via-primary to-transparent" />
        <div className="ml-2 h-16 w-0.5 rotate-[25deg] rounded-full bg-gradient-to-t from-transparent via-primary to-transparent" />
        <div className="ml-3 h-12 w-0.5 rotate-[20deg] rounded-full bg-gradient-to-t from-transparent via-primary to-transparent" />
      </div>
    </div>
  );
}
