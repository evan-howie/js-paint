import Canvas from "./canvas.js";
import Tool from "./tool.js";
import KeyHandler from "./keyHandler.js";

export default function init() {
  const c = new Canvas("js-paint-canvas");

  const tool = new Tool(c);
  const keyHandler = new KeyHandler(c);

  document.getElementById("color-picker").onchange = (e) => {
    tool.setFill(e.target.value);
  };

  document.getElementById("brush").onclick = (e) => {
    tool.setBrush();
  };

  document.getElementById("brush-stroke").onchange = (e) => {
    tool.setStroke(e.target.value);
  };
}
