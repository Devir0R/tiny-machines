import { SkylineCaravan } from "../pairs/SkylineCaravan";
import { Train } from "../../machines/Train";
import { Helicopter } from "../../machines/Helicopter";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("SkylineCaravan", () => {
  test("scores 4 points for each Train adjacent to a Helicopter", () => {
    const board = createEmptyBoard();
    const design = new SkylineCaravan();
    board[4] = new Train(4);
    board[5] = new Helicopter(5); // adjacent to 4

    expect(design.score(board)).toBe(4);
  });

  test("scores 0 when Train and Helicopter are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new SkylineCaravan();
    board[0] = new Train(0);
    board[8] = new Helicopter(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 8 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new SkylineCaravan();
    board[0] = new Train(0);
    board[1] = new Helicopter(1); // adjacent
    board[3] = new Train(3);
    board[4] = new Helicopter(4); // adjacent

    expect(design.score(board)).toBe(8);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new SkylineCaravan();

    expect(design.score(board)).toBe(0);
  });
});