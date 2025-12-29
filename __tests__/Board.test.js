/** @jest-environment jsdom */

import Board from "../src/app/Board/Board.js";

describe("Board", () => {
  test("создаёт правильное количество ячеек", () => {
    const board = new Board(4);
    const element = board.drawBoard();

    expect(element.children.length).toBe(16);
    expect(board.cells.length).toBe(16);
  });

  test("возвращает случайную ячейку, отличную от предыдущей", () => {
    const board = new Board(4);
    board.drawBoard();

    const prev = board.cells[0];
    const next = board.getRandomCell(prev);

    expect(next).not.toBe(prev);
  });
});
