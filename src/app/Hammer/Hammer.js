export default class Hammer {
  constructor(src) {
    this.src = src;
    this.element = null;
  }

  init(root) {
    this.element = document.createElement("img");
    this.element.src = this.src;
    this.element.alt = "Hammer";
    this.element.classList.add("hammer");
    root.append(this.element);

    root.addEventListener("mousemove", (e) => {
      this.element.style.left = `${e.clientX}px`;
      this.element.style.top = `${e.clientY}px`;
    });
  }

  hit() {
    if (!this.element) return;

    this.element.style.transform =
      "translate(-50%, -50%) rotate(-90deg) scale(1.2)";

    setTimeout(() => {
      this.element.style.transform =
        "translate(-50%, -50%) rotate(-45deg) scale(1)";
    }, 150);
  }
}
