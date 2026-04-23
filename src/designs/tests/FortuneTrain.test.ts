import { FortuneTrain } from "../pairs/FortuneTrain";
import { SlotMachine } from "../../machines/SlotMachine";
import { Train } from "../../machines/Train";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("FortuneTrain", () => {
  test("scores 15 points for each SlotMachine adjacent to a Train", () => {
    const board = createEmptyBoard();
    const design = new FortuneTrain();
    board[4] = new SlotMachine(4);
    board[5] = new Train(5); // adjacent to 4

    expect(design.score(board)).toBe(15);
  });

  test("scores 0 when SlotMachine and Train are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new FortuneTrain();
    board[0] = new SlotMachine(0);
    board[8] = new Train(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 30 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new FortuneTrain();
    board[0] = new SlotMachine(0);
    board[1] = new Train(1); // adjacent
    board[3] = new SlotMachine(3);
    board[4] = new Train(4); // adjacent

    expect(design.score(board)).toBe(30);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new FortuneTrain();

    expect(design.score(board)).toBe(0);
  });
});