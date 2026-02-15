import { useState } from "react";
import { cn } from "@/lib/utils";

interface RippleRing {
  label: string;
  radius: number;
  color: string;
  dataPoints: {
    label: string;
    value: string;
    angle: number;
  }[];
}

const RINGS: RippleRing[] = [
  {
    label: "TMAHS",
    radius: 0,
    color: "hsl(var(--primary))",
    dataPoints: [],
  },
  {
    label: "Our School",
    radius: 100,
    color: "hsl(var(--primary))",
    dataPoints: [
      { label: "Students", value: "477", angle: 45 },
      { label: "Teachers", value: "33", angle: 135 },
      { label: "Languages", value: "10+", angle: 225 },
      { label: "College Prep", value: "100%", angle: 315 },
    ],
  },
  {
    label: "SFUSD Community",
    radius: 190,
    color: "hsl(var(--accent))",
    dataPoints: [
      { label: "Students Districtwide", value: "49K+", angle: 30 },
      { label: "Schools", value: "113", angle: 90 },
      { label: "Languages Spoken", value: "60+", angle: 150 },
      { label: "Graduation Rate", value: "~89%", angle: 210 },
      { label: "Educators", value: "4,400+", angle: 270 },
      { label: "Annual Investment", value: "$1.5B", angle: 330 },
    ],
  },
  {
    label: "San Francisco & Beyond",
    radius: 280,
    color: "hsl(var(--primary)/0.6)",
    dataPoints: [
      { label: "Tech & Innovation", value: "SF Bay Area", angle: 0 },
      { label: "Healthcare", value: "UCSF & Beyond", angle: 60 },
      { label: "Public Service", value: "City & State", angle: 120 },
      { label: "Arts & Culture", value: "Global Stage", angle: 180 },
      { label: "Education", value: "Next Generation", angle: 240 },
      { label: "Entrepreneurship", value: "Community-Led", angle: 300 },
    ],
  },
];

export function CommunityRippleViz() {
  const [activeRing, setActiveRing] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const svgSize = 640;
  const center = svgSize / 2;

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
          Your Community's Reach
        </h3>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Every educator at TMAHS is part of a network that extends from
          our classrooms to communities around the world. Real data from SFUSD.
        </p>
      </div>

      {/* SVG Visualization */}
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="w-full max-w-[560px] h-auto"
          role="img"
          aria-label="Community ripple visualization showing TMAHS impact radiating from school to district to city to world"
        >
          <defs>
            {/* Ripple animation pulse */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>

            {/* Ring pulse animations */}
            {[1, 2, 3].map((i) => (
              <circle key={`anim-def-${i}`} id={`ring-pulse-${i}`}>
                <animate
                  attributeName="r"
                  values={`${RINGS[i].radius - 2};${RINGS[i].radius + 3};${RINGS[i].radius - 2}`}
                  dur={`${3 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.15;0.3;0.15"
                  dur={`${3 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </defs>

          {/* Animated ripple rings (background) */}
          {[1, 2, 3].map((i) => (
            <circle
              key={`ripple-bg-${i}`}
              cx={center}
              cy={center}
              r={RINGS[i].radius}
              fill="none"
              stroke={RINGS[i].color}
              strokeWidth="1"
              opacity="0.12"
              strokeDasharray="4 6"
            >
              <animate
                attributeName="opacity"
                values="0.08;0.18;0.08"
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Connection lines from center to first ring points */}
          {RINGS[1].dataPoints.map((point, idx) => {
            const rad = (point.angle * Math.PI) / 180;
            const x = center + RINGS[1].radius * Math.cos(rad);
            const y = center + RINGS[1].radius * Math.sin(rad);
            return (
              <line
                key={`conn-1-${idx}`}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                opacity="0.15"
                strokeDasharray="3 5"
              />
            );
          })}

          {/* Connection lines between rings */}
          {[1, 2].map((ringIdx) =>
            RINGS[ringIdx].dataPoints.map((point, ptIdx) => {
              const nextRing = RINGS[ringIdx + 1];
              // Connect to nearest point in next ring
              const nearestPoint = nextRing.dataPoints.reduce((best, np) =>
                Math.abs(np.angle - point.angle) < Math.abs(best.angle - point.angle) ? np : best
              );
              const rad1 = (point.angle * Math.PI) / 180;
              const rad2 = (nearestPoint.angle * Math.PI) / 180;
              const x1 = center + RINGS[ringIdx].radius * Math.cos(rad1);
              const y1 = center + RINGS[ringIdx].radius * Math.sin(rad1);
              const x2 = center + nextRing.radius * Math.cos(rad2);
              const y2 = center + nextRing.radius * Math.sin(rad2);
              return (
                <line
                  key={`conn-${ringIdx}-${ptIdx}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={RINGS[ringIdx].color}
                  strokeWidth="0.75"
                  opacity="0.1"
                  strokeDasharray="2 4"
                />
              );
            })
          )}

          {/* Ring circles (interactive) */}
          {[1, 2, 3].map((i) => (
            <circle
              key={`ring-${i}`}
              cx={center}
              cy={center}
              r={RINGS[i].radius}
              fill="none"
              stroke={RINGS[i].color}
              strokeWidth={activeRing === i ? "2.5" : "1.5"}
              opacity={activeRing === i ? 0.5 : 0.25}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setActiveRing(i)}
              onMouseLeave={() => setActiveRing(null)}
            />
          ))}

          {/* Center node */}
          <circle
            cx={center}
            cy={center}
            r="36"
            fill="url(#centerGlow)"
          >
            <animate
              attributeName="r"
              values="34;38;34"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={center}
            cy={center}
            r="28"
            fill="hsl(var(--primary))"
            opacity="0.9"
            className="cursor-pointer"
            onMouseEnter={() => setActiveRing(0)}
            onMouseLeave={() => setActiveRing(null)}
          />
          <text
            x={center}
            y={center - 5}
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="700"
            fontFamily="'Crimson Pro', Georgia, serif"
          >
            TMAHS
          </text>
          <text
            x={center}
            y={center + 8}
            textAnchor="middle"
            fill="white"
            fontSize="6.5"
            opacity="0.85"
          >
            477 Students
          </text>

          {/* Data point nodes */}
          {RINGS.slice(1).map((ring, ringIdx) =>
            ring.dataPoints.map((point, ptIdx) => {
              const rad = (point.angle * Math.PI) / 180;
              const x = center + ring.radius * Math.cos(rad);
              const y = center + ring.radius * Math.sin(rad);
              const isHovered = hoveredPoint === `${ringIdx + 1}-${ptIdx}`;
              const isRingActive = activeRing === ringIdx + 1;

              // Position label based on angle to avoid overlaps
              const labelOffsetX = Math.cos(rad) * 14;
              const labelOffsetY = Math.sin(rad) * 14;
              const textAnchor = point.angle > 90 && point.angle < 270 ? "end" : "start";

              return (
                <g
                  key={`point-${ringIdx + 1}-${ptIdx}`}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredPoint(`${ringIdx + 1}-${ptIdx}`)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Node circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 7 : 5}
                    fill={ring.color}
                    opacity={isHovered || isRingActive ? 0.9 : 0.5}
                    className="transition-all duration-200"
                  />

                  {/* Value text (always visible) */}
                  <text
                    x={x + labelOffsetX}
                    y={y - 3}
                    textAnchor={textAnchor}
                    fill="hsl(var(--foreground))"
                    fontSize="7.5"
                    fontWeight="600"
                    opacity={isHovered || isRingActive ? 1 : 0.7}
                    className="transition-opacity duration-200"
                  >
                    {point.value}
                  </text>

                  {/* Label text */}
                  <text
                    x={x + labelOffsetX}
                    y={y + 7}
                    textAnchor={textAnchor}
                    fill="hsl(var(--muted-foreground))"
                    fontSize="5.5"
                    opacity={isHovered || isRingActive ? 0.9 : 0.5}
                    className="transition-opacity duration-200"
                  >
                    {point.label}
                  </text>
                </g>
              );
            })
          )}

          {/* Ring labels */}
          {RINGS.slice(1).map((ring, idx) => (
            <text
              key={`ring-label-${idx}`}
              x={center}
              y={center - ring.radius + 12}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              fontSize="6"
              fontStyle="italic"
              opacity={activeRing === idx + 1 ? 0.8 : 0.4}
              className="transition-opacity duration-300"
            >
              {ring.label}
            </text>
          ))}
        </svg>
      </div>

      {/* Interactive legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {RINGS.map((ring, idx) => (
          <button
            key={`legend-${idx}`}
            className={cn(
              "rounded-lg border p-3 text-left transition-all duration-200 text-xs",
              activeRing === idx
                ? "border-primary/40 bg-primary/5 shadow-sm"
                : "border-border/50 bg-card hover:border-primary/20"
            )}
            onMouseEnter={() => setActiveRing(idx)}
            onMouseLeave={() => setActiveRing(null)}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: ring.color }}
              />
              <span className="font-medium text-charcoal">
                {idx === 0 ? "TMAHS" : ring.label}
              </span>
            </div>
            <p className="text-muted-foreground leading-snug">
              {idx === 0 && "477 students, 33 teachers, college-prep for all"}
              {idx === 1 && "Our school's direct impact on students and families"}
              {idx === 2 && "Part of a district serving 49K+ students across SF"}
              {idx === 3 && "Where our graduates lead, create, and serve"}
            </p>
          </button>
        ))}
      </div>

      {/* Source attribution */}
      <p className="mt-4 text-center text-xs text-muted-foreground/60">
        Data: SFUSD Facts at a Glance (2024–25), CA Dept. of Education Dashboard (2024), NCES Common Core of Data
      </p>
    </div>
  );
}
