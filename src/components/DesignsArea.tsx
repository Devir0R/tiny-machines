import type { Design } from "../designs/Design";
import { DesignCard } from "./Design";

interface DesignProps {
  designs: Design[];
}

export const DesignsArea = ({ designs }: DesignProps) => {
  return (
    <div className="design-area col-span-1 p-4 text-center flex flex-col items-center w-full rounded-sm">
      <h2 className="text-xl font-bold mb-1">Designs</h2>
      <div className="interactable-area w-full max-w-4xl h-64 outline-2 outline-dashed outline-gray-400 p-4 rounded-lg overflow-x-auto">
        <div className="h-full grid grid-cols-5 gap-4 items-stretch">
          {designs.map((design, index) => (
            <DesignCard
              key={index}
              name={design.name}
              description={design.description}
              icon={design.icon}
              rarity={design.rarity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};