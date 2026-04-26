
import { HeliCenter } from "../individuals/HeliCenter";
import { Helicopter } from "../../machines/Helicopter";

const createEmptyBoard = () => Array(16).fill(null) as (any | null)[];

describe("Heli Center", () => {
  test("scores 7 points for one 🚁 in a middle cell", () => {
    const board = createEmptyBoard();
    const design = new HeliCenter();
    board[5] = new Helicopter(5);

    expect(design.score(board)).toBe(7);
  });

  test("scores 21 points for three 🚁 in 3 middle cells", () => {
    const board = createEmptyBoard();
    const design = new HeliCenter();
    board[5] = new Helicopter(5);
    board[6] = new Helicopter(6);
    board[9] = new Helicopter(9);

    expect(design.score(board)).toBe(21);
  });

  test("scores 0 points for no 🚁 in middle cells", () => {
    const board = createEmptyBoard();
    const design = new HeliCenter();
    board[4] = new Helicopter(4);
    board[2] = new Helicopter(2);
    board[15] = new Helicopter(15);

    expect(design.score(board)).toBe(0);
  });

  test("scores 28 points for 🚁 in all 4 middle cells", () => {
    const board = createEmptyBoard();
    const design = new HeliCenter();
    board[5] = new Helicopter(5);
    board[6] = new Helicopter(6);
    board[9] = new Helicopter(9);
    board[10] = new Helicopter(10);
    
    expect(design.score(board)).toBe(28);
  });
});