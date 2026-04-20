import { Design } from "../Design";
import { Machine } from "../../machines/Machine";

export class AlienSlotMachine extends Design {
  name = "Alien Slot Machine";
  description = "for each 🎰 adjacent to a 🛸, score that many points sqaured";
  icon = "🛸🎰";
  rarity: "common" | "legendary" = "legendary";
  machines = ['🛸', '🎰'];
  score(machinesOnBoard: (Machine | null)[]): number {
    let score  = 0;
    for(const machine of machinesOnBoard){
      if(!machine || machine.icon !== '🎰') continue;

      if(!this.hasAdjacentUFO(machine,machinesOnBoard)) continue;

      const indexesAround = machine.indexesAround(machine.index,machinesOnBoard);
      const machineSet = new Set<Machine>();
      let machineCountAround = 0;

      for(const index of indexesAround){
        const machineAround = machinesOnBoard[index];
        if(machineAround){
          machineSet.add(machineAround);
          machineCountAround++;
        }
      }
      if(machineCountAround===machineSet.size) score += machineCountAround * machineCountAround;
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
