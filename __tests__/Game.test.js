/** @jest-environment jsdom */

import Game from "../src/app/Game/Game.js";
import Board from "../src/app/Board/Board.js";
import Goblin from "../src/app/Goblin/Goblin.js";
import Hammer from "../src/app/Hammer/Hammer.js";

jest.mock("../src/app/Board/Board.js");
jest.mock("../src/app/Goblin/Goblin.js");
jest.mock("../src/app/Hammer/Hammer.js");

describe("Game", () => {
  let root;
  let game;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="score"></div>
      <div id="lives"></div>
      <div id="game-message"></div>
      <div id="root"></div>
    `;
    root = document.getElementById("root");

    Board.mockImplementation(() => ({
      drawBoard: () => document.createElement("div"),
      getRandomCell: () => document.createElement("div"),
    }));

    Goblin.mockImplementation(() => ({
      appear: jest.fn(),
      hide: jest.fn(),
      isVisible: false,
      currentCell: null,
    }));

    Hammer.mockImplementation(() => ({
      init: jest.fn(),
      hit: jest.fn(),
    }));

    game = new Game(root);
  });

  test("инициализируется корректно", () => {
    expect(() => game.init()).not.toThrow();
  });

  test("обновляет счётчики", () => {
    game.score = 3;
    game.missed = 2;
    game.updateStats();

    expect(document.getElementById("score").textContent).toContain("3");
    expect(document.getElementById("lives").textContent).toContain("2");
  });

  test("показывает сообщение при завершении игры", () => {
    game.init();
    game.end("Тестовое сообщение");

    expect(document.getElementById("game-message").innerHTML).toContain(
      "Тестовое сообщение",
    );
  });

  test("кнопка перезапуска очищает сообщение", () => {
    game.init();
    game.end("Конец!");

    const btn = document.getElementById("restart-btn");
    btn.click();

    expect(document.getElementById("game-message").innerHTML).toBe("");
  });

  test("moveGoblin передаёт lastCell, если текущая ячейка goblin равна null (после попадания)", () => {
    const mockPrev = document.createElement("div");
    game.board.getRandomCell = jest.fn(() => document.createElement("div"));

    game.lastCell = mockPrev;
    game.goblin.currentCell = null;

    game.moveGoblin();

    expect(game.board.getRandomCell).toHaveBeenCalledWith(mockPrev);
  });

  test("moveGoblin передаёт текущую ячейку goblin, если она существует", () => {
    const goblinCell = document.createElement("div");
    game.board.getRandomCell = jest.fn(() => document.createElement("div"));

    game.goblin.currentCell = goblinCell;

    game.moveGoblin();

    expect(game.board.getRandomCell).toHaveBeenCalledWith(goblinCell);
  });
});
