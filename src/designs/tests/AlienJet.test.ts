import { AlienJet } from "../aliens/AlienJet";
import { Jet } from "../../machines/Jet";
import { UFO } from "../../machines/UFO";
import { Train } from "../../machines/Train";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("AlienJet", () => {
  test("doubles jet score when adjacent to UFO and a direction has the most distinct machines with no repeats", () => {
    const board = createEmptyBoard();
    const design = new AlienJet();
    board[4] = new Jet(4);
    board[1] = new UFO(1);
    board[5] = new Train(5);

    design.applyEffect(board);

    expect((board[4] as Jet).score(board)).toBe(2);
  });

  test("does not double jet score without adjacent UFO", () => {
    const board = createEmptyBoard();
    const design = new AlienJet();
    board[4] = new Jet(4);
    board[5] = new Train(5);

    design.applyEffect(board);

    expect((board[4] as Jet).score(board)).toBe(1);
  });
});