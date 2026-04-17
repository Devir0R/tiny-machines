import type { MACHINE } from "../interfaces/Machines";
import { Machine } from "./Machine";

/**
 * Slot Machine:
 * - Icon: 🎰
 * - Description: "2 points for each 2 machines of the same type around it, and 5 points for each 3 machines of the same type around it"
 * - Scoring: Scores 2 points for each pair of identical machines around it, and 5 points for each triplet of identical machines around it.
 */
export class SlotMachine extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "SlotMachine";
        this.description = "2 points for each 2 machines of the same type around it, and 5 points for each 3 machines of the same type around it";
        this.icon = "🎰";
    }



    score(machinesOnBoard: (Machine | null)[]): number {
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
            if (count === 2) {
                score += 2;
            } else if (count === 3) {
                score += 5;
            }
        }

        return score;

    }

}