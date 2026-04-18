import { Machine } from "./Machine";

/**
 * Missile machine:
 * - Icon: 🚀
 * - Description: "2 points for each non-air machine around it(🚆,🎰 and 🚑)"
 * - Scoring: Scores 2 points for each machine around it that is not an air unit (Train, Slot Machine, Ambulance)
 */
export class Missile extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "Missile";
        this.description = "2 points for each non-air machine around it(🚆,🎰 and 🚑)";
        this.icon = "🚀";
    }

    
    myScore(machinesOnBoard: (Machine | null)[]): number {
        let score = 0;
        const airUnits = new Set<string>(["🚆", "🎰", "🚑"]);

        const indexesAround = this.indexesAround(this.index, machinesOnBoard);

        for(const index of indexesAround) {
            if (index !== -1 && machinesOnBoard[index] && airUnits.has(machinesOnBoard[index]!.icon)) {
                score+=2;
            }
        }
        return score;
    }
}