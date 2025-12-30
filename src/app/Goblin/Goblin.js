export default class Goblin {
  constructor(imgPath) {
    this.imgPath = imgPath;
    this.currentCell = null;
    this.isVisible = false;

    this.element = document.createElement("img");
    this.element.src = this.imgPath;
    this.element.alt = "Goblin";
    this.element.classList.add("goblin");
  }

  appear(cell) {
    this.element.remove();

    cell.append(this.element);
    this.currentCell = cell;
    this.isVisible = true;

    this.element.classList.remove("goblin-appear");
    void this.element.offsetWidth;
    this.element.classList.add("goblin-appear");
  }

  hide() {
    this.element.remove();
    this.currentCell = null;
    this.isVisible = false;
  }
}
