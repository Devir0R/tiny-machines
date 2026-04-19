import { DESIGN } from "../interfaces/Designs";

interface Design {
    name: string;
    description: string;
    icon: string;
    rarity: "common" | "epic" | "rare" | "legendary";
}


export const DesignTypes : { [key in DESIGN]: Design }  = {
    // Pair Designs
    [DESIGN.AMBULANCOPTERYNC]: {
        name: "AmbulancopterSync",
        description: "Ambulance + Helicopter synergy",
        icon: "🚑🚁",
        rarity: "rare",
    },
    [DESIGN.HIGH_SPEED_MEDIC]: {
        name: "HighSpeedMedic",
        description: "Ambulance + Jet synergy",
        icon: "🚑✈️",
        rarity: "epic",
    },
    [DESIGN.EXPLOSIVE_HEALING]: {
        name: "ExplosiveHealing",
        description: "Ambulance + Missile synergy",
        icon: "🚑🚀",
        rarity: "rare",
    },
    [DESIGN.LOTTERY_AMBULANCE]: {
        name: "LotteryAmbulance",
        description: "Ambulance + SlotMachine synergy",
        icon: "🚑🎰",
        rarity: "common",
    },
    [DESIGN.TRAINWRECK_RESCUE]: {
        name: "TrainwreckRescue",
        description: "Ambulance + Train synergy",
        icon: "🚑🚆",
        rarity: "common",
    },
    [DESIGN.SKY_WARRIORS]: {
        name: "SkyWarriors",
        description: "Helicopter + Jet synergy",
        icon: "🚁✈️",
        rarity: "epic",
    },
    [DESIGN.ARMADO_HELICOPTER]: {
        name: "ArmadoHelicopter",
        description: "Helicopter + Missile synergy",
        icon: "🚁🚀",
        rarity: "rare",
    },
    [DESIGN.SPINNING_ROTOR]: {
        name: "SpinningRotor",
        description: "Helicopter + SlotMachine synergy",
        icon: "🚁🎰",
        rarity: "common",
    },
    [DESIGN.SKYLINE_CARAVAN]: {
        name: "SkylineCaravan",
        description: "Helicopter + Train synergy",
        icon: "🚁🚆",
        rarity: "common",
    },
    [DESIGN.JET_MISSILE_BARRAGE]: {
        name: "JetMissileBarrage",
        description: "Jet + Missile synergy",
        icon: "✈️🚀",
        rarity: "epic",
    },
    [DESIGN.LUCKY_ACE]: {
        name: "LuckyAce",
        description: "Jet + SlotMachine synergy",
        icon: "✈️🎰",
        rarity: "common",
    },
    [DESIGN.SONIC_RAIL]: {
        name: "SonicRail",
        description: "Jet + Train synergy",
        icon: "✈️🚆",
        rarity: "common",
    },
    [DESIGN.LOTTERY_STRIKE]: {
        name: "LotteryStrike",
        description: "Missile + SlotMachine synergy",
        icon: "🚀🎰",
        rarity: "common",
    },
    [DESIGN.RUNAWAY_EXPLOSION]: {
        name: "RunawayExplosion",
        description: "Missile + Train synergy",
        icon: "🚀🚆",
        rarity: "common",
    },
    [DESIGN.FORTUNE_TRAIN]: {
        name: "FortuneTrain",
        description: "SlotMachine + Train synergy",
        icon: "🎰🚆",
        rarity: "common",
    },
    // Alien Designs
    [DESIGN.ALIEN_AMBULANCE]: {
        name: "AlienAmbulance",
        description: "UFO + Ambulance synergy",
        icon: "🛸🚑",
        rarity: "legendary",
    },
    [DESIGN.ALIEN_HELICOPTER]: {
        name: "AlienHelicopter",
        description: "UFO + Helicopter synergy",
        icon: "🛸🚁",
        rarity: "legendary",
    },
    [DESIGN.ALIEN_JET]: {
        name: "AlienJet",
        description: "UFO + Jet synergy",
        icon: "🛸✈️",
        rarity: "legendary",
    },
    [DESIGN.ALIEN_MISSILE]: {
        name: "AlienMissile",
        description: "UFO + Missile synergy",
        icon: "🛸🚀",
        rarity: "legendary",
    },
    [DESIGN.ALIEN_SLOT_MACHINE]: {
        name: "AlienSlotMachine",
        description: "UFO + SlotMachine synergy",
        icon: "🛸🎰",
        rarity: "legendary",
    },
    [DESIGN.ALIEN_TRAIN]: {
        name: "AlienTrain",
        description: "UFO + Train synergy",
        icon: "🛸🚆",
        rarity: "legendary",
    },
}