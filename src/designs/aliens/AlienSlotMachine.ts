import { Design } from "../Design";
import { Machine } from "../../machines/Machine";
import type { SlotMachine } from "../../machines/SlotMachine";
import type { MACHINE } from "../../interfaces/Machines";

export class AlienSlotMachine extends Design {
  name = "Alien Slot Machine";
  description = "for each 🎰 adjacent to a 🛸, if all machines around appear at least 3 times, double its score";
  icon = "🛸🎰";
  rarity: "common" | "legendary" = "legendary";
  machines = ['🛸', '🎰'];
  score(_machinesOnBoard: (Machine | null)[]): number {
    return 0
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
    for(const machine of machinesOnBoard){
      if(!machine || machine.icon !== '🎰') continue;

      if(!this.hasAdjacentUFO(machine,machinesOnBoard)) continue;
      const slotMachine = machine as SlotMachine;

      const counts = slotMachine.getMachineCount(machinesOnBoard);

      for(const machineType of Object.keys(counts)){
        if(counts[machineType as MACHINE].length < 3) return;
      }
      slotMachine.effects.push(score=>score*2)
    }
  }
}
