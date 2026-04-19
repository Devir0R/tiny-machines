import { LotteryAmbulance } from "../pairs/LotteryAmbulance";
import { SlotMachine } from "../../machines/SlotMachine";
import { Ambulance } from "../../machines/Ambulance";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("LotteryAmbulance", () => {
  test("scores 4 points for each SlotMachine adjacent to an Ambulance", () => {
    const board = createEmptyBoard();
    const design = new LotteryAmbulance();
    board[4] = new SlotMachine(4);
    board[5] = new Ambulance(5); // adjacent to 4

    expect(design.score(board)).toBe(4);
  });

  test("scores 0 when SlotMachine and Ambulance are not adjacent", () => {
    const board = createEmptyBoard();
    const design = new LotteryAmbulance();
    board[0] = new SlotMachine(0);
    board[8] = new Ambulance(8); // not adjacent

    expect(design.score(board)).toBe(0);
  });

  test("scores 8 for two pairs", () => {
    const board = createEmptyBoard();
    const design = new LotteryAmbulance();
    board[0] = new SlotMachine(0);
    board[1] = new Ambulance(1); // adjacent
    board[3] = new SlotMachine(3);
    board[4] = new Ambulance(4); // adjacent

    expect(design.score(board)).toBe(8);
  });

  test("scores 0 when no machines are present", () => {
    const board = createEmptyBoard();
    const design = new LotteryAmbulance();

    expect(design.score(board)).toBe(0);
  });
});