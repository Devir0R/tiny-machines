import { Machine } from "./Machine";

/**
 * Missile machine:
 * - Icon: 🚀
 * - Description: "2 points for each ✈️ or 🚆 adjacent to it"
 * - Scoring: Scores 2 points for each adjacent machine that is either a Jet (✈️) or a Train (🚆)
 */
export class Missile extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "Missile";
        this.description = "2 points for each ✈️ or 🚆 adjacent to it";
        this.icon = "🚀";
    }

    
    score(machinesOnBoard: (Machine | null)[]): number {
        let score = 0;
        const airUnits = new Set<string>(["✈️", "🚆"]);

        const indexesAdjacent = [
            this.Up(this.index, machinesOnBoard), 
            this.Down(this.index, machinesOnBoard), 
            this.Right(this.index, machinesOnBoard), 
            this.Left(this.index, machinesOnBoard)
        ];

        for(const index of indexesAdjacent) {
            if (index !== -1 && machinesOnBoard[index] && airUnits.has(machinesOnBoard[index]!.icon)) {
                score+=2;
            }
        }
        return score;
    }
}