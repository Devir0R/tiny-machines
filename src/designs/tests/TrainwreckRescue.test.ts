import { TrainwreckRescue } from "../pairs/TrainwreckRescue";
import { Train } from "../../machines/Train";
import { Ambulance } from "../../machines/Ambulance";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("TrainwreckRescue", () => {
  test("scores 15 points for each Train adjacent to an Ambulance", () => {
    const board = createEmptyBoard();
    const design = new TrainwreckRescue();
    board[4] = new Train(4);
    board[5] = new Ambulance(5); // adjacent to 4

    expect(design.score(board)).toBe(15);
  });

  test("scores 0 when Train and Ambulance are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new TrainwreckRescue();
    board[0] = new Train(0);
    board[8] = new Ambulance(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 30 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new TrainwreckRescue();
    board[0] = new Train(0);
    board[1] = new Ambulance(1); // adjacent
    board[3] = new Train(3);
    board[4] = new Ambulance(4); // adjacent

    expect(design.score(board)).toBe(30);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new TrainwreckRescue();

    expect(design.score(board)).toBe(0);
  });
});