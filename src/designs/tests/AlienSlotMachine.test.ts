import { AlienSlotMachine } from "../aliens/AlienSlotMachine";
import { SlotMachine } from "../../machines/SlotMachine";
import { UFO } from "../../machines/UFO";
import { Train } from "../../machines/Train";
import { Jet } from "../../machines/Jet";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("AlienSlotMachine", () => {
  test("scores double if exactly 3 machines of the same type around it", () => {
    const board = createEmptyBoard();
    const design = new AlienSlotMachine();
    board[4] = new SlotMachine(4);
    board[1] = new UFO(1);
    board[3] = new Train(3);
    board[5] = new Train(5);
    board[6] = new Train(6);

    design.applyEffect(board)

    expect(board[4].score(board)).toBe(18);
  });

  test("scores 0 when SlotMachine is not adjacent to UFO", () => {
    const board = createEmptyBoard();
    const design = new AlienSlotMachine();
    board[4] = new SlotMachine(4);
    board[3] = new Train(3);
    board[5] = new Jet(5);

    expect(design.score(board)).toBe(0);
  });
});