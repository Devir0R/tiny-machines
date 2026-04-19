import { AlienMissile } from "../aliens/AlienMissile";
import { Missile } from "../../machines/Missile";
import { UFO } from "../../machines/UFO";
import { SlotMachine } from "../../machines/SlotMachine";
import { Ambulance } from "../../machines/Ambulance";
import { Train } from "../../machines/Train";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("AlienMissile", () => {
  test("doubles missile score when adjacent to UFO and SlotMachine, Ambulance, and Train are around it", () => {
    const board = createEmptyBoard();
    const design = new AlienMissile();
    board[4] = new Missile(4);
    board[1] = new UFO(1);
    board[3] = new SlotMachine(3);
    board[5] = new Ambulance(5);
    board[7] = new Train(7);

    design.applyEffect(board);

    expect((board[4] as Missile).score(board)).toBe(12);
  });

  test("does not double missile score when one required non-air machine is missing", () => {
    const board = createEmptyBoard();
    const design = new AlienMissile();
    board[4] = new Missile(4);
    board[1] = new UFO(1);
    board[3] = new SlotMachine(3);
    board[7] = new Train(7);

    design.applyEffect(board);

    expect((board[4] as Missile).score(board)).toBe(4);
  });
});