import { SonicRail } from "../pairs/SonicRail";
import { Jet } from "../../machines/Jet";
import { Train } from "../../machines/Train";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("SonicRail", () => {
  test("scores 4 points for each Jet adjacent to a Train", () => {
    const board = createEmptyBoard();
    const design = new SonicRail();
    board[4] = new Jet(4);
    board[5] = new Train(5); // adjacent to 4

    expect(design.score(board)).toBe(4);
  });

  test("scores 0 when Jet and Train are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new SonicRail();
    board[0] = new Jet(0);
    board[8] = new Train(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 8 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new SonicRail();
    board[0] = new Jet(0);
    board[1] = new Train(1); // adjacent
    board[3] = new Jet(3);
    board[4] = new Train(4); // adjacent

    expect(design.score(board)).toBe(8);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new SonicRail();

    expect(design.score(board)).toBe(0);
  });
});