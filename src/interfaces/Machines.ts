export const MACHINE = {
    UFO: '🛸', 
    SLOT_MACHINE: '🎰',
    HELICOPTER: '🚁',
    TRAIN: '🚆', 
    AMBULANCE: '🚑',
    MISSILE: '🚀', 
    JET: '✈️', 
} as const;

export type MACHINE = typeof MACHINE[keyof typeof MACHINE];