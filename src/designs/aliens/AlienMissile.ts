import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";

export class AlienMissile extends Design {
  name = "AlienMissile";
  description = "for each 🚀 adjacent to an 🛸, if all three non-air machines are around it, double its points";

  score(_machinesOnBoard: (Machine | null)[]): number {
    return 0;
  }

  applyEffect(machinesOnBoard: (Machine | null)[]): void {
      for(const machine of machinesOnBoard) {
        if (!machine || machine.icon !== '🚀') {
          continue;
        }
        
        if (!this.hasAdjacentUFO(machine, machinesOnBoard)) {
            continue;
        }

        const indexesAround = machine.indexesAround(machine.index, machinesOnBoard);
        
        let hasSlotMachine = false;
        let hasAmbulance = false;
        let hasTrain = false;
        for (const adjacentIndex of indexesAround) {
          if (adjacentIndex === -1 || !machinesOnBoard[adjacentIndex]) {
            continue;
          } else if (machinesOnBoard[adjacentIndex]!.icon === '🎰') {
            hasSlotMachine = true;
          } else if (machinesOnBoard[adjacentIndex]!.icon === '🚑') {
            hasAmbulance = true;
          }  else if (machinesOnBoard[adjacentIndex]!.icon === '🚆') {
            hasTrain = true;
          }
        }

        if (hasSlotMachine && hasAmbulance) {
            machine.effects.push((score:number) => score*2);
        }
      }
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
}
