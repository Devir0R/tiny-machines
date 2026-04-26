import { LotteryStrike } from "../pairs/LotteryStrike";
import { Missile } from "../../machines/Missile";
import { SlotMachine } from "../../machines/SlotMachine";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("LotteryStrike", () => {
  test("scores 15 points for each Missile adjacent to a Jet", () => {
    const board = createEmptyBoard();
    const design = new LotteryStrike();
    board[4] = new Missile(4);
    board[5] = new SlotMachine(5); // adjacent to 4

    expect(design.score(board)).toBe(15);
  });

  test("scores 0 when Missile and Jet are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new LotteryStrike();
    board[0] = new Missile(0);
    board[8] = new SlotMachine(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 30 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new LotteryStrike();
    board[0] = new Missile(0);
    board[1] = new SlotMachine(1); // adjacent
    board[3] = new Missile(3);
    board[4] = new SlotMachine(4); // adjacent

    expect(design.score(board)).toBe(30);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new LotteryStrike();

    expect(design.score(board)).toBe(0);
  });
});