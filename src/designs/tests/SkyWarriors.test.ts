import { SkyWarriors } from "../pairs/SkyWarriors";
import { Jet } from "../../machines/Jet";
import { Helicopter } from "../../machines/Helicopter";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("SkyWarriors", () => {
  test("scores 4 points for each Jet adjacent to a Helicopter", () => {
    const board = createEmptyBoard();
    const design = new SkyWarriors();
    board[4] = new Jet(4);
    board[5] = new Helicopter(5); // adjacent to 4

    expect(design.score(board)).toBe(4);
  });

  test("scores 0 when Jet and Helicopter are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new SkyWarriors();
    board[0] = new Jet(0);
    board[8] = new Helicopter(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 8 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new SkyWarriors();
    board[0] = new Jet(0);
    board[1] = new Helicopter(1); // adjacent
    board[3] = new Jet(3);
    board[4] = new Helicopter(4); // adjacent

    expect(design.score(board)).toBe(8);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new SkyWarriors();

    expect(design.score(board)).toBe(0);
  });
});