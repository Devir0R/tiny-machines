import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";

export class ExplosiveHealing extends Design {
  name = "Explosive Healing";
  description = "for each pair of 🚀 adjacent to an 🚑, gain 4 points";

  score(_machinesOnBoard: (Machine | null)[]): number {
    const machine1Icon = '🚑';
    const machine2Icon = '🚀';
    let score = 0;
    for (const machine of _machinesOnBoard) {
        if (machine && machine.icon == machine1Icon) {
            const adjacentIndexes = [
                machine.Up(machine.index, _machinesOnBoard), 
                machine.Down(machine.index, _machinesOnBoard), 
                machine.Right(machine.index, _machinesOnBoard), 
                machine.Left(machine.index, _machinesOnBoard)];
            for (const adjacentIndex of adjacentIndexes) {
                if (adjacentIndex !== -1 && 
                        _machinesOnBoard[adjacentIndex] && 
                        _machinesOnBoard[adjacentIndex].icon == machine2Icon) {
                    score+= 4;
                }
            }
        }
    }
    return score;
  }

  applyEffect(_machinesOnBoard: (Machine | null)[]): void {
    return;
  }
}
