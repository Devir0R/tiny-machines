import { FighterJet } from "../pairs/FighterJet";
import { Jet } from "../../machines/Jet";
import { Missile } from "../../machines/Missile";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("JetMissileBarrage", () => {
  test("scores 4 points for each Jet adjacent to a Missile", () => {
    const board = createEmptyBoard();
    const design = new FighterJet();
    board[4] = new Jet(4);
    board[5] = new Missile(5); // adjacent to 4

    expect(design.score(board)).toBe(4);
  });

  test("scores 0 when Jet and Missile are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new FighterJet();
    board[0] = new Jet(0);
    board[8] = new Missile(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 8 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new FighterJet();
    board[0] = new Jet(0);
    board[1] = new Missile(1); // adjacent
    board[3] = new Jet(3);
    board[4] = new Missile(4); // adjacent

    expect(design.score(board)).toBe(8);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new FighterJet();

    expect(design.score(board)).toBe(0);
  });
});