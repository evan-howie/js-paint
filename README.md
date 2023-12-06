# js-paint

A simple web based paint application created using HTML Canvas API.

## Additional Functionality
This application can also serve as an IDE that runs node.js code read from the canvas. When the run button is pressed, the client javascript sends a blob containing the canvas image data back to the express.js server. Performance may vary based on user's handwriting.

## Installation
```bash
npm install
sudo apt install tesseract-ocr
```
Note: the server host must be using Node v20+.

## Usage
```bash
npm run start
```
