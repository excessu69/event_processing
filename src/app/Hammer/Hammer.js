import "./Hammer.css";

export default class Hammer {
  constructor(src) {
    this.src = src;
    this.element = null;
  }

  init(root) {
    this.element = document.createElement("img");
    this.element.src = this.src;
    this.element.classList.add("hammer");
    root.append(this.element);
    this.hide();
  }

  show(x, y) {
    if (!this.element) return;

    this.element.style.left = `${x - 10}px`;
    this.element.style.top = `${y - 10}px`;
    this.element.classList.add("show");

    setTimeout(() => this.hide(), 200);
  }

  hide() {
    if (!this.element) return;
    this.element.classList.remove("show");
  }
}
