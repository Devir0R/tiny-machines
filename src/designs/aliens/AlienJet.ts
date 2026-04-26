import { Design } from "../Design";
import type { Machine } from "../../machines/Machine";

export class AlienJet extends Design {
  name = "Alien Jet";
  description = "for each ✈️ adjacent to an 🛸, if line with most different machines has no repeating machine, double its points";
  icon = "🛸✈️";
  rarity: "common" | "legendary" = "legendary";
  machines = ['🛸', '✈️'];

  score(_machinesOnBoard: (Machine | null)[]): number {
    return 0;
  }

  applyEffect(machinesOnBoard: (Machine | null)[]): void {
      for(const machine of machinesOnBoard) {
        if (!machine || machine.icon !== '✈️') {
          continue;
        }
        
        if (!this.hasAdjacentUFO(machine, machinesOnBoard)) {
            continue;
        }

        const distinctCountWithRepeats = [machine.Up, machine.Down, machine.Right, machine.Left]
          .map(direction=>{
            let index = direction(machine.index, machinesOnBoard);
            const seenMachines = new Set<string>();
            const seenMachinesWithRepeats= [];
            let currentLength = 0;

            while (index !== -1) {
                if (machinesOnBoard[index] === null) {
                    break;
                }

                const machine = machinesOnBoard[index];
                if (machine ) {
                  seenMachinesWithRepeats.push(machine.icon);
                  if(!seenMachines.has(machine.icon)){
                    seenMachines.add(machine.icon);
                    currentLength+=1;                    
                  }
                } else {
                    break;
                }

                index = direction(index, machinesOnBoard);
            }

            return [currentLength,seenMachinesWithRepeats.length];
          });

          const maxDistinctCount = Math.max(...distinctCountWithRepeats.map(x=>x[0]));
          if(distinctCountWithRepeats.filter(x=>x[0] === maxDistinctCount)
            .filter(x=>x[0] === x[1]).length > 0) { // no repeats
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
