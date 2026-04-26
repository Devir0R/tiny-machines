
import { CorneredJet } from "../individuals/CorneredJet";
import { Jet } from "../../machines/Jet";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("Cornered Jet", () => {
  test("scores 7 points for one ✈️ in a corner", () => {
    const board = createEmptyBoard();
    const design = new CorneredJet();
    board[2] = new Jet(2);

    expect(design.score(board)).toBe(7);
  });

  test("scores 21 points for three ✈️ in corners", () => {
    const board = createEmptyBoard();
    const design = new CorneredJet();
    board[2] = new Jet(2);
    board[0] = new Jet(0);
    board[8] = new Jet(8);

    expect(design.score(board)).toBe(21);
  });

  test("scores 0 points for no ✈️ in corners", () => {
    const board = createEmptyBoard();
    const design = new CorneredJet();
    board[1] = new Jet(1);
    board[4] = new Jet(4);
    board[3] = new Jet(3);
    board[7] = new Jet(7);

    expect(design.score(board)).toBe(0);
  });

  test("scores 28 points for ✈️ in each corner", () => {
    const board = createEmptyBoard();
    const design = new CorneredJet();
    board[0] = new Jet(0);
    board[2] = new Jet(2);
    board[6] = new Jet(6);
    board[8] = new Jet(8);

    expect(design.score(board)).toBe(28);
  });
});