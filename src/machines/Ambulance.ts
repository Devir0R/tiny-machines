import { Machine } from "./Machine";

/**
 * Ambulance machine:
 * - Icon: 🚑
 * - Description: "1 point for each air unit around it"
 * - Scoring: Scores 1 point for each adjacent machine that is an air unit (Jet, UFO, Helicopter)
 */
export class Ambulance extends Machine {
    constructor(index: number) {
        super(index);
        this.name = "Ambulance";
        this.description = "1 point for each air unit around it";
        this.icon = "🚑";
    }

    score(machinesOnBoard: (Machine | null)[]): number {
        let score = 0;
        const airUnits = new Set<string>(["✈️", "🛸","🚁"]);

        for(const index of this.indexesAround(this.index, machinesOnBoard)) {
            if (index !== -1 && machinesOnBoard[index] && airUnits.has(machinesOnBoard[index]!.icon)) {
                score++;
            }
        }
        return score;
    }
}