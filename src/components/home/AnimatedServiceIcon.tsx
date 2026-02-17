"use client";

interface AnimatedServiceIconProps {
  type: string;
  index: number;
}

export default function AnimatedServiceIcon({ type, index }: AnimatedServiceIconProps) {
  const delay = `${index * 0.2}s`;

  const iconMap: Record<string, JSX.Element> = {
    pipe: (
      <svg viewBox="0 0 60 60" className="w-full h-full" fill="none">
        {/* Pipe structure */}
        <rect x="10" y="22" width="15" height="8" rx="1" className="fill-primary" />
        <rect x="25" y="15" width="10" height="22" rx="1" className="fill-primary" />
        <rect x="35" y="22" width="15" height="8" rx="1" className="fill-primary" />

        {/* Water flow animation */}
        <g className="animate-wave" style={{ animationDelay: delay }}>
          <circle cx="18" cy="26" r="2" className="fill-white/80" />
          <circle cx="30" cy="26" r="2" className="fill-white/80" />
          <circle cx="42" cy="26" r="2" className="fill-white/80" />
        </g>

        {/* Connection joints */}
        <rect x="23" y="20" width="4" height="12" rx="1" className="fill-secondary" />
        <rect x="33" y="20" width="4" height="12" rx="1" className="fill-secondary" />

        {/* Bottom pipe */}
        <rect x="27" y="37" width="6" height="15" rx="1" className="fill-primary" />

        {/* Drip animation */}
        <circle
          cx="30"
          cy="55"
          r="3"
          className="fill-accent animate-bounce-gentle"
          style={{ animationDelay: delay }}
        />
      </svg>
    ),
    canal: (
      <svg viewBox="0 0 60 60" className="w-full h-full" fill="none">
        {/* Canal cross-section */}
        <path
          d="M5 30 C5 45, 55 45, 55 30 L55 50 C55 55, 5 55, 5 50 Z"
          className="fill-primary/30"
        />
        <path
          d="M5 30 C5 45, 55 45, 55 30"
          stroke="currentColor"
          strokeWidth="3"
          className="stroke-primary"
          fill="none"
        />

        {/* Water surface */}
        <path
          d="M10 35 Q17 32, 25 35 T40 35 T55 35"
          stroke="currentColor"
          strokeWidth="2"
          className="stroke-accent animate-wave"
          style={{ animationDelay: delay }}
          fill="none"
        />

        {/* Inspection camera */}
        <g className="animate-float" style={{ animationDelay: delay }}>
          <rect x="25" y="10" width="10" height="8" rx="2" className="fill-secondary" />
          <circle cx="30" cy="14" r="3" className="fill-white" />
          <circle cx="30" cy="14" r="1.5" className="fill-accent" />
          <line x1="30" y1="18" x2="30" y2="30" stroke="currentColor" strokeWidth="2" className="stroke-gray-400" />
        </g>

        {/* Canal walls */}
        <rect x="2" y="28" width="5" height="25" rx="1" className="fill-gray-600 dark:fill-gray-500" />
        <rect x="53" y="28" width="5" height="25" rx="1" className="fill-gray-600 dark:fill-gray-500" />
      </svg>
    ),
    emergency: (
      <svg viewBox="0 0 60 60" className="w-full h-full" fill="none">
        {/* Emergency siren base */}
        <ellipse cx="30" cy="45" rx="20" ry="8" className="fill-secondary" />

        {/* Siren light */}
        <path
          d="M20 45 L20 25 Q20 15, 30 15 Q40 15, 40 25 L40 45"
          className="fill-primary"
        />

        {/* Rotating light effect */}
        <g className="animate-rotate-slow origin-center" style={{ transformOrigin: "30px 30px" }}>
          <path
            d="M30 20 L25 5 L35 5 Z"
            className="fill-accent"
          />
          <path
            d="M30 20 L45 15 L40 25 Z"
            className="fill-red-500"
          />
        </g>

        {/* Pulse rings */}
        <circle
          cx="30"
          cy="30"
          r="25"
          className="stroke-primary stroke-2 fill-none animate-ping"
          style={{ animationDuration: "2s", animationDelay: delay }}
        />
        <circle
          cx="30"
          cy="30"
          r="20"
          className="stroke-accent stroke-2 fill-none animate-ping"
          style={{ animationDuration: "2s", animationDelay: `calc(${delay} + 0.5s)` }}
        />

        {/* 24/7 text */}
        <text
          x="30"
          y="38"
          textAnchor="middle"
          className="fill-white font-bold text-[8px]"
        >
          24/7
        </text>
      </svg>
    ),
  };

  return (
    <div className="w-16 h-16 relative">
      <div className="absolute inset-0 bg-primary/10 rounded-xl" />
      <div className="relative p-2">
        {iconMap[type] || iconMap.pipe}
      </div>
    </div>
  );
}
