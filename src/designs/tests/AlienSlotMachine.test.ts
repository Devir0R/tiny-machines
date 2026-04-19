import { AlienSlotMachine } from "../aliens/AlienSlotMachine";
import { SlotMachine } from "../../machines/SlotMachine";
import { UFO } from "../../machines/UFO";
import { Train } from "../../machines/Train";
import { Jet } from "../../machines/Jet";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("AlienSlotMachine", () => {
  test("scores squared points for SlotMachine when adjacent to UFO and surrounded by distinct machines", () => {
    const board = createEmptyBoard();
    const design = new AlienSlotMachine();
    board[4] = new SlotMachine(4);
    board[1] = new UFO(1);
    board[3] = new Train(3);
    board[5] = new Jet(5);

    expect(design.score(board)).toBe(9);
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