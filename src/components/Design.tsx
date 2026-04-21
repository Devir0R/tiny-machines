
import type { Design } from "../designs/Design";
import { useSound } from 'react-sounds';
import designTouch from '../assets/designTouch.mp3';
import machineTouch from '../assets/touchMachine.mp3';

interface DesignProps {
  design: Design;
  onClick?: () => void;
  onMachineClick?: (machineIcon: string) => void;
}

export function DesignCard({ 
  design, 
  onClick,
  onMachineClick 
}: DesignProps) {

  const {play : playTouchDesign} = useSound(designTouch);
  const {play : playMachineDesign} = useSound(machineTouch);
  
  const rarityColors = {
    common: "from-gray-600 to-gray-700 border-gray-500",
    legendary: "from-yellow-600 to-yellow-700 border-yellow-400"
  };

  const rarityGlow = {
    common: "shadow-gray-500/20",
    legendary: "shadow-yellow-500/60"
  };

  return (
    <div 
      className={`relative overflow-hidden bg-linear-to-br ${rarityColors[design.rarity]} border-2 rounded-lg p-2 
        transition-shadow duration-300 hover:shadow-2xl ${rarityGlow[design.rarity]} 
        ${onClick ? 'cursor-pointer group' : 'group'}`}
      onClick={onClick}
      onMouseEnter={()=>playTouchDesign()}
    >
      <div className="transition-transform duration-300 group-hover:scale-105">

      {/* Icon */}
      <div className="flex justify-center mb-2">
        <div className="text-sm bg-black/30 rounded-full p-2 group-hover:scale-110 transition-transform">
          {design.icon}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-sm text-center text-white mb-1 uppercase tracking-wide">{design.name}</h3>

      {/* Description */}
      <p className="text-gray-300 text-[0.800rem] text-center mb-2 min-h-12 leading-tight">{design.description}</p>

      {/* Machine Buttons */}
      <div className="flex justify-center space-x-2">
        {onMachineClick && design.machines.map((machineIcon) => (
          <button
            key={machineIcon}
            className="bg-black/50 hover:bg-black/70 text-white rounded px-2 py-1 text-sm transition-colors"
            onClick={() => onMachineClick(machineIcon)}
            onMouseEnter={()=>playMachineDesign()}
          >
            {machineIcon}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}
