import type { MACHINE } from "../interfaces/Machines";
import { Machine } from "./Machine";

/**
 * Slot Machine:
 * - Icon: 🎰
 * - Description: "for each type of machine with at least two of the same type around it, get squared points for it.(4 for 2 and 9 for 3 and so on)"
 * - Scoring: Scores points based on the number of adjacent machines of the same type. For each type of machine that has at least two adjacent machines of the same type, the Slot Machine scores points equal to the square of the number of adjacent machines of that type (e.g., 4 points for 2 adjacent machines, 9 points for 3 adjacent machines, etc.). If there are no types of machines with at least two adjacent machines of the same type, the Slot Machine scores 0 points.
 */
export class SlotMachine extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "SlotMachine";
        this.description = "for each type of machine with at least two, get squared points for the number of machines of that type around it.(1 for 1, 4 for 2 and 9 for 3 and so on)";
        this.icon = "🎰";
    }



    myScore(machinesOnBoard: (Machine | null)[]): number {
       const machineCount: Record<MACHINE, number> = {} as Record<MACHINE, number>;
         for(const index of this.indexesAround(this.index, machinesOnBoard)) {
            if (machinesOnBoard[index] !== null) {
                const machine = machinesOnBoard[index]!;
                machineCount[machine.icon] = (machineCount[machine.icon] || 0) + 1;
            }
        }

        let score = 0;
        for (const key of Object.keys(machineCount)) {
            const count = machineCount[key as MACHINE];
            if (count > 1) {
                score += count * count;
            }
        }

        return score;

    }

}