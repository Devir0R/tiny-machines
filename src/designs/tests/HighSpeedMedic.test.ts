import { SpeedyMedic } from "../pairs/SpeedyMedic";
import { Jet } from "../../machines/Jet";
import { Ambulance } from "../../machines/Ambulance";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("HighSpeedMedic", () => {
  test("scores 4 points for each Jet adjacent to an Ambulance", () => {
    const board = createEmptyBoard();
    const design = new SpeedyMedic();
    board[4] = new Jet(4);
    board[5] = new Ambulance(5); // adjacent to 4

    expect(design.score(board)).toBe(4);
  });

  test("scores 0 when Jet and Ambulance are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new SpeedyMedic();
    board[0] = new Jet(0);
    board[8] = new Ambulance(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 8 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new SpeedyMedic();
    board[0] = new Jet(0);
    board[1] = new Ambulance(1); // adjacent
    board[3] = new Jet(3);
    board[4] = new Ambulance(4); // adjacent

    expect(design.score(board)).toBe(8);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new SpeedyMedic();

    expect(design.score(board)).toBe(0);
  });
});