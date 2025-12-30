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
    this.lastCell = null;

    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");

    this.messageBox = document.getElementById("game-message");

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

  start() {
    this.interval = setInterval(() => {
      this.moveGoblin();
    }, 1000);
  }

  moveGoblin() {
    if (this.goblin.isVisible) {
      this.missed++;
      this.updateStats();

      if (this.missed >= this.maxMissed) {
        this.end("Вы проиграли 😢");
        return;
      }
    }

    const prevCell = this.goblin.currentCell;
    const newCell = this.board.getRandomCell(prevCell);
    this.goblin.appear(newCell);

    this.lastCell = newCell;
  }

  addClickHandler() {
    this.root.addEventListener("click", (event) => {
      this.hammer.hit();

      if (event.target.classList.contains("goblin")) {
        this.score++;
        this.goblin.hide();
        this.updateStats();

        if (this.score >= this.maxScore) {
          this.end("Вы выиграли! 🎉");
        }

        return;
      }

      this.missed++;
      this.updateStats();

      if (this.missed >= this.maxMissed) {
        this.end("Вы проиграли 😢");
      }
    });
  }

  updateStats() {
    if (this.scoreElement) {
      this.scoreElement.textContent = `Попадания: ${this.score}`;
    }
    if (this.livesElement) {
      this.livesElement.textContent = `Промахи: ${this.missed} / ${this.maxMissed}`;
    }
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  end(message) {
    this.stop();

    this.showMessage(message);
  }

  showMessage(text) {
    this.messageBox.innerHTML = `
      <div class="message-text">${text}<br>Счёт: ${this.score}</div>
      <button id="restart-btn" class="restart-btn">Играть снова</button>
    `;

    document.getElementById("restart-btn").addEventListener("click", () => {
      this.restart();
    });
  }

  restart() {
    this.score = 0;
    this.missed = 0;
    this.updateStats();

    this.messageBox.innerHTML = "";

    this.goblin.hide();

    this.start();
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.stop();
      this.showMessage("Игра приостановлена (вы ушли со страницы)");
    }
  }

  handleBeforeUnload() {
    this.stop();
  }
}
