import { LuckyAce } from "../pairs/LuckyAce";
import { Jet } from "../../machines/Jet";
import { SlotMachine } from "../../machines/SlotMachine";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("LuckyAce", () => {
  test("scores 15 points for each Jet adjacent to a SlotMachine", () => {
    const board = createEmptyBoard();
    const design = new LuckyAce();
    board[4] = new Jet(4);
    board[5] = new SlotMachine(5); // adjacent to 4

    expect(design.score(board)).toBe(15);
  });

  test("scores 0 when Jet and SlotMachine are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new LuckyAce();
    board[0] = new Jet(0);
    board[8] = new SlotMachine(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 30 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new LuckyAce();
    board[0] = new Jet(0);
    board[1] = new SlotMachine(1); // adjacent
    board[3] = new Jet(3);
    board[4] = new SlotMachine(4); // adjacent

    expect(design.score(board)).toBe(30);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new LuckyAce();

    expect(design.score(board)).toBe(0);
  });
});