import "./style.css";
import Game from "./app/Game/Game";

const root = document.getElementById("root");

const game = new Game(root);
game.init();
