import { AlienAmbulance } from "../aliens/AlienAmbulance";
import { Ambulance } from "../../machines/Ambulance";
import { UFO } from "../../machines/UFO";
import { Helicopter } from "../../machines/Helicopter";
import { Jet } from "../../machines/Jet";

const createEmptyBoard = () => Array(9).fill(null) as (any | null)[];

describe("AlienAmbulance", () => {
  test("doubles ambulance score when adjacent to UFO with Helicopter and Jet around it", () => {
    const board = createEmptyBoard();
    const design = new AlienAmbulance();
    board[4] = new Ambulance(4);
    board[1] = new UFO(1);
    board[3] = new Helicopter(3);
    board[5] = new Jet(5);

    design.applyEffect(board);

    expect((board[4] as Ambulance).score(board)).toBe(12);
  });

  test("does not double ambulance score when missing one required air unit", () => {
    const board = createEmptyBoard();
    const design = new AlienAmbulance();
    board[4] = new Ambulance(4);
    board[1] = new UFO(1);
    board[3] = new Helicopter(3);

    design.applyEffect(board);

    expect((board[4] as Ambulance).score(board)).toBe(4);
  });

  test("does not double ambulance score without adjacent UFO", () => {
    const board = createEmptyBoard();
    const design = new AlienAmbulance();
    board[4] = new Ambulance(4);
    board[3] = new Helicopter(3);
    board[5] = new Jet(5);

    design.applyEffect(board);

    expect((board[4] as Ambulance).score(board)).toBe(4);
  });
});