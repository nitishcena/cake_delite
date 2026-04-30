import React from 'react';

interface GaugeProps {
  value: number;
  color?: string;
  showLabels?: boolean;
  min?: string;
  max?: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, color = "#ef4d23", showLabels, min, max }) => {
  const totalTicks = 40;
  const activeTicks = Math.round((value / 100) * totalTicks);

  return (
    <div className="flex flex-col items-center w-full max-w-[260px] mx-auto">
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Arc of ticks */}
        {[...Array(totalTicks)].map((_, i) => {
          // Angle from PI to 2*PI (180 degrees)
          const angle = Math.PI + (i / (totalTicks - 1)) * Math.PI;
          const rInner = 70;
          const rOuter = 80;
          const x1 = 100 + rInner * Math.cos(angle);
          const y1 = 100 + rInner * Math.sin(angle);
          const x2 = 100 + rOuter * Math.cos(angle);
          const y2 = 100 + rOuter * Math.sin(angle);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i < activeTicks ? color : "#d4d4d8"}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}
        <text
          x="100"
          y="105"
          textAnchor="middle"
          className="fill-neutral-900 text-[22px] font-semibold"
          style={{ fontSize: '22px', fontWeight: 600 }}
        >
          {value}%
        </text>
      </svg>
      {showLabels && (
        <div className="flex justify-between w-full px-2 mt-[-5px] text-[11px] text-neutral-500 font-medium">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

export default Gauge;
