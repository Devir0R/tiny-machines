import { AlienTrain } from "../aliens/AlienTrain";
import { Train } from "../../machines/Train";
import { UFO } from "../../machines/UFO";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("AlienTrain", () => {
  test("doubles neighboring train score when a Train is adjacent to UFO", () => {
    const board = createEmptyBoard();
    const design = new AlienTrain();
    board[4] = new Train(4);
    board[1] = new UFO(1);
    board[5] = new Train(5);

    design.applyEffect(board);

    expect((board[5] as Train).score(board)).toBe(4);
  });

  test("does not double neighboring train score without adjacent UFO", () => {
    const board = createEmptyBoard();
    const design = new AlienTrain();
    board[4] = new Train(4);
    board[5] = new Train(5);

    design.applyEffect(board);

    expect((board[5] as Train).score(board)).toBe(2);
  });
});