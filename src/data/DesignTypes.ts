import { DESIGN } from "../interfaces/Designs";

interface Design {
    name: string;
    description: string;
    icon: string;
    rarity: "common" | "epic" | "rare" | "legendary";
}


export const DesignTypes : { [key in DESIGN]: Design }  = {
    [DESIGN.FIGHTER]: {
        name: "Basic Design",
        description: "A simple design that provides a small score boost.",
        icon: "🔧",
        rarity: "common",
    },
    [DESIGN.DAVE]: {
        name: "Advanced Design",
        description: "A more complex design that provides a significant score boost.",
        icon: "⚙️",
        rarity: "epic",
    },
    [DESIGN.MERKAVA]: {
        name: "Elite Design",
        description: "A highly sophisticated design that provides a massive score boost.",
        icon: "🚀",
        rarity: "rare", 
    },
    [DESIGN.SUPER_TANK_PLUS]: {
        name: "Legendary Design",
        description: "An incredibly rare design that provides an enormous score boost.",
        icon: "👑",
        rarity: "legendary", 
    },
    [DESIGN.YASUR]: {
        name: "Mythic Design",
        description: "A mythical design that provides an unparalleled score boost.",
        icon: "🌟",
        rarity: "common", 
    },

}