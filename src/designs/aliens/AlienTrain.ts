import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";

export class AlienTrain extends Design {
  name = "Alien Train";
  description = "each 🚆 adjacent to an 🛸, doubles adjacent 🚆 scoring.";
  icon = "🛸🚆";
  rarity: "common" | "legendary" = "legendary";
  machines = ['🛸', '🚆'];

  score(_machinesOnBoard: (Machine | null)[]): number {
    return 0;
  }

  applyEffect(machinesOnBoard: (Machine | null)[]): void {
    for(const machine of machinesOnBoard){
      if(!machine || machine.icon !== '🚆') continue;
      
      if(!this.hasAdjacentUFO(machine,machinesOnBoard)) continue;

      const adjacentIndexes = [
        machine.Up(machine.index, machinesOnBoard), 
        machine.Down(machine.index, machinesOnBoard), 
        machine.Right(machine.index, machinesOnBoard), 
        machine.Left(machine.index, machinesOnBoard)];

      for(const index of adjacentIndexes){
        const AdjacentMachine = machinesOnBoard[index];
        if(!AdjacentMachine) continue;

        if(AdjacentMachine.icon === '🚆') AdjacentMachine.effects.push((score)=> score * 2)
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
