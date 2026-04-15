export const Machine = {
    TANK: '🚜',
    ARTILLERY: '🚀',
    HELICOPTER: '🚁',
    BOMBER: '🛩️',
    SUBMARINE: '⚓',
    SHIP: '⛴',
    JET: '✈️',
} as const;

export type Machine = typeof Machine[keyof typeof Machine];