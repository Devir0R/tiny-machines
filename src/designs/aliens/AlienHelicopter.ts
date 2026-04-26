import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";
import type { Helicopter } from "../../machines/Helicopter";
import { MACHINE } from "../../interfaces/Machines";

/**
 * for each 🚁 adjacent to an 🛸, if one direction contain 2 🛸, double its score
 */
export class AlienHelicopter extends Design {
  name = "Alien Helicopter";
  description = "for each 🚁 adjacent to an 🛸, if one direction contain 2 🛸, double its score";
  icon = "🛸🚁";
  rarity: "common" | "legendary" = "legendary";
  machines = ['🛸', '🚁'];

  score(_machinesOnBoard: (Machine | null)[]): number {
      return 0;

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

  applyEffect(machinesOnBoard: (Machine | null)[]): void {
    for(const machine of machinesOnBoard) {
        if (!machine || machine.icon !== '🚁') {
          continue;
        }        
        if (!this.hasAdjacentUFO(machine, machinesOnBoard)) {
            continue;
        }

        const heli = machine as Helicopter;
        const scoringPairAround = heli.scoringIndexes(machinesOnBoard);

        for(let [i1,i2] of scoringPairAround){
          if(machinesOnBoard[i1]?.icon === MACHINE.UFO && machinesOnBoard[i2]?.icon === MACHINE.UFO ){
            heli.effects.push(score=>score*2);
            return;            
          }
        }
      }
  }
}
