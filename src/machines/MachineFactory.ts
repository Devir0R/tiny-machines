import { Machine } from "./Machine";
import { Ambulance } from "./Ambulance";
import { Helicopter } from "./Helicopter";
import { Jet } from "./Jet";
import { Missile } from "./Missile";
import { SlotMachine } from "./SlotMachine";
import { Train } from "./Train";
import { UFO } from "./UFO";
import { MACHINE } from "../interfaces/Machines";

export class MachineFactory {
    static create(machine: MACHINE, index: number): Machine {
        switch(machine) {
            case MACHINE.UFO:
                return new UFO(index);
            case MACHINE.AMBULANCE:
                return new Ambulance(index);
            case MACHINE.HELICOPTER:
                return new Helicopter(index);
            case MACHINE.SLOT_MACHINE:
                return new SlotMachine(index);
            case MACHINE.JET:
                return new Jet(index);
            case MACHINE.MISSILE:
                return new Missile(index);
            case MACHINE.TRAIN:
                return new Train(index);
            default:
                throw new Error(`Unknown machine type: ${machine}`);
        }
    }
}