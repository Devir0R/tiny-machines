import type { Design } from "../designs/Design";
import { DesignCard } from "./Design";
import { useState } from "react";

interface DesignProps {
  designs: Design[];
  onMachineClick: (designIndex: number, machineIcon: string) => void;
  calculateDesignPotentialScore?: (design: Design) => number;
}

export const DesignsArea = ({ designs, onMachineClick, calculateDesignPotentialScore }: DesignProps) => {
  const [hoveredDesignIndex, setHoveredDesignIndex] = useState<number | null>(null);
  return (
    <div className="design-area col-span-1 p-4 text-center flex flex-col items-center w-full rounded-sm">
      <h2 className="text-xl font-bold mb-1">Designs</h2>
      <h3 className="text-sm font-bold mb-1">you may cash in a design for one of the machines on it</h3>
      <div className="interactable-area w-full max-w-[60vw] h-[40vh] outline-2 outline-dashed outline-gray-400 p-4 rounded-lg overflow-x-auto">
        <div className="h-full grid grid-cols-5 gap-4 items-stretch">
          {designs.map((design, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredDesignIndex(index)}
              onMouseLeave={() => setHoveredDesignIndex(null)}
            >
              <DesignCard
                design={design}
                potentialScore={hoveredDesignIndex === index && calculateDesignPotentialScore ? calculateDesignPotentialScore(design) : undefined}
                onMachineClick={(machineIcon) => onMachineClick(index, machineIcon)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};