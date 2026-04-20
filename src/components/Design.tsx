
interface DesignProps {
  name: string;
  description: string;
  icon: string;
  rarity?: "common" | "legendary";
  onClick?: () => void;
}

export function DesignCard({ 
  name, 
  description, 
  icon, 
  rarity = "common",
  onClick 
}: DesignProps) {
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
      className={`relative overflow-hidden bg-linear-to-br ${rarityColors[rarity]} border-2 rounded-lg p-2 
        transition-shadow duration-300 hover:shadow-2xl ${rarityGlow[rarity]} 
        cursor-pointer group`}
      onClick={onClick}
    >
      <div className="transition-transform duration-300 group-hover:scale-105">

      {/* Icon */}
      <div className="flex justify-center mb-2">
        <div className="text-sm bg-black/30 rounded-full p-2 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg text-center text-white mb-2 uppercase tracking-wide min-h-8">{name}</h3>

      {/* Description */}
      <p className="text-gray-300 text-[0.800rem] text-center mb-1 min-h-12 leading-tight">{description}</p>
    </div>
    </div>
  );
}
