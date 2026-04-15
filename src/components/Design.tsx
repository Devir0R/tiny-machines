
interface DesignProps {
  name: string;
  description: string;
  icon: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
  onPurchase?: () => void;
}

export function DesignCard({ 
  name, 
  description, 
  icon, 
  rarity = "common",
  onPurchase 
}: DesignProps) {
  const rarityColors = {
    common: "from-gray-600 to-gray-700 border-gray-500",
    rare: "from-blue-600 to-blue-700 border-blue-400",
    epic: "from-purple-600 to-purple-700 border-purple-400",
    legendary: "from-yellow-600 to-yellow-700 border-yellow-400"
  };

  const rarityGlow = {
    common: "shadow-gray-500/20",
    rare: "shadow-blue-500/40",
    epic: "shadow-purple-500/40",
    legendary: "shadow-yellow-500/60"
  };

  return (
    <div 
      className={`relative bg-linear-to-br ${rarityColors[rarity]} border-2 rounded-lg p-2 
        transition-all duration-300 hover:scale-105 hover:shadow-2xl ${rarityGlow[rarity]} 
        cursor-pointer group`}
      onClick={onPurchase}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-amber-400 opacity-60"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-amber-400 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-amber-400 opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-amber-400 opacity-60"></div>

      {/* Icon */}
      <div className="flex justify-center mb-1">
        <div className="text-2xl bg-black/30 rounded-full p-1 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg text-center text-white mb-1 uppercase tracking-wide">{name}</h3>

      {/* Description */}
      <p className="text-gray-300 text-[0.7rem] text-center mb-1 min-h-8">{description}</p>
    </div>
  );
}
