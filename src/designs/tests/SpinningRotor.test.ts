import { SpinningRotor } from "../pairs/SpinningRotor";
import { Helicopter } from "../../machines/Helicopter";
import { SlotMachine } from "../../machines/SlotMachine";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("SpinningRotor", () => {
  test("scores 4 points for each Helicopter adjacent to a SlotMachine", () => {
    const board = createEmptyBoard();
    const design = new SpinningRotor();
    board[4] = new Helicopter(4);
    board[5] = new SlotMachine(5); // adjacent to 4

    expect(design.score(board)).toBe(4);
  });

  test("scores 0 when Helicopter and SlotMachine are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new SpinningRotor();
    board[0] = new Helicopter(0);
    board[8] = new SlotMachine(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 8 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new SpinningRotor();
    board[0] = new Helicopter(0);
    board[1] = new SlotMachine(1); // adjacent
    board[3] = new Helicopter(3);
    board[4] = new SlotMachine(4); // adjacent

    expect(design.score(board)).toBe(8);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new SpinningRotor();

    expect(design.score(board)).toBe(0);
  });
});