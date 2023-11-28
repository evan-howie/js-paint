import Canvas from "./classes/canvas.js";
import KeyHandler from "./classes/keyHandler.js";
import Brush from "./classes/brush.js";
import Fill from "./classes/fill.js";

const c = new Canvas("js-paint-canvas");
let tool = new Brush(c);
const tools = document.getElementById("tools");
const keyHandler = new KeyHandler(c, tools);

const colorPicker = document.getElementById("color-picker");
const brushStroke = document.getElementById("brush-stroke");
const uploadImage = document.getElementById("upload-image");
const clearCanvas = document.getElementById("clear-canvas");
const brushButton = document.getElementById("brush");
const fillButton = document.getElementById("fill");
const fillThreshold = document.getElementById("fill-threshold");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const dimensionSubmitButton = document.getElementById(
  "dimensions-submit-button"
);
const codeSubmit = document.getElementById("code-submit");

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

function initFillThreshold() {
  fillThreshold.onchange = (e) => {
    tool.setThreshold(e.target.value);
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
    tool = new Fill(c, colorPicker.value, fillThreshold.value);
  };
}

function initDimensions() {
  dimensionSubmitButton.onclick = (e) => {
    let newWidth = parseInt(widthInput.value);
    let newHeight = parseInt(heightInput.value);

    if (isNaN(newWidth)) newWidth = c.w;

    if (isNaN(newHeight)) newHeight = c.h;

    c.setSize(newWidth, newHeight);
  };
}

function initCodeSubmit() {
  codeSubmit.onclick = onCodeSubmit;
}

async function onCodeSubmit() {
  try {
    const blob = await c.toBlob();
    const formData = new FormData();
    formData.append("codeImage", blob, "canvas_image.png");

    const response = await fetch("/execute/node", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result.stdout);
  } catch (error) {
    console.error("Error sending canvas image:", error);
  }
}

export default function init() {
  const initialColor = initColorPicker();
  const initialBrushStroke = initBrushStroke();
  const initialFillThreshold = initFillThreshold();
  initUploadImage();
  initClearCanvas();
  initToolButtons();
  initDimensions();
  initCodeSubmit();

  tool.setFill(initialColor);
  tool.setStroke(initialBrushStroke);
}
