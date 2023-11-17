import Canvas from "./canvas.js";
import KeyHandler from "./keyHandler.js";
import Brush from "./brush.js";
import Fill from "./fill.js";

export default function init() {
  const c = new Canvas("js-paint-canvas");

  const colorPicker = document.getElementById("color-picker");
  const brushStroke = document.getElementById("brush-stroke");
  const uploadFile = document.getElementById("upload-image");

  let tool = new Brush(c, colorPicker.value, brushStroke.value);
  const keyHandler = new KeyHandler(c);

  colorPicker.onchange = (e) => {
    tool.setFill(e.target.value);
  };

  brushStroke.onchange = (e) => {
    tool.setStroke(e.target.value);
  };

  uploadFile.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        c.drawImage(img, 0, 0);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    uploadFile.value = "";
  };

  document.getElementById("clear-canvas").onclick = (e) => {
    c.clear();
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
