export const MACHINE = {
    UFO: '🛸', // points by empty cells around it
    SLOT_MACHINE: '🎰',//longest path of different machines coming out of it
    HELICOPTER: '🚁', // points for each empty spot surrounded by at least 3 machines
    TRAIN: '🚆', //for each connected 🚆 to it
    AMBULANCE: '🚑', //points for each air unit
    SHIP: '⛴', // points for longest continuous empty path from it
    JET: '✈️', // points for longest straight empty line from it
} as const;

export type MACHINE = typeof MACHINE[keyof typeof MACHINE];