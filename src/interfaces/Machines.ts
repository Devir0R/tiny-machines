export const MACHINE = {
    TANK: '🚜',
    ARTILLERY: '🚀',
    HELICOPTER: '🚁',
    BOMBER: '🛩️',
    SUBMARINE: '⚓',
    SHIP: '⛴',
    JET: '✈️',
} as const;

export type MACHINE = typeof MACHINE[keyof typeof MACHINE];