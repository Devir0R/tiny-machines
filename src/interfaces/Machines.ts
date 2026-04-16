export const MACHINE = {
    UFO: '🛸', 
    SLOT_MACHINE: '🎰',
    HELICOPTER: '🚁',
    TRAIN: '🚆', 
    AMBULANCE: '🚑',
    SHIP: '⛴', // points for longest continuous empty path from it
    JET: '✈️', 
} as const;

export type MACHINE = typeof MACHINE[keyof typeof MACHINE];