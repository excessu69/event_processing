import Board from "../Board/Board.js";
import Goblin from "../Goblin/Goblin.js";
import Hammer from "../Hammer/Hammer.js";
import hammerImg from "../../img/hammer.png";
import goblinImg from "../../img/goblin.png";
import "./Game.css";

export default class Game {
  constructor(root) {
    this.root = root;

    this.board = new Board();
    this.goblin = new Goblin(goblinImg);
    this.hammer = new Hammer(hammerImg);

    this.score = 0;
    this.missed = 0;
    this.maxScore = 10;
    this.maxMissed = 5;

    this.interval = null;

    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
  }

  init() {
    const boardElement = this.board.drawBoard();
    this.root.append(boardElement);

    this.hammer.init(this.root);

    this.updateStats();

    this.addClickHandler();
    this.start();

    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.stopGame("Игра была приостановлена (вы ушли со страницы)");
    }
  }

  handleBeforeUnload() {
    this.stopGame("Игра остановлена (закрытие страницы)");
  }

  start() {
    this.interval = setInterval(() => {
      this.moveGoblin();
    }, 1000);
  }

  moveGoblin() {
    const cell = this.board.getRandomCell(this.goblin.currentCell);
    this.goblin.appear(cell);
  }

  addClickHandler() {
    this.root.addEventListener("click", (event) => {
      this.hammer.show(event.clientX, event.clientY);

      if (event.target.classList.contains("goblin")) {
        this.score++;
        this.goblin.hide();
        this.updateStats();

        if (this.score >= this.maxScore) {
          this.end("Вы выиграли! 🎉");
        }
      } else {
        this.missed++;
        this.updateStats();

        if (this.missed >= this.maxMissed) {
          this.end("Вы проиграли 😢");
        }
      }
    });
  }

  updateStats() {
    if (this.scoreElement) {
      this.scoreElement.textContent = `${this.score}`;
    }
    if (this.livesElement) {
      this.livesElement.textContent = ` ${this.missed} / ${this.maxMissed}`;
    }
  }

  stopGame(message) {
    clearInterval(this.interval);
    this.interval = null;
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
    );
    window.removeEventListener("beforeunload", this.handleBeforeUnload);

    if (message) {
      alert(message + `\nВаш счёт: ${this.score}`);
    }
  }

  end(message) {
    clearInterval(this.interval);
    alert(`${message}\nВаш итоговый счёт: ${this.score}`);
  }
}
