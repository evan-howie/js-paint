import Canvas from "./canvas.js";
import KeyHandler from "./keyHandler.js";
import Brush from "./brush.js";
import Fill from "./fill.js";

const c = new Canvas("js-paint-canvas");
let tool = new Brush(c);
const keyHandler = new KeyHandler(c);

const colorPicker = document.getElementById("color-picker");
const brushStroke = document.getElementById("brush-stroke");
const uploadImage = document.getElementById("upload-image");
const clearCanvas = document.getElementById("clear-canvas");
const brushButton = document.getElementById("brush");
const fillButton = document.getElementById("fill");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const dimensionSubmitButton = document.getElementById(
  "dimensions-submit-button"
);

function initColorPicker() {
  colorPicker.onchange = (e) => {
    tool.setFill(e.target.value);
  };
  return colorPicker.value;
}

function initBrushStroke() {
  brushStroke.onchange = (e) => {
    tool.setStroke(e.target.value);
  };
  return brushStroke.value;
}

function initUploadImage() {
  uploadImage.onchange = (e) => {
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
    uploadImage.value = "";
  };
}

function initClearCanvas() {
  clearCanvas.onclick = (e) => {
    c.clear();
  };
}

function initToolButtons() {
  brushButton.onclick = (e) => {
    tool.cleanup();
    tool = new Brush(c, colorPicker.value, brushStroke.value);
  };

  fillButton.onclick = (e) => {
    tool.cleanup();
    tool = new Fill(c, colorPicker.value);
  };
}

function initDimensions() {
  dimensionSubmitButton.onclick = (e) => {
    const newWidth = parseInt(widthInput.value);
    const newHeight = parseInt(heightInput.value);

    if (newWidth === NaN || newHeight === NaN) return;

    c.setSize(newWidth, newHeight);
  };
}

export default function init() {
  const initialColor = initColorPicker();
  const initialBrushStroke = initBrushStroke();
  initUploadImage();
  initClearCanvas();
  initToolButtons();
  initDimensions();

  tool.setFill(initialColor);
  tool.setStroke(initialBrushStroke);
}
