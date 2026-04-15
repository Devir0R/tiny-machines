export const DESIGN = {
    FIGHTER: 'FIGHTER',
    SUPER_TANK_PLUS: 'SUPER_TANK_PLUS',
    MERKAVA: 'MERKAVA',
    YASUR: 'YASUR',
    DAVE: 'DAVE',
} as const;

export type DESIGN = typeof DESIGN[keyof typeof DESIGN];