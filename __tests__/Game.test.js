/**
 * @jest-environment jsdom
 */
import Game from "../src/app/Game/Game.js";
import Board from "../src/app/Board/Board.js";
import Goblin from "../src/app/Goblin/Goblin.js";
import Hammer from "../src/app/Hammer/Hammer.js";

jest.mock("../../img/hammer.png", () => "hammer.png");
jest.mock("../../img/goblin.png", () => "goblin.png");

jest.mock("../src/app/Board/Board.js");
jest.mock("../src/app/Goblin/Goblin.js");
jest.mock("../src/app/Hammer/Hammer.js");

describe("Game class", () => {
  let root;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="root"></div>
      <div id="score"></div>
      <div id="lives"></div>
    `;
    root = document.getElementById("root");

    Board.mockImplementation(() => ({
      drawBoard: jest.fn(() => document.createElement("div")),
      getRandomCell: jest.fn(() => document.createElement("div")),
    }));
    Goblin.mockImplementation(() => ({
      currentCell: null,
      appear: jest.fn(),
      hide: jest.fn(),
    }));
    Hammer.mockImplementation(() => ({
      init: jest.fn(),
      show: jest.fn(),
    }));
  });

  test("Инициализация и обновление счётчиков", () => {
    const game = new Game(root);
    game.init();

    expect(root.children.length).toBe(1);
    expect(game.scoreElement.textContent).toBe("Попадания: 0");
    expect(game.livesElement.textContent).toBe("Промахи: 0 / 5");
  });

  test("Попадание по гоблину увеличивает счёт", () => {
    const game = new Game(root);
    game.init();

    const goblinDiv = document.createElement("div");
    goblinDiv.classList.add("goblin");
    root.append(goblinDiv);

    goblinDiv.click();

    expect(game.score).toBe(1);
    expect(game.goblin.hide).toHaveBeenCalled();
    expect(game.scoreElement.textContent).toBe("Попадания: 1");
  });

  test("Промах увеличивает счёт промахов", () => {
    const game = new Game(root);
    game.init();

    const emptyDiv = document.createElement("div");
    root.append(emptyDiv);

    emptyDiv.click();

    expect(game.missed).toBe(1);
    expect(game.livesElement.textContent).toBe("Промахи: 1 / 5");
  });

  test("Игра заканчивается при достижении maxScore", () => {
    const game = new Game(root);
    game.init();

    jest.spyOn(window, "alert").mockImplementation(() => {});

    game.score = 9;
    const goblinDiv = document.createElement("div");
    goblinDiv.classList.add("goblin");
    root.append(goblinDiv);
    goblinDiv.click();

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("Вы выиграли!"),
    );
  });

  test("Игра заканчивается при достижении maxMissed", () => {
    const game = new Game(root);
    game.init();

    jest.spyOn(window, "alert").mockImplementation(() => {});

    game.missed = 4;
    const emptyDiv = document.createElement("div");
    root.append(emptyDiv);
    emptyDiv.click();

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("Вы проиграли"),
    );
  });
});
