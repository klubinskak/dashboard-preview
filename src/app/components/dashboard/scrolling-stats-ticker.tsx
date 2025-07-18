import React from "react";

interface AttackData {
  country: string;
  day: number;
  hour: number;
}

interface TickerProps {
  attackData: AttackData[];
  totalHourlyAttacks: number;
}

const ScrollingStatsTicker: React.FC<TickerProps> = ({
  attackData,
  totalHourlyAttacks,
}) => {
  const topAttacker =
    attackData.length > 0
      ? attackData.reduce((max, country) =>
          country.day > max.day ? country : max
        )
      : null;

  const avgHourlyAttacks =
    attackData.length > 0
      ? Math.round(totalHourlyAttacks / attackData.length)
      : 0;

  const stats = [
    `Total Countries: ${attackData.length}`,
    `Active Threats: ${totalHourlyAttacks.toLocaleString()}`,
    `Top Attacker: ${topAttacker?.country || "N/A"}`,
    `Average Hourly Attacks: ${avgHourlyAttacks.toLocaleString()}`,
    `Real-time Rate: ${Math.round(totalHourlyAttacks / 60)}/min`,
    `Daily Threats: ${attackData
      .reduce((sum, country) => sum + country.day, 0)
      .toLocaleString()}`,
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 z-10"></div>

      {/* Scrolling container */}
      <div className="py-3">
        <div className="flex animate-scroll whitespace-nowrap">
          {/* First set of stats */}
          {stats.map((stat, index) => (
            <div key={`first-${index}`} className="flex items-center text-sm">
              <span className="text-black dark:text-gray-400 px-6 capitalize">
                {stat}
              </span>
              <div className="w-2 h-2 bg-red-500 rounded-full mx-4 animate-pulse"></div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {stats.map((stat, index) => (
            <div key={`second-${index}`} className="flex items-center text-sm">
              <span className="text-black dark:text-gray-400 px-6 capitalize">
                {stat}
              </span>
              <div className="w-2 h-2 bg-red-500 rounded-full mx-4 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ScrollingStatsTicker;
