import Canvas from "./canvas.js";
import KeyHandler from "./keyHandler.js";
import Brush from "./brush.js";
import Fill from "./fill.js";

export default function init() {
  const c = new Canvas("js-paint-canvas");

  let tool = new Brush(c);
  const keyHandler = new KeyHandler(c);

  const colorPicker = document.getElementById("color-picker");
  const brushStroke = document.getElementById("brush-stroke");

  colorPicker.onchange = (e) => {
    tool.setFill(e.target.value);
  };

  brushStroke.onchange = (e) => {
    tool.setStroke(e.target.value);
  };

  document.getElementById("brush").onclick = (e) => {
    tool.cleanup();
    tool = new Brush(c, colorPicker.value, brushStroke.value);
  };

  document.getElementById("fill").onclick = (e) => {
    tool.cleanup();
    tool = new Fill(c, colorPicker.value);
  };
}
