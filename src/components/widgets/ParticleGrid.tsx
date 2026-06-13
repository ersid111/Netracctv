"use client";

export function ParticleGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(11,95,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11,95,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Floating dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand-blue/60"
          style={{
            left: `${(i * 37 + 10) % 100}%`,
            top: `${(i * 47 + 15) % 100}%`,
            animation: `float ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            opacity: 0.3 + (i % 5) * 0.1,
          }}
        />
      ))}

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-blue/5 blur-3xl animate-pulse-slow [animation-delay:2s]" />
    </div>
  );
}
