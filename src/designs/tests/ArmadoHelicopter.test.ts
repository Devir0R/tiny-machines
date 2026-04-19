import { ArmadoHelicopter } from "../pairs/ArmadoHelicopter";
import { Helicopter } from "../../machines/Helicopter";
import { Missile } from "../../machines/Missile";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("ArmadoHelicopter", () => {
  test("scores 4 points for each Helicopter adjacent to a Missile", () => {
    const board = createEmptyBoard();
    const design = new ArmadoHelicopter();
    board[4] = new Helicopter(4);
    board[5] = new Missile(5); // adjacent to 4

    expect(design.score(board)).toBe(4);
  });

  test("scores 0 when Helicopter and Missile are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new ArmadoHelicopter();
    board[0] = new Helicopter(0);
    board[8] = new Missile(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 8 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new ArmadoHelicopter();
    board[0] = new Helicopter(0);
    board[1] = new Missile(1); // adjacent
    board[3] = new Helicopter(3);
    board[4] = new Missile(4); // adjacent

    expect(design.score(board)).toBe(8);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new ArmadoHelicopter();

    expect(design.score(board)).toBe(0);
  });
});