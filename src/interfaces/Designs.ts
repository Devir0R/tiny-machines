export const Design = {
    FIGHTER: 'FIGHTER',
    SUPER_TANK_PLUS: 'SUPER_TANK_PLUS',
    MERKAVA: 'MERKAVA',
    YASUR: 'YASUR',
    DAVE: 'DAVE',
} as const;

export type Design = typeof Design[keyof typeof Design];