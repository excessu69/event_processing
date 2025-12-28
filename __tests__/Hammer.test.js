/**
 * @jest-environment jsdom
 */

import Hammer from "../src/app/Hammer/Hammer.js";

describe("Hammer class", () => {
  let root;

  beforeEach(() => {
    document.body.innerHTML = "";
    root = document.createElement("div");
    document.body.append(root);
  });

  test("инициализация: создаётся img и добавляется в DOM", () => {
    const hammer = new Hammer("hammer.png");
    hammer.init(root);

    expect(hammer.element).not.toBeNull();
    expect(hammer.element.tagName).toBe("IMG");
    expect(hammer.element.src).toContain("hammer.png");
    expect(hammer.element.classList.contains("hammer")).toBe(true);
    expect(root.querySelector("img.hammer")).not.toBeNull();
  });

  test("init вызывает hide() → hammer не должен иметь класс show", () => {
    const hammer = new Hammer("hammer.png");
    hammer.init(root);

    expect(hammer.element.classList.contains("show")).toBe(false);
  });

  test("show(x, y) позиционирует молоток", () => {
    jest.useFakeTimers();

    const hammer = new Hammer("hammer.png");
    hammer.init(root);

    hammer.show(150, 200);

    expect(hammer.element.style.left).toBe("140px");
    expect(hammer.element.style.top).toBe("190px");
    expect(hammer.element.classList.contains("show")).toBe(true);

    jest.advanceTimersByTime(200);
    expect(hammer.element.classList.contains("show")).toBe(false);

    jest.useRealTimers();
  });

  test("show не работает если element отсутствует", () => {
    const hammer = new Hammer("hammer.png");
    hammer.show(100, 100);

    expect(hammer.element).toBeNull();
  });

  test("hide удаляет класс show", () => {
    const hammer = new Hammer("hammer.png");
    hammer.init(root);

    hammer.element.classList.add("show");
    hammer.hide();

    expect(hammer.element.classList.contains("show")).toBe(false);
  });

  test("hide не падает если element отсутствует", () => {
    const hammer = new Hammer("hammer.png");
    expect(() => hammer.hide()).not.toThrow();
  });
});
