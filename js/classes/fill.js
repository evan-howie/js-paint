import { hexToRGBA } from "../utils.js";

export default class Fill {
  constructor(canvas, color, threshold) {
    this.c = canvas;
    this.color = color;
    this.threshold = threshold / 100;

    // Bind event handlers to ensure they have the correct context
    this.mousedown = this.mousedown.bind(this);

    // Initialize the worker
    this.fillWorker = new Worker("./js/classes/fillWorker.js", {
      type: "module",
    });

    this.fillWorker.addEventListener(
      "message",
      function (e) {
        const screen = e.data.screen;
        // Apply the received image data back to the canvas
        this.c.ctx.putImageData(
          new ImageData(new Uint8ClampedArray(screen), this.c.w, this.c.h),
          0,
          0
        );
        this.c.pushState();
      }.bind(this)
    );

    // Event listeners for mouse events
    this.c.canvas.addEventListener("mousedown", this.mousedown);
  }

  mousedown(e) {
    const screen = this.c.ctx.getImageData(0, 0, this.c.w, this.c.h).data;
    const pos = (e.offsetY * this.c.w + e.offsetX) * 4;
    const source = screen.slice(pos, pos + 4);
    const color = hexToRGBA(this.color);

    // Send the data to the worker
    this.fillWorker.postMessage({
      screen,
      x: e.offsetX,
      y: e.offsetY,
      w: this.c.w,
      h: this.c.h,
      source,
      color,
      threshold: this.threshold,
    });
  }

  setFill(color) {
    this.color = color;
  }

  setThreshold(threshold) {
    this.threshold = threshold / 100;
  }

  cleanup() {
    this.c.canvas.removeEventListener("mousedown", this.mousedown);
  }
}
