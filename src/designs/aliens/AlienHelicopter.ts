import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";

export class AlienHelicopter extends Design {
  name = "Alien Helicopter";
  description = "for each 🚁 adjacent to an 🛸, an empty space around a 🚁, surrounded by at least four machines, gives additional 3 points";
  icon = "🛸🚁";
  rarity: "common" | "legendary" = "legendary";
  machines = ['🛸', '🚁'];

  score(machinesOnBoard: (Machine | null)[]): number {
      let score = 0;
      for(const machine of machinesOnBoard) {
        if (!machine || machine.icon !== '🚁') {
          continue;
        }
        
        if (!this.hasAdjacentUFO(machine, machinesOnBoard)) {
            continue;
        }

        const indexesAround = machine.indexesAround(machine.index, machinesOnBoard);

        for (const index of indexesAround) {
            if (index !== -1 && machinesOnBoard[index] === null) {
                const surroundingIndexes = machine.indexesAround(index, machinesOnBoard);
                let surroundingMachinesCount = 0;
                for (const surroundingIndex of surroundingIndexes) {
                    if (surroundingIndex !== -1 && machinesOnBoard[surroundingIndex] !== null) {
                        surroundingMachinesCount++;
                    }
                }
                if (surroundingMachinesCount >= 4) {
                    score += 4;
                }
            }
        }
      }
      return score;
  }

  private hasAdjacentUFO(machine: Machine, machinesOnBoard: (Machine | null)[]) {
    const adjacentIndexes = [
        machine.Up(machine.index, machinesOnBoard), 
        machine.Down(machine.index, machinesOnBoard), 
        machine.Right(machine.index, machinesOnBoard), 
        machine.Left(machine.index, machinesOnBoard)];
        
    for (const adjacentIndex of adjacentIndexes) {
      if (adjacentIndex !== -1 &&
        machinesOnBoard[adjacentIndex] &&
        machinesOnBoard[adjacentIndex]!.icon === '🛸') {
        return true;
      }
    }
    return false;
  }

  applyEffect(_machinesOnBoard: (Machine | null)[]): void {
    return;
  }
}
