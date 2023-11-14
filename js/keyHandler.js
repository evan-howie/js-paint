export default class KeyHandler {
  constructor(c) {
    this.pressedKeys = new Set();
    this.c = c;

    window.addEventListener("keydown", this.keydown.bind(this));
    window.addEventListener("keyup", this.keyup.bind(this));
  }

  pressed(...keys) {
    return keys.every((key) => this.pressedKeys.has(key));
  }

  keydown(e) {
    this.pressedKeys.add(e.key);
    if (this.pressed("Control", "r")) {
      e.preventDefault();
      this.c.ctx.clearRect(0, 0, c.width, c.height);
    }
    if (this.pressed("Control", "z")) {
      e.preventDefault();
      this.c.undo();
    }
    if (this.pressed("Control", "y")) {
      e.preventDefault();
      this.c.redo();
    }
  }

  keyup(e) {
    this.pressedKeys.delete(e.key);
  }
}
