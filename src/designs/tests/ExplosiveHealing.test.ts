import { ExplosiveHealing } from "../pairs/ExplosiveHealing";
import { Missile } from "../../machines/Missile";
import { Ambulance } from "../../machines/Ambulance";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("ExplosiveHealing", () => {
  test("scores 15 points for each Missile adjacent to an Ambulance", () => {
    const board = createEmptyBoard();
    const design = new ExplosiveHealing();
    board[4] = new Missile(4);
    board[5] = new Ambulance(5); // adjacent to 4

    expect(design.score(board)).toBe(15);
  });

  test("scores 0 when Missile and Ambulance are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new ExplosiveHealing();
    board[0] = new Missile(0);
    board[8] = new Ambulance(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 8 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new ExplosiveHealing();
    board[0] = new Missile(0);
    board[1] = new Ambulance(1); // adjacent
    board[3] = new Missile(3);
    board[4] = new Ambulance(4); // adjacent

    expect(design.score(board)).toBe(30);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new ExplosiveHealing();

    expect(design.score(board)).toBe(0);
  });
});