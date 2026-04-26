
import { SpecializedAmbulance } from "../individuals/SpecializedAmbulance";
import { SlotMachine } from "../../machines/SlotMachine";
import { Helicopter } from "../../machines/Helicopter";
import { UFO } from "../../machines/UFO";
import { Jet } from "../../machines/Jet";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];


describe("Specialized Ambulance", () => {
  test("scores 2 points for one 🚁 in the board", () => {
    const board = createEmptyBoard();
    const design = new SpecializedAmbulance();
    board[2] = new Helicopter(2);

    expect(design.score(board)).toBe(2);
  });

  test("scores 6 points for three 🚁 in the board", () => {
    const board = createEmptyBoard();
    const design = new SpecializedAmbulance();
    board[2] = new Helicopter(2);
    board[3] = new Helicopter(3);
    board[4] = new Helicopter(4);


    expect(design.score(board)).toBe(6);
  });

  test("scores 10 points 5 machines", () => {
    const board = createEmptyBoard();
    const design = new SpecializedAmbulance();
    board[2] = new Helicopter(2);
    board[3] = new UFO(3);
    board[4] = new Helicopter(4);
    board[0] = new Jet(0);
    board[8] = new Helicopter(8);

    expect(design.score(board)).toBe(10);
  });

  test("scores 0 points for no machines", () => {
    const board = createEmptyBoard();
    const design = new SpecializedAmbulance();
    board[2] = new SlotMachine(2);
    board[6] = new SlotMachine(6);
    board[8] = new SlotMachine(8);

    expect(design.score(board)).toBe(0);
  });
});