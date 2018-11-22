import dragService from './dragAndDropService'
var imgScalingRanges = {
maxHeight:400,
minHeight:150,
maxWidth:400,
minWidth:150
}

var imgDrawHandler = null
var mainCanvas
//main canvas for drawing
var drawingCanvas
const setMainCanvas = (canvasRef) => {
  mainCanvas = canvasRef
}
const setDrawingCanvas = (canvasRef) => {
  drawingCanvas = canvasRef
}
const drawImgToCanvasBySelector = (selector) => {
drawImgToCanvas(document.querySelector(selector))
}

const setdrawImgHandler = (handler) => {
imgDrawHandler = handler
}
const drawImgToCanvas = (img) => {
  var ctx = mainCanvas.getContext("2d");
  var sizes = getScaledImgSize(
    img.naturalWidth,
    img.naturalHeight,
    imgScalingRanges.maxHeight,
    imgScalingRanges.maxWidth
  );
  resizeCanvas(mainCanvas, sizes.width, sizes.height)
  resizeCanvas(drawingCanvas, sizes.width, sizes.height)
  var canvasContainer = document.querySelector('.canvas-container')
  canvasContainer.style.width = sizes.width + 'px'
  canvasContainer.style.height = sizes.height + 'px'
  ctx.drawImage(img, 0, 0, sizes.width, sizes.height);
  imgDrawHandler()

}
const resizeCanvas = (element, width, height) => {
  element.width = width
  element.height = height
}

const drawTexts = (canvas, texts) => {
  var ctx = canvas.getContext("2d");
  ctx.textAlign = "center";
  ctx.textBaseline = 'middle';
  texts.forEach(text => {
    ctx.fillStyle = text.color;
    var pos = dragService.textPositions.find(textPos => textPos.id === text.id)
    var dragable = document.querySelector('#drag' + pos.id)
    // ctx.font = "30px Arial";
    ctx.font = text.fontSize + 'px ' + text.font;
    // console.log(ctx.measureText(text.body).width)
    // if(dragable.offsetWidth > 5 + ctx.measureText(text.body)) ctx.font = "15px Arial"

    var drawCoordX = pos.posX + dragable.offsetWidth / 2;
    var drawCoordY = pos.posY + dragable.offsetHeight / 2;
    ctx.fillText(text.body, drawCoordX, drawCoordY);
  });
};

const getScaledImgSize = (width, height, maxHeight, maxWidth) => {
  var scaledWidth, scaledHeight, higherValue;
  higherValue = width >= height ? "width" : "height";
  if (higherValue === "width" && width >= maxWidth) {
      scaledWidth = maxWidth;
      scaledHeight = height / (width / maxWidth);
    }
   else if (higherValue === 'height' && height > maxHeight ) {
    scaledHeight = maxHeight;
    scaledWidth = width / (height / maxHeight);
  } else {
    scaledHeight = height;
    scaledWidth = width;
  }
  // console.log(
  //   "original relation:",
  //   width / height,
  //   "scaled relation:",
  //   scaledWidth / scaledHeight,
  //   "scaled width",
  //   width,
  //   "scaled height",
  //   height
  // );
  return {
    width: scaledWidth,
    height: scaledHeight
  };
};

const clearCanvas = (canvas) => {
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

const getImgHandler = (fileToUpload, img,fileInput) => {
  // var originalSizeImg = document.querySelector(".canvas-img")
  // originalSizeImg.src = img.src
  var reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      img.src = reader.result;
    },
    false
  );
  var file = fileToUpload || fileInput.files[0];
  if (file) {
    reader.readAsDataURL(file);
    img.onload = () => drawImgToCanvas(img);
  }
};
export default {
  setMainCanvas,
  setDrawingCanvas,
  getImgHandler,
  drawImgToCanvas,
  drawTexts,
  getScaledImgSize,
  clearCanvas,
  drawImgToCanvasBySelector,
  setdrawImgHandler
}